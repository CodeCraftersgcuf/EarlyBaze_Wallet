import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Header from '@/components/Header';
import BuyHead from '@/components/BuyHead';
import { useThemeColor } from '@/hooks/useThemeColor';
import NoteBox from '@/components/Buy/NoteBox';
import PrimaryButton from '@/components/Buy/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import { router, useRouter } from "expo-router";
import { useState } from 'react';
import SendCryptoForm from '@/components/Send/SendCryptoForm';
const Send: React.FC = () => {
    const { push } = useRouter();
    const [selectedTab, setSelectedTab] = useState<'Crypto Address' | 'Internal Transfer'>('Crypto Address');

    const backgroundColor = useThemeColor({ light: '#EFFEF9', dark: '#000000' }, 'background');
    const navigation = useNavigation();

    return (
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor }]}>
            <View style={styles.horPadding}>
                <Header />
            </View>
            <View style={styles.content}>
                <BuyHead buttonText="Send Crypto" topLabel="Balance" exchangeRate="$1 = NGN1,750" />
                {/* Insert Separated Component */}
                <SendCryptoForm selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

                <NoteBox />
            </View>

            {/* Navigate to Payment Summary on Click */}
            <View style={styles.buttonContainer}>
                <PrimaryButton title="Proceed" onPress={() => router.push({ pathname: '/TransactionSummary', params: { type: 'send' } })} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingTop: 16,
    },
    horPadding: {
        marginTop: 10,
        paddingHorizontal: 16,
    },
    content: {
        paddingBottom: 16,
    },
    buttonContainer: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
});

export default Send;
