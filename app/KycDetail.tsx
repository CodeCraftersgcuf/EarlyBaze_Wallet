import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import InputField from '@/components/Setting/Kyc/InputField';
import DatePickerField from '@/components/Setting/Kyc/DatePickerField';
import DropdownField from '@/components/Setting/Kyc/DropdownField';
import FileUploadField from '@/components/Setting/Kyc/FileUploadField';
import PrimaryButton from '@/components/Buy/PrimaryButton';
import { useThemeColor } from '@/hooks/useThemeColor';
import Header from '@/components/Header';
const KycDetail: React.FC = () => {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        address: '',
        state: '',
        bvn: '',
        documentType: '',
        documentNumber: '',
    });
    const backgroundColor = useThemeColor({ light: '#EFFEF9', dark: '#000000' }, 'background');

    return (
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor }]}>
            <Header title="KYC Details" />

            <InputField label="First Name" placeholder="First name" value={form.firstName} onChangeText={(val) => setForm({ ...form, firstName: val })} />
            <InputField label="Last Name" placeholder="Last name" value={form.lastName} onChangeText={(val) => setForm({ ...form, lastName: val })} />
            <DatePickerField label="Date of Birth" value={form.dateOfBirth} onChange={(date) => setForm({ ...form, dateOfBirth: date })} />
            <InputField label="Address" placeholder="Residential address" value={form.address} onChangeText={(val) => setForm({ ...form, address: val })} />
            <InputField label="State" placeholder="State of residence" value={form.state} onChangeText={(val) => setForm({ ...form, state: val })} />
            <InputField label="BVN" placeholder="Bank Verification Number" value={form.bvn} onChangeText={(val) => setForm({ ...form, bvn: val })} />
            <DropdownField label="Type of Document" options={['National ID card', 'International Passport', 'Voters Card', 'Drivers License']}
                selectedValue={form.documentType} onSelect={(val) => setForm({ ...form, documentType: val })} />
            <InputField label="Document Number" placeholder="Document Number" value={form.documentNumber} onChangeText={(val) => setForm({ ...form, documentNumber: val })} />
            <FileUploadField
                onUploadFront={() => console.log('Upload Front Image')}
                onUploadBack={() => console.log('Upload Back Image')}
            />            <PrimaryButton title="Proceed" onPress={() => console.log('Form Submitted')} />
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
});

export default KycDetail;
