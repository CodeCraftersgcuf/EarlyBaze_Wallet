import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useLocalSearchParams } from 'expo-router';
import Header from '@/components/Header';
import TicketDetails from '@/components/Setting/Support/TicketDetails';
import ChatMessage from '@/components/Setting/Support/ChatMessage';
import { Ionicons, Entypo } from '@expo/vector-icons';

const TicketChat: React.FC = () => {
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

    const sendMessage = () => {
        if (messageText.trim().length > 0) {
            const userMessage = { id: `${messages.length + 1}`, sender: 'You', text: messageText, time: 'Now', isUser: true };
            setMessages([...messages, userMessage]);
            setMessageText('');

            // Simulating a reply from the support team after a short delay
            setTimeout(() => {
                const botResponse = { id: `${messages.length + 2}`, sender: 'Alex', text: 'We are looking into your issue. Please hold on.', time: 'Now', isUser: false };
                setMessages((prevMessages) => [...prevMessages, botResponse]);
            }, 1500);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <Header title={`Ticket ${id}`} />

            {/* Ticket Details */}
            <TicketDetails
                status="Answered"
                name="Qamardeen"
                subject="Swap"
                priority="High"
                dateCreated="01 - 01 - 24 / 11:12 AM"
            />

            {/* Chat Messages */}
            <ScrollView contentContainerStyle={[styles.chatContainer, { backgroundColor: chatBackgroundColor }]}>
                {messages.map((msg) => (
                    <ChatMessage key={msg.id} {...msg} />
                ))}
            </ScrollView>

            {/* Chat Input */}
            <View style={[styles.inputContainer, { backgroundColor: inputBackground }]}>
                <TouchableOpacity>
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
});

export default TicketChat;
