import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    Platform,
    Text
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useLocalSearchParams } from 'expo-router';
import Header from '@/components/Header';
import TicketDetails from '@/components/Setting/Support/TicketDetails';
import ChatMessage from '@/components/Setting/Support/ChatMessage';
import { Ionicons, Entypo } from '@expo/vector-icons';


//Code related to the integration:
import { getSingleTicket } from "@/utils/queries/accountQueries";
import { useQuery } from "@tanstack/react-query";
import { getFromStorage } from "@/utils/storage";

const TicketChat: React.FC = () => {
    const [token, setToken] = useState<string | null>(null); // State to hold the token
    const backgroundColor = useThemeColor({ light: '#EFFEF9', dark: '#000000' }, 'background');
    const inputBackground = useThemeColor({ light: '#E5E5E5', dark: '#1A1A1A' }, 'inputBackground');
    const textColor = useThemeColor({ light: '#222222', dark: '#FFFFFF' }, 'text');
    const chatBackgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1A1A1A' }, 'card');

    // Get Ticket ID from router params
    const { id } = useLocalSearchParams();

    // Chat state
    const [messages, setMessages] = useState([
        { id: '1', sender: 'You', text: 'There is an issue with my swap, please help me resolve it, it is urgent, thank you', time: '11:12 AM', isUser: true },
        { id: '2', sender: 'Alex', text: 'Your complaint has been received and we are sorry for the inconvenience. We will resolve it shortly.', time: '11:12 AM', isUser: false },
    ]);

    const [messageText, setMessageText] = useState('');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const scrollViewRef = useRef<ScrollView>(null);

    // Fetch the token and user data when the component mounts
    useEffect(() => {
        const fetchUserData = async () => {
            const fetchedToken = await getFromStorage("authToken");
            setToken(fetchedToken);
            console.log("🔹 Retrieved Token:", fetchedToken);
        };

        fetchUserData();
    }, []);


    // Query to fetch ticket details
    const { data: ticket, error: ticketError, isLoading: ticketLoading } = useQuery({
        queryKey: ["ticket", id], // Query key will track the ticket for a given `id`
        queryFn: () => getSingleTicket(token, id), // Pass token and id separately
        enabled: !!token, // Only enable query if token is available
    });

    console.log("🔹 Ticket:", ticket);

    // Function to handle sending messages (text or image)
    const sendMessage = () => {
        if (messageText.trim().length > 0 || selectedImage) {
            const timestamp = Date.now(); // Unique timestamp-based ID

            const newMessage = {
                id: `${timestamp}-user`,
                sender: 'You',
                text: messageText,
                image: selectedImage,
                time: 'Now',
                isUser: true
            };

            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setMessageText('');
            setSelectedImage(null);

            // Auto-scroll to the bottom after sending a message
            setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);

            // Simulating a reply from the support team after a short delay
            setTimeout(() => {
                const botResponse = {
                    id: `${timestamp}-bot`, // Different unique ID for bot response
                    sender: 'Alex',
                    text: 'We are looking into your issue. Please hold on.',
                    time: 'Now',
                    isUser: false
                };
                setMessages((prevMessages) => [...prevMessages, botResponse]);

                // Auto-scroll after bot response
                setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
            }, 1500);
        }
    };


    // Function to pick an image from the gallery
    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            alert('Permission to access gallery is required!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <Header title={`Ticket ${id}`} />

            {/* Ticket Details - Pass dynamic data from ticket */}
            {ticketLoading ? (
                <Text>Loading...</Text>
            ) : ticketError ? (
                <Text>Error fetching ticket details</Text>
            ) : (
                ticket?.data && (
                    <TicketDetails
                        status={ticket.data.status} // Status of the ticket
                        name="Qamardeen" // You can also pass the user's name if available
                        subject={ticket.data.subject} // Subject of the ticket
                        priority="High" // Hardcoded, can be adjusted based on the ticket data if available
                        dateCreated={new Date(ticket.data.created_at).toLocaleString()} // Format the created date
                    />
                )
            )}

            {/* Chat Messages */}
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView
                    ref={scrollViewRef}
                    contentContainerStyle={[styles.chatContainer, { backgroundColor: chatBackgroundColor }]}
                    onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
                >
                    {messages.map((msg) => (
                        <ChatMessage key={msg.id} {...msg} />
                    ))}

                    {/* Show selected image preview before sending */}
                    {selectedImage && (
                        <Image source={{ uri: selectedImage }} style={styles.previewImage} />
                    )}
                </ScrollView>

                {/* Chat Input */}
                <View style={[styles.inputContainer, { backgroundColor: inputBackground }]}>
                    <TouchableOpacity onPress={pickImage}>
                        <Entypo name="attachment" size={22} color="#333" style={styles.icon} />
                    </TouchableOpacity>
                    <TextInput
                        style={[styles.input, { color: textColor }]}
                        placeholder="Type a message..."
                        placeholderTextColor="#666"
                        value={messageText}
                        onChangeText={setMessageText}
                    />
                    <TouchableOpacity onPress={sendMessage}>
                        <Ionicons name="send" size={22} color="#333" style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 25,
    },
    chatContainer: {
        padding: 16,
        flexGrow: 1,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 25,
        marginHorizontal: 10,
        marginBottom: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        paddingHorizontal: 10,
    },
    icon: {
        paddingHorizontal: 10,
    },
    previewImage: {
        width: 200,
        height: 150,
        borderRadius: 10,
        alignSelf: 'flex-end', // Align to the right like user messages
        marginVertical: 10,
    },
});

export default TicketChat;
