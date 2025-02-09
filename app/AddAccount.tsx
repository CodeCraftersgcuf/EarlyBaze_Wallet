import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import PrimaryButton from '@/components/Buy/PrimaryButton';
import Header from '@/components/Header';
import AccountInputField from '@/components/Setting/Account/AccountInputField';
import AccountCheckbox from '@/components/Setting/Account/AccountCheckbox';

const AddAccount: React.FC = () => {
    const backgroundColor = useThemeColor({ light: '#EFFEF9', dark: '#000000' }, 'background');
    const [bankName, setBankName] = useState('');
    const [accountName, setAccountName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [isDefault, setIsDefault] = useState(false);

    const handleSave = () => {
        console.log({
            bankName,
            accountName,
            accountNumber,
            isDefault,
        });
    };

    return (
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor }]}>
            {/* Header */}
            <Header title="Account Details" />

            {/* Input Fields */}
            <View style={{ marginTop: 20, paddingHorizontal: 7 }}>
                <AccountInputField label="Bank Name" value={bankName} onChangeText={setBankName} placeholder="Enter Bank Name" />
                <AccountInputField label="Account Name" value={accountName} onChangeText={setAccountName} placeholder="Enter Account Name" />
                <AccountInputField label="Account Number" value={accountNumber} onChangeText={setAccountNumber} placeholder="Enter Account Number" />

                {/* Checkbox */}
                <AccountCheckbox label="Set as default" checked={isDefault} onToggle={() => setIsDefault(!isDefault)} />
            </View>
            {/* Save Button */}
            <View style={styles.buttonContainer}>
                <PrimaryButton title="Save" onPress={handleSave} />
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
