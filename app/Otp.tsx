import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import Header from '@/components/Header';
import PrimaryButton from '@/components/Buy/PrimaryButton';
import OtpInput from '@/components/OtpInput';
import PinInput from '@/components/PinInput';
import { useRouter } from 'expo-router';
import useLoadFonts from '@/hooks/useLoadFonts';
const Otp: React.FC = () => {
    const backgroundColor = useThemeColor({ light: '#EFFEF9', dark: '#000000' }, 'background');
    const textColor = useThemeColor({ light: '#000', dark: '#fff' }, 'text');
    const buttonColor = useThemeColor({ light: '#22A45D', dark: '#2E7D32' }, 'button');
    const titleColor = useThemeColor({ light: '#0C5E3F', dark: '#25AE7A' }, 'title');
    const fontsLoaded = useLoadFonts(); // Load custom fonts

    const [step, setStep] = useState(1);
    const [otp, setOtp] = useState('');
    const [newPin, setNewPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');

    const router = useRouter();

    // Dynamically set the header title based on step
    const headerTitle = step === 1 ? 'Verification' : 'Pin Setup';

    const handleOtpComplete = (enteredOtp: string) => {
        setOtp(enteredOtp);
        setStep(2);
    };

    const handleNewPinComplete = (enteredPin: string) => {
        setNewPin(enteredPin);
        setStep(3);
    };

    const handleConfirmPinComplete = (enteredPin: string) => {
        if (enteredPin !== newPin) {
            alert('Pins do not match. Try again.');
            return;
        }
        alert('PIN successfully set!');
        router.push('/(tabs)'); // Navigate to main screen
    };

    return (

        <View style={[styles.container, { backgroundColor }]}>
            <Header title={headerTitle} />

            <View style={{ paddingHorizontal: 20 }}>
                <Text style={[styles.title, { color: titleColor, fontFamily: fontsLoaded ? 'Caprasimo-Regular' : undefined }]}>
                    {step === 1 ? 'Input OTP' : step === 2 ? 'Enter Pin' : 'Re-enter Pin'}
                </Text>

                <Text style={[styles.subtitle, { color: textColor }]}>
                    {step === 1 ? 'A 6-digit OTP has been sent to your mobile number' : ''}
                    {step === 2 ? 'Choose a 4-digit PIN you can remember' : ''}
                    .{step === 3 ? 'Choose a 4-digit PIN you can remember' : ''}
                </Text>
            </View>
            {step === 1 && <OtpInput length={6} onComplete={handleOtpComplete} />}
            {step === 2 && <PinInput length={4} onComplete={handleNewPinComplete} />}
            {step === 3 && <PinInput length={4} onComplete={handleConfirmPinComplete} />}

            <View style={styles.buttonContainer}>
                <PrimaryButton title="Proceed" onPress={() => { }} style={{ backgroundColor: buttonColor }} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
    },
    title: {
        fontSize: 48,
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
