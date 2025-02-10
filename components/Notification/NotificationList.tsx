import React from 'react';
import { View, StyleSheet } from 'react-native';
import NotificationItem from '@/components/Notification/NotificationItem';

import { images } from '@/constants';
const notifications = [
    {
        id: 1,
        title: 'Crypto Sent Successfully',
        message: 'Dear EarlyBaze User, You have successfully sent 0.023 BTC to 0xdjknvknvkd...',
        timestamp: '21 - 12 - 24 / 11:34 PM',
        isUnread: true,
    },
    {
        id: 2,
        title: 'Crypto Sent Successfully',
        message: 'Dear EarlyBaze User, You have successfully sent 0.023 BTC to 0xdjknvknvkd...',
        timestamp: '21 - 12 - 24 / 11:34 PM',
    },
    {
        id: 3,
        title: 'New Offer',
        message: 'We have a special offer for you. Trade 2,000 USD today to get a free 20 USD reward.',
        timestamp: '21 - 12 - 24 / 11:34 PM',
        imageUrl: images.sample,
    },
    {
        id: 4,
        title: 'Crypto Received Successfully',
        message: 'Dear EarlyBaze User, You have successfully received 0.023 BTC.',
        timestamp: '21 - 12 - 24 / 11:34 PM',
        isUnread: true,
    },
];

const NotificationList: React.FC = () => {
    return (
        <View style={styles.listContainer}>
            {notifications.map((notification) => (
                <NotificationItem key={notification.id} {...notification} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    listContainer: {
        paddingHorizontal: 16,
    },
});

export default NotificationList;
