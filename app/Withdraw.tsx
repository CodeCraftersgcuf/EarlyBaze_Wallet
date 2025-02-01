import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import PrimaryButton from '@/components/Buy/PrimaryButton';
import Header from '@/components/Header';
import BuyHead from '@/components/BuyHead';
import PaymentMethodModal from '@/components/Buy/PaymentMethodModal';
import { useRouter, router } from 'expo-router';

const Withdraw: React.FC = () => {
    // Theme Colors
    const backgroundColor = useThemeColor({ light: '#EFFEF9', dark: '#000000' }, 'background');
    const cardBackgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1A1A1A' }, 'card');
    const textColor = useThemeColor({ light: '#000000', dark: '#FFFFFF' }, 'text');
    const placeholderColor = useThemeColor({ light: '#A0A0A0', dark: '#CCCCCC' }, 'placeholder');
    const borderColor = useThemeColor({ light: '#22A45D', dark: '#157347' }, 'border');
    const noteBackgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#000000' }, 'noteBackground');
    const [modalVisible, setModalVisible] = useState(false);

    const [amount, setAmount] = useState('');
    const [selectedAccount, setSelectedAccount] = useState('');

    return (
        <View style={[styles.container, { backgroundColor }]}>
            {/* Header */}
            <Header />

            {/* Withdraw Button Section */}
            <BuyHead buttonText="Withdraw" />

            {/* Scrollable Content */}
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.content}>

                    <View>
                        {/* Form Container */}
                        <View style={[styles.formContainer, { backgroundColor: cardBackgroundColor }]}>
                            {/* Amount Input */}
                            <Text style={[styles.label, { color: textColor }]}>Amount</Text>
                            <TextInput
                                style={[styles.input, { color: textColor, backgroundColor: cardBackgroundColor }]}
                                placeholder="Enter amount to withdraw"
                                placeholderTextColor={placeholderColor}
                                keyboardType="numeric"
                                value={amount}
                                onChangeText={setAmount}
                            />

                            {/* Receiving Account Dropdown */}
                            <Text style={[styles.label, { color: textColor }]}>Receiving Account</Text>
                            <TouchableOpacity style={[styles.dropdown, { backgroundColor: cardBackgroundColor }]}  onPress={() => setModalVisible(true)}>
                                <Text style={{ color: selectedAccount ? textColor : placeholderColor }}>
                                    {selectedAccount || 'Choose Receiving Account'}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Note Box */}
                        <View style={[styles.noteContainer, { borderColor, backgroundColor: noteBackgroundColor }]}>
                            <Text style={[styles.noteTitle, { color: textColor }]}>Note</Text>
                            <View style={styles.noteDivider} />
                            <Text style={[styles.noteText, { color: textColor }]}>
                                Withdrawals can take up to 2 days depending on the bank{'\n'}
                                Withdrawal account must match wallet name
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Proceed Button Fixed at Bottom */}
            <View style={styles.fixedButtonContainer}>
                <PrimaryButton title="Proceed" onPress={() =>router.push('/TransactionPage')} />
            </View>
            <PaymentMethodModal title='Choose Account' visible={modalVisible} onClose={() => setModalVisible(false)} />

        </View>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, // Ensures full height for absolute positioning
    },
    scrollContent: {
        paddingBottom: 140, // Ensures space above fixed button
    },
    content: {
        justifyContent: 'space-between',
    },
    formContainer: {
        flexGrow: 1, // Expands to fill space
        borderRadius: 10,
        padding: 16,
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        marginHorizontal: 18,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        height: 45,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    dropdown: {
        height: 45,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 10,
        justifyContent: 'center',
    },

    // Note Box Styling
    noteContainer: {
        borderWidth: 1,
        borderRadius: 15, // Rounded edges
        marginHorizontal: 18,
        marginTop: 15,
    },
    noteTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
        paddingLeft: 12,
        paddingTop: 6,
    },

    noteDivider: {
        height: 1,
        backgroundColor: '#22A45D', // Green Divider
        marginBottom: 8,
    },
    noteText: {
        fontSize: 13,
        paddingVertical: 12,
        paddingLeft: 8,
    },

    fixedButtonContainer: {
        position: 'absolute',
        bottom: 20,
        width: '90%',
        alignSelf: 'center', // Centers the button horizontally
    }
});

export default Withdraw;
