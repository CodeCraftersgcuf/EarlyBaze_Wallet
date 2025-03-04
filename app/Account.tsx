import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import PrimaryButton from '@/components/Buy/PrimaryButton';
import Header from '@/components/Header';
import AccountList from '@/components/Setting/Account/AccountList';
import { router } from 'expo-router';

import { Alert } from 'react-native';

//Code related to the Integration
import { getBanksAccounts } from '@/utils/queries/appQueries';
import { useQuery } from '@tanstack/react-query';
import { getFromStorage } from '@/utils/storage';
import { deleteBankDetail } from '@/utils/mutations/accountMutations';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from "@tanstack/react-query"; // ✅ Import queryClient

const Account: React.FC = () => {
    const queryClient = useQueryClient(); // ✅ Get query client instance

    const [token, setToken] = useState<string | null>(null);
    const backgroundColor = useThemeColor({ light: '#EFFEF9', dark: '#000000' }, 'background');

    const title = 'Account Details'; // Add the title here

    useEffect(() => {
        const fetchUserData = async () => {
            const fetchedToken = await getFromStorage('authToken');
            setToken(fetchedToken);
            console.log('🔹 Retrieved Token:', fetchedToken);
        };

        fetchUserData();
    }, []);

    const { data: bankAccounts, error: bankError, isLoading: bankLoading } = useQuery(
        {
            queryKey: ['bankAccounts'],
            queryFn: () => getBanksAccounts({ token }),
            enabled: !!token,
        },
    );

    console.log('🔹 Bank Accounts:', bankAccounts);

    // ✅ Mutation to delete bank details
    const { mutate: deleteBankDetailMutation, isLoading: isDeleting } = useMutation({
        mutationFn: ({ id }: { id: string }) => deleteBankDetail({ data: { id }, token: token as string }),
        onSuccess: () => {
            console.log("✅ Bank details deleted successfully");
            alert("Bank details deleted successfully!");
            queryClient.invalidateQueries({ queryKey: ["bankAccounts"] }); // ✅ Corrected query invalidation
        },
        onError: (error) => {
            console.error("❌ Failed to delete bank details:", error);
            alert("Failed to delete bank details, please try again.");
        },
    });


    // ✅ Transform API data into required format
    const accounts = bankAccounts?.data?.map((account: any) => ({
        id: account.id,
        title: account.account_name, // Use account name as title
        name: account.account_name,
        bankName: account.bank_name,
        accountNumber: account.account_number,
        isDefault: account.is_default === 1, // Convert 1 to boolean true
    })) || [];

    const handleEdit = (id: number) => {
        const accountToEdit = accounts.find(account => account.id === id);
        if (accountToEdit) {
            router.push({
                pathname: '/AddAccount',
                params: {
                    id: accountToEdit.id.toString(),
                    bankName: accountToEdit.bankName,
                    accountName: accountToEdit.name,
                    accountNumber: accountToEdit.accountNumber,
                    isDefault: accountToEdit.isDefault ? 'true' : 'false',
                    isEditing: 'true',
                },
            });
        }
    };

    // ✅ Updated handleDelete function with confirmation alert
    const handleDelete = (id: number) => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this bank account?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => deleteBankDetailMutation({ id: id.toString() }) // ✅ Pass only ID
                }
            ]
        );
    };
    return (
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor }]}>
            {/* Header */}
            <Header title="Account Details" />

            {/* List of Accounts */}
            {bankLoading ? (
                <Text style={{ textAlign: 'center', marginTop: 20 }}>Loading accounts...</Text>
            ) : bankError ? (
                <Text style={{ textAlign: 'center', marginTop: 20, color: 'red' }}>Failed to load accounts</Text>
            ) : (
                <AccountList title={title} accounts={accounts} onEdit={handleEdit} onDelete={handleDelete} />
            )}

            {/* Add New Account Button */}
            <View style={styles.buttonContainer}>
                <PrimaryButton title="Add New" onPress={() => { router.push('/AddAccount'); }} />
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
