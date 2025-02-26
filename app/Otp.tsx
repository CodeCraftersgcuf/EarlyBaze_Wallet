import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import Header from '@/components/Header';
import PrimaryButton from '@/components/Buy/PrimaryButton';
import OtpInput from '@/components/OtpInput';
import PinInput from '@/components/PinInput';
import { useRouter } from 'expo-router';
import useLoadFonts from '@/hooks/useLoadFonts';

// API Mutations
import { useLocalSearchParams } from 'expo-router';
import { verifyEmailOTP, setPin, verifyPin } from '@/utils/mutations/authMutations';
import { useMutation } from '@tanstack/react-query';

const Otp: React.FC = () => {
    const backgroundColor = useThemeColor({ light: '#EFFEF9', dark: '#000000' }, 'background');
    const textColor = useThemeColor({ light: '#000', dark: '#fff' }, 'text');
    const buttonColor = useThemeColor({ light: '#22A45D', dark: '#2E7D32' }, 'button');
    const titleColor = useThemeColor({ light: '#0C5E3F', dark: '#25AE7A' }, 'title');
    const fontsLoaded = useLoadFonts();
    const router = useRouter();

    const { email } = useLocalSearchParams(); // ✅ Get email from params
    console.log("📩 Received email:", email); // Debugging

    const [step, setStep] = useState(1);
    const [otp, setOtp] = useState('');
    const [newPin, setNewPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');

    // ✅ OTP Verification Mutation
    const { mutate: verifyOtp, isPending: isVerifyingOtp } = useMutation({
        mutationFn: (data: { otp: string; email: string }) => verifyEmailOTP(data),
        onSuccess: (data) => {
            console.log("✅ OTP Verified:", data);
            setStep(2);
        },
        onError: (error) => {
            console.log("❌ OTP Verification Error:", error);
            Alert.alert("Error", "Invalid OTP. Please try again.");
        },
    });

    // ✅ Set Pin Mutation
    const { mutate: submitPin, isPending: isSettingPin } = useMutation({
        mutationFn: (data: { email: string; pin: string }) => setPin(data),
        onSuccess: (data) => {
            console.log("✅ Pin Set Successfully:", data);
            setStep(3);
        },
        onError: (error) => {
            console.log("❌ Set Pin Error:", error);
            Alert.alert("Error", "Failed to set PIN. Please try again.");
        },
    });

    // ✅ Verify Pin Mutation (Fixed: Now includes email)
    const { mutate: checkPin, isPending: isVerifyingPin } = useMutation({
        mutationFn: (data: { email: string; pin: string }) => verifyPin(data),
        onSuccess: (data) => {
            console.log("✅ Pin Verified Successfully:", data);
            Alert.alert("Success", "PIN verified successfully!");
            router.push('/(tabs)'); // Navigate to main screen
        },
        onError: (error) => {
            console.log("❌ Verify Pin Error:", error);
            Alert.alert("Error", "Invalid PIN. Please try again.");
        },
    });

    // ✅ Handle OTP Verification
    const handleOtpVerification = () => {
        if (!otp || otp.length !== 6) {
            Alert.alert("Error", "Please enter a valid 6-digit OTP.");
            return;
        }
        verifyOtp({ otp, email }); // ✅ Send request
    };

    // ✅ Handle Setting New Pin
    const handleNewPinComplete = (enteredPin: string) => {
        setNewPin(enteredPin);
        submitPin({ email, pin: enteredPin }); // ✅ Send request
    };

    // ✅ Handle Confirming Pin (Fixed: Includes email in request)
    const handleConfirmPinComplete = (enteredPin: string) => {
        if (enteredPin !== newPin) {
            Alert.alert('Error', 'Pins do not match. Try again.');
            return;
        }
        checkPin({ email, pin: enteredPin }); // ✅ Send request with email
    };

    const headerTitle = step === 1 ? 'Verification' : 'Pin Setup';

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <Header title={headerTitle} />

            <View style={{ paddingHorizontal: 20 }}>
                <Text style={[styles.title, { color: titleColor, fontFamily: fontsLoaded ? 'Caprasimo-Regular' : undefined }]}>
                    {step === 1 ? 'Input OTP' : step === 2 ? 'Enter Pin' : 'Re-enter Pin'}
                </Text>

                <Text style={[styles.subtitle, { color: textColor }]}>
                    {step === 1 ? 'A 6-digit OTP has been sent to your email.' : ''}
                    {step === 2 ? 'Choose a 4-digit PIN you can remember.' : ''}
                    {step === 3 ? 'Re-enter your PIN to confirm.' : ''}
                </Text>
            </View>

            {/* Step Components */}
            {step === 1 && <OtpInput length={6} onComplete={setOtp} email={email} />}
            {step === 2 && <PinInput length={4} onComplete={handleNewPinComplete} />}
            {step === 3 && <PinInput length={4} onComplete={handleConfirmPinComplete} />}

            <View style={styles.buttonContainer}>
                <PrimaryButton
                    title={step === 1 ? "Verify OTP" : step === 2 ? "Set PIN" : "Confirm PIN"}
                    onPress={
                        step === 1 ? handleOtpVerification :
                            step === 2 ? () => handleNewPinComplete(newPin) :
                                () => handleConfirmPinComplete(confirmPin)
                    }
                    style={{ backgroundColor: buttonColor }}
                    disabled={isVerifyingOtp || isSettingPin || isVerifyingPin}
                />
            </View>
        </View>
    );
};

// ✅ Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    subtitle: {
        fontSize: 14,
        marginBottom: 20,
        fontWeight: '600',
    },
    buttonContainer: {
        paddingHorizontal: 20,
        position: 'absolute',
        bottom: 20,
        width: '100%',
        alignSelf: 'center',
    },
});

export default Otp;
