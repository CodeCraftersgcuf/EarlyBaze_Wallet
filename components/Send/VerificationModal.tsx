import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    StyleSheet
} from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import PrimaryButton from '@/components/Buy/PrimaryButton';
import { Ionicons } from '@expo/vector-icons';

interface VerificationModalProps {
    visible: boolean;
    onClose: () => void;
    onFail: () => void; // New prop to handle failure
}

const VerificationModal: React.FC<VerificationModalProps> = ({ visible, onClose, onFail }) => {
    const cardBackgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1A1A1A' }, 'card');
    const textTitleColor = useThemeColor({ light: '#25AE7A', dark: '#FFFFFF' }, 'textTitle');
    const textColor = useThemeColor({ light: '#222222', dark: '#FFFFFF' }, 'text');

    const [otp, setOtp] = useState('');
    const [pin, setPin] = useState('');
    const [timer, setTimer] = useState(0);

    // Start countdown when timer > 0
    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    // Handle resend button click
    const handleResendOtp = () => {
        setTimer(30); // Start 30-second timer
    };

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.overlay}>
                <View style={[styles.modalContainer, { backgroundColor: cardBackgroundColor }]}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={[styles.title, { color: textTitleColor }]}>Verification</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name="close-circle-outline" size={28} color={textColor} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.horizontalLine} />

                    {/* OTP Input */}
                    <View style={styles.inputContainer}>
                        <Text style={[styles.label, { color: textColor }]}>Email OTP</Text>
                        <View style={styles.inputRow}>
                            <TextInput
                                placeholder="Input OTP"
                                placeholderTextColor="#A1A1A1"
                                style={[styles.inputField, { color: textColor }]}
                                value={otp}
                                onChangeText={setOtp}
                            />
                            <TouchableOpacity
                                style={styles.sendOtpButton}
                                onPress={handleResendOtp}
                                disabled={timer > 0}
                            >
                                <Text style={[styles.sendOtpText, timer > 0 && styles.disabledText]}>
                                    {timer > 0 ? `Resend in ${timer}s` : 'Resend OTP'}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Resend Timer */}
                        {timer > 0 && (
                            <Text style={styles.resendText}>
                                Resend in <Text style={styles.timer}>00 : {timer < 10 ? `0${timer}` : timer}</Text>
                            </Text>
                        )}

                        {/* PIN Input */}
                        <Text style={[styles.label, { color: textColor, marginTop: 20 }]}>Input Pin</Text>
                        <View style={styles.inputRow}>
                            <TextInput
                                placeholder="Input Pin"
                                placeholderTextColor="#A1A1A1"
                                style={[styles.inputField, { color: textColor }]}
                                secureTextEntry
                                value={pin}
                                onChangeText={setPin}
                            />
                            <View style={styles.iconContainer}>
                                <TouchableOpacity style={styles.authButton}>
                                    <Ionicons name="finger-print" size={28} color="#fff" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.authButton}>
                                    <Ionicons name="scan-outline" size={28} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={styles.buttonContainer}>
                        {/* Proceed Button - Closes VerificationModal & Opens TransactionFailedModal */}
                        <PrimaryButton
                            title="Proceed"
                            onPress={() => {
                                onClose(); // Close the verification modal
                                onFail(); // Show the failure modal
                            }}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '90%',
        borderRadius: 15,
        alignItems: 'center',
    },
    horizontalLine: {
        width: '100%',
        height: 1,
        backgroundColor: '#E6E6E6',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    label: {
        fontSize: 11,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        marginBottom: 5,
    },
    inputContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        borderRadius: 10,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#E5E5E5',
        height: 50,
    },
    inputField: {
        flex: 1,
        fontSize: 12,
        paddingVertical: 8,
    },
    sendOtpButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#25AE7A',
    },
    sendOtpText: {
        color: '#25AE7A',
        fontWeight: 'bold',
        fontSize: 12,
    },
    disabledText: {
        color: '#999',
    },
    resendText: {
        alignSelf: 'flex-end',
        marginTop: 5,
        fontSize: 12,
        color: '#555',
    },
    timer: {
        color: '#25AE7A',
        fontWeight: 'bold',
    },
    iconContainer: {
        flexDirection: 'row',
        gap: 8,
        marginLeft: 10,
    },
    authButton: {
        backgroundColor: '#25AE7A',
        borderRadius: 10,
        padding: 10,
    },
    buttonContainer: {
        width: '100%',
        marginTop: 20,
        paddingHorizontal: 16,
    },
});

export default VerificationModal;
