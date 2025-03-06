import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    StyleSheet,
    Image
} from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import PrimaryButton from '@/components/Buy/PrimaryButton';
import { Ionicons } from '@expo/vector-icons';
import { images } from '@/constants';


import { useMutation } from '@tanstack/react-query';
import { createInternalTransfer } from "@/utils/mutations/accountMutations";
import { verifyPin } from "@/utils/mutations/authMutations";


interface VerificationModalProps {
    visible: boolean;
    onClose: () => void;
    onFail: () => void; // New prop to handle failure
}

const VerificationModal: React.FC<VerificationModalProps & { requestData: any; onSuccess: (reference: string) => void }> = ({ visible, onClose, onFail, requestData, onSuccess }) => {
    // ✅ First mutation - Verify PIN
    const { isPending: isPendingPin, mutate: mutatePin } = useMutation({
        mutationFn: (data: { email: string; pin: string }) => verifyPin(data),
        onSuccess: () => {
            console.log("✅ Pin Verification Successful");

            // If PIN is correct, proceed to transfer
            mutateTransfer(
                {
                    data: {
                        currency: requestData.currency,
                        network: requestData.network,
                        amount: requestData.amount,
                        email: requestData.email,
                    },
                    token: requestData.token,
                },
                {
                    onSuccess: (response) => {
                        console.log("✅ Transfer Successful:", response);

                        // Extract transaction reference
                        const reference = response?.data?.reference || "N/A";
                        onSuccess(reference);

                        onClose(); // ✅ Close verification modal
                    },
                    onError: (error) => {
                        console.error("❌ Transfer Failed:", error);
                        onFail(); // ✅ Show failure modal
                    },
                }
            );
        },
        onError: (error) => {
            console.error("❌ Pin Verification Failed:", error);
            onFail(); // ✅ Show failure modal
        },
    });

    // ✅ Second mutation - Create Internal Transfer
    const { isPending: isPendingTransfer, mutate: mutateTransfer } = useMutation({
        mutationFn: (data: { data: any; token: string }) => createInternalTransfer(data),
    });

    const cardBackgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1A1A1A' }, 'card');
    const textTitleColor = useThemeColor({ light: '#25AE7A', dark: '#25AE7A' }, 'textTitle');
    const textColor = useThemeColor({ light: '#222222', dark: '#FFFFFF' }, 'text');
    const backgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#2A2A2A' }, 'background');
    const borderColor = useThemeColor({ light: '#E5E5E5', dark: '#444' }, 'border');

    const close = useThemeColor({ light: images.cross_white, dark: images.cross_black }, 'close');

    const [otp, setOtp] = useState('');
    const [pin, setPin] = useState('');
    const [timer, setTimer] = useState(0);
    const [isOtpFocused, setIsOtpFocused] = useState(false);
    const [isPinFocused, setIsPinFocused] = useState(false);

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
                        <TouchableOpacity onPress={onClose} style={[styles.closeButton, { backgroundColor }]}>
                            <Image source={close} style={styles.closeIcon} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.horizontalLine} />

                    {/* OTP Input */}
                    <View style={styles.inputContainer}>
                        <Text style={[styles.label, { color: textColor }]}>Email OTP</Text>
                        <View style={[styles.inputRow, { borderColor: isOtpFocused ? '#25AE7A' : borderColor }]}>
                            <TextInput
                                placeholder="Email"
                                placeholderTextColor="#A1A1A1"
                                style={[styles.inputField, { color: textColor }]}
                                value={otp}
                                onChangeText={setOtp}
                                onFocus={() => setIsOtpFocused(true)}
                                onBlur={() => setIsOtpFocused(false)}
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

                        {/* Resend Timer Fix */}
                        {timer > 0 && (
                            <Text style={styles.resendText}>
                                Resend in <Text style={styles.timer}>00 : {timer < 10 ? `0${timer}` : timer}</Text>
                            </Text>
                        )}

                        {/* PIN Input */}
                        <Text style={[styles.label, { color: textColor, marginTop: 20 }]}>Input Pin</Text>
                        <View style={[styles.inputRow, { borderColor: isPinFocused ? '#25AE7A' : borderColor }]}>
                            <TextInput
                                placeholder="Input Pin"
                                placeholderTextColor="#A1A1A1"
                                style={[styles.inputField, { color: textColor }]}
                                secureTextEntry
                                value={pin}
                                onChangeText={setPin}
                                onFocus={() => setIsPinFocused(true)}
                                onBlur={() => setIsPinFocused(false)}
                            />
                            <View style={styles.iconContainer}>
                                <TouchableOpacity style={styles.authButton}>
                                    <Ionicons name="finger-print" size={28} color="#fff" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.authButton}>
                                    <Image source={images.face} style={styles.authIcon} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={styles.buttonContainer}>
                        {/* Proceed Button - Calls API Request */}
                        <PrimaryButton
                            title={isPendingTransfer || isPendingPin ? "Processing..." : "Proceed"}
                            onPress={() => {
                                console.log("🔹 Verifying PIN for:", requestData.email);

                                mutatePin(
                                    { email: requestData.email, pin }, // ✅ Verify PIN first
                                    {
                                        onSuccess: () => {
                                            console.log("✅ PIN Verified! Proceeding with Transfer...");

                                            mutateTransfer(
                                                {
                                                    data: {
                                                        currency: requestData.currency,
                                                        network: requestData.network,
                                                        amount: requestData.amount,
                                                        email: requestData.email,
                                                    },
                                                    token: requestData.token,
                                                },
                                                {
                                                    onSuccess: (response) => {
                                                        console.log("✅ Transfer Successful:", response);

                                                        // Extract transaction reference
                                                        const reference = response?.data?.reference || "N/A";
                                                        onSuccess(reference);

                                                        onClose(); // ✅ Close verification modal
                                                    },
                                                    onError: (error) => {
                                                        console.error("❌ Transfer Failed:", error);
                                                        onFail(); // ✅ Show failure modal
                                                    },
                                                }
                                            );
                                        },
                                        onError: (error) => {
                                            console.error("❌ PIN Verification Failed:", error);
                                            onFail(); // ✅ Show failure modal
                                        },
                                    }
                                );
                            }}
                            disabled={isPendingTransfer || isPendingPin}
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
        backgroundColor: '#0F714D',
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
    closeButton: {
        padding: 5,
        borderRadius: 25,
        borderWidth: 1,
    },
    closeIcon: {
        width: 20,
        height: 20,
    },
});

export default VerificationModal;
