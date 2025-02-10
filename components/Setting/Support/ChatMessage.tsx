import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

interface ChatMessageProps {
    sender: string;
    text: string;
    time: string;
    isUser: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ sender, text, time, isUser }) => {
    const backgroundColor = isUser ? '#25AE7A' : '#E5E5E5';
    const textColor = isUser ? '#FFFFFF' : '#222222';

    return (
        <View style={[styles.container, isUser ? styles.userContainer : styles.otherContainer]}>
            <View style={[styles.bubble, isUser ? styles.userBubble : styles.otherBubble, { backgroundColor }]}>
                {!isUser && <Text style={styles.sender}>{sender}</Text>}

                <Text style={[styles.message, { color: textColor }]}>{text}</Text>
                <Text style={[styles.time, isUser ? styles.userTime : styles.otherTime]}>{time}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
        paddingHorizontal: 10,
    },
    userContainer: {
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
    },
    otherContainer: {
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
    },
    sender: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#25AE7A',
    },
    bubble: {
        padding: 12,
        borderRadius: 18,
        maxWidth: '75%',
        position: 'relative',
    },
    userBubble: {
        borderTopRightRadius: 5,
    },
    otherBubble: {
        borderTopLeftRadius: 5,
    },
    message: {
        fontSize: 14,
        lineHeight: 20,
    },
    time: {
        fontSize: 10,
        position: 'absolute',
        top: 5,
        right: 10,
        opacity: 0.6,
    },
    userTime: {
        color: '#D6F8C6',
    },
    otherTime: {
        color: '#666666',
    },
});

export default ChatMessage;
