import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import PrimaryButton from '@/components/Buy/PrimaryButton';
import Header from '@/components/Header';
import AccountList from '@/components/Setting/Account/AccountList';
import { useRouter, router } from 'expo-router';
const Account: React.FC = () => {
    const backgroundColor = useThemeColor({ light: '#EFFEF9', dark: '#000000' }, 'background');
    const [accounts, setAccounts] = useState([
        { id: 1, title: 'Account 1', name: 'Account 1', bankName: 'Kuda Bank', accountNumber: '123456789', isDefault: true },
        { id: 2, title: 'Account 2', name: 'Account 2', bankName: 'Kuda Bank', accountNumber: '123456789' },
    ]);
    const title = 'Account Details';  // Add the title here

    const handleEdit = (id: number) => {
        console.log(`Editing account ${id}`);
    };

    const handleDelete = (id: number) => {
        setAccounts((prev) => prev.filter((account) => account.id !== id));
    };

    return (
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor }]}>
            {/* Header */}
            <Header title="Account Details" />

            {/* List of Accounts */}
            <AccountList title={title} accounts={accounts} onEdit={handleEdit} onDelete={handleDelete} />

            {/* Add New Account Button */}
            <View style={styles.buttonContainer}>
                <PrimaryButton title="Add New" onPress={() => { router.push('/AddAccount') }} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: 16,
        paddingBottom: 20,
        paddingTop: 20,
    },
    buttonContainer: {
        marginTop: 20,
        paddingHorizontal: 16,
        position: 'absolute',
        bottom: 20,
        width: '100%',
        alignSelf: 'center',

    },
});

export default Account;
