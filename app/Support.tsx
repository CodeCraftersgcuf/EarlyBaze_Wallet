import React from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import Header from '@/components/Header';
import SupportOption from '@/components/Setting/Support/SupportOption';
import NewTicketForm from '@/components/Setting/Support/NewTicketForm';
import { images } from '@/constants';
import { useRouter, router } from 'expo-router';
const Support: React.FC = () => {
    const backgroundColor = useThemeColor({ light: '#EFFEF9', dark: '#000000' }, 'background');

    return (
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor }]}>
            <Header title="Support" />

            <View style={styles.subContainer}>
                {/* Image */}
                <Image source={images.support_girl} style={styles.image} />

                {/* Support Options */}
                <View style={styles.optionsContainer}>
                    <SupportOption title="Tickets" image={images.ticket} onPress={() => router.push("/Tickets")} notificationCount={2} />
                    <SupportOption title="Email Us" image={images.email} onPress={() => console.log("Email Us")} />
                    <SupportOption title="Call Us" image={images.call} onPress={() => console.log("Call Us")} />
                </View>

                {/* New Ticket Form */}
                <NewTicketForm />
            </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingBottom: 20,
        paddingTop: 20,
    },
    subContainer: {
        paddingHorizontal: 16,
    },
    image: {
        width: '100%',
        height: 256,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
});

export default Support;
