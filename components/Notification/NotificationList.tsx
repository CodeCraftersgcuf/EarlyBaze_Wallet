import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import NotificationItem from '@/components/Notification/NotificationItem';

import { useQuery } from '@tanstack/react-query';
import { getFromStorage } from '@/utils/storage';
import { getAllNotifications } from '@/utils/queries/appQueries';

const BASE_URL = "https://earlybaze.hmstech.xyz/storage/";

const NotificationList: React.FC = () => {
    const [token, setToken] = useState<string | null>(null);

    // Fetch the token when the component mounts
    useEffect(() => {
        const fetchUserData = async () => {
            const fetchedToken = await getFromStorage("authToken");
            setToken(fetchedToken);
            console.log("🔹 Retrieved Token:", fetchedToken);
        };
        fetchUserData();
    }, []);

    // Fetch notifications from API
    const { data: notificationResponse, error, isLoading } = useQuery(
        {
            queryKey: ["notifications", token],
            queryFn: () => getAllNotifications({ token }),
            enabled: !!token, // Only run the query when the token is available
        }
    );

    console.log("🔹 Notification Response:", notificationResponse);

    // Map API data to match NotificationItem structure
    const notifications = notificationResponse?.data?.map((item) => ({
        id: item.id,
        title: item.title,
        message: item.message,
        timestamp: new Date(item.created_at).toLocaleString(), // Convert timestamp
        isUnread: item.status === "active",
        imageUrl: item.attachment ? { uri: `${BASE_URL}${item.attachment}` } : null,
    })) || [];

    return (
        <View style={styles.listContainer}>
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : error ? (
                <Text style={styles.errorText}>Failed to load notifications</Text>
            ) : notifications.length === 0 ? (
                <Text style={styles.errorText}>No notifications available</Text>
            ) : (
                notifications.map((notification) => (
                    <NotificationItem key={notification.id} {...notification} />
                ))
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    listContainer: {
        paddingHorizontal: 16,
    },
    errorText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: 'red',
    },
});

export default NotificationList;
