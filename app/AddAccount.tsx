import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import PrimaryButton from '@/components/Buy/PrimaryButton';
import Header from '@/components/Header';
import AccountInputField from '@/components/Setting/Account/AccountInputField';
import AccountCheckbox from '@/components/Setting/Account/AccountCheckbox';
import { useLocalSearchParams } from 'expo-router';


//Code Related to the integration:
import { updateBankDetails } from '@/utils/mutations/accountMutations';
import { useMutation } from '@tanstack/react-query';
import { getFromStorage } from '@/utils/storage';
import { storeBankDetails } from '@/utils/mutations/accountMutations';
import { router } from "expo-router";

const AddAccount: React.FC = () => {
    const [token, setToken] = useState<string | null>(null);
    const backgroundColor = useThemeColor({ light: '#EFFEF9', dark: '#000000' }, 'background');

    const params = useLocalSearchParams();

    // ✅ Controlled state for form fields
    const [bankName, setBankName] = useState<string>(params.bankName ? params.bankName.toString() : '');
    const [accountName, setAccountName] = useState<string>(params.accountName ? params.accountName.toString() : '');
    const [accountNumber, setAccountNumber] = useState<string>(params.accountNumber ? params.accountNumber.toString() : '');
    const [isDefault, setIsDefault] = useState<boolean>(params.isDefault === 'true');
    const [isEditing, setIsEditing] = useState<boolean>(params.isEditing === 'true');

    // Fetch the token when the component mounts
    useEffect(() => {
        const fetchUserData = async () => {
            const fetchedToken = await getFromStorage("authToken");
            setToken(fetchedToken);
            console.log("🔹 Retrieved Token:", fetchedToken);
        };

        fetchUserData();
    }, []);

    // ✅ Mutation to update bank details
    const { mutate: updateBankDetailsMutation, isLoading: isUpdating } = useMutation({
        mutationFn: updateBankDetails,
        onSuccess: () => {
            console.log("✅ Bank details updated successfully");
            alert("Bank details updated successfully!");
            router.replace("/Account"); // ✅ Navigate and remove from stack
        },
        onError: (error) => {
            console.error("❌ Failed to update bank details:", error);
            alert("Failed to update bank details, please try again.");
        }
    });

    console.log("🔹 Editing Params:", params.id);

    // Mutation to Store the Bank Details
    const { mutate: storeBankDetailsMutation, isLoading: isStoring } = useMutation({
        mutationFn: storeBankDetails,
        onSuccess: () => {
            console.log("✅ Bank details stored successfully");
            alert("Bank details stored successfully!");
            router.replace("/Account"); // ✅ Navigate and remove from stack

        },
        onError: (error) => {
            console.error("❌ Failed to store bank details:", error);
            alert("Failed to store bank details, please try again.");
        },
    });


    const handleSave = () => {
        if (!bankName || !accountName || !accountNumber) {
            alert("Please fill all fields.");
            return;
        }

        // Prepare payload for the API call
        const payload = {
            id: params.id as string, // Ensure ID is correctly passed if editing
            account_number: accountNumber.trim(),
            account_name: accountName.trim(),
            bank_name: bankName.trim(),
            is_default: isDefault ? 1 : 0, // Convert boolean to number
        };

        console.log("🔹 Payload to Send:", payload);

        if (isEditing) {
            // If editing, update the bank details using the mutation
            updateBankDetailsMutation({ data: payload, token: token as string });
        } else {
            // Placeholder: Logic to store new bank details
            const storePayload = {
                account_number: accountNumber.trim(),
                account_name: accountName.trim(),
                bank_name: bankName.trim(),
                is_default: isDefault ? 1 : 0, // Convert boolean to number
            };

            console.log("🔹 Adding new bank details:", storePayload);
            storeBankDetailsMutation({ data: storePayload, token: token as string });
        }
    };


    return (
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor }]}>
            {/* Header */}
            <Header title={isEditing ? "Edit Account" : "Add Account"} />

            {/* Input Fields */}
            <View style={{ marginTop: 20, paddingHorizontal: 7 }}>
                <AccountInputField
                    label="Bank Name"
                    value={bankName}
                    onChangeText={(text) => setBankName(text)}
                    placeholder="Enter Bank Name"
                />
                <AccountInputField
                    label="Account Name"
                    value={accountName}
                    onChangeText={(text) => setAccountName(text)}
                    placeholder="Enter Account Name"
                />
                <AccountInputField
                    label="Account Number"
                    value={accountNumber}
                    onChangeText={(text) => setAccountNumber(text)}
                    placeholder="Enter Account Number"
                    keyboardType="numeric"
                />

                {/* Checkbox */}
                <AccountCheckbox
                    label="Set as default"
                    checked={isDefault}
                    onToggle={() => setIsDefault(!isDefault)}
                />
            </View>

            {/* Save Button */}
            <View style={styles.buttonContainer}>
                <PrimaryButton
                    title={isUpdating ? "Updating..." : "Save"}
                    onPress={handleSave}
                    disabled={isUpdating}
                />
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

export default AddAccount;
