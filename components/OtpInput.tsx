import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, TextInput, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { images, COLORS } from '@/constants';

// Integration
import { resendOtp } from '@/utils/mutations/authMutations';
import { useMutation } from '@tanstack/react-query';

interface OtpInputProps {
    length: number;
    onComplete: (otp: string) => void;
    email: string;
}

const OtpInput: React.FC<OtpInputProps> = ({ length, onComplete, email }) => {
    console.log("The Email From the OTP Input is:", email);

    const textColor = useThemeColor({ light: '#000', dark: '#fff' }, 'text');
    const borderColor = useThemeColor({ light: '#E0E0E0', dark: '#333' }, 'border');
    const backgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1A1A1A' }, 'background');

    const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
    const inputRefs = useRef<Array<TextInput | null>>([]);

    const [timer, setTimer] = useState(60);
    const [isTimerActive, setIsTimerActive] = useState(false); // Start inactive

    // ✅ Optimized Timer Handling
    useEffect(() => {
        if (!isTimerActive) return;

        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev === 1) {
                    setIsTimerActive(false); // ✅ Stop timer at zero
                    clearInterval(interval);
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isTimerActive]);

    // ✅ Resend OTP Mutation
    // ✅ Resend OTP Mutation
    const { mutate: resendOTP, isPending: isResendingOTP } = useMutation({
        mutationFn: async () => await resendOtp({ data: { email } }), // ✅ Wrap `email` in `data`
        onSuccess: (data) => {
            console.log("✅ OTP Resent:", data);
            setTimer(60);
            setIsTimerActive(true);
        },
        onError: (error) => {
            console.log("❌ Resend OTP Error:", error);
        },
    });


    const handleResendOTP = useCallback(() => {
        if (isResendingOTP) return;
        resendOTP();
    }, [isResendingOTP]);

    const handleChange = (text: string, index: number) => {
        if (!/^\d*$/.test(text)) return;

        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        if (text && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }

        if (newOtp.join('').length === length) {
            onComplete(newOtp.join(''));
        }
    };

    return (
        <>
            {/* OTP Input Fields */}
            <View style={styles.container}>
                {otp.map((_, index) => (
                    <TextInput
                        key={index}
                        ref={(ref) => (inputRefs.current[index] = ref)}
                        style={[styles.input, { borderColor, color: textColor, backgroundColor }]}
                        keyboardType="numeric"
                        maxLength={1}
                        secureTextEntry
                        value={otp[index]}
                        onChangeText={(text) => handleChange(text, index)}
                        onKeyPress={({ nativeEvent }) => {
                            if (nativeEvent.key === 'Backspace' && index > 0) {
                                inputRefs.current[index - 1]?.focus();
                            }
                        }}
                    />
                ))}
            </View>

            {/* Bottom Bar */}
            <View style={styles.barContainer}>
                <Image source={images.bar} style={styles.img} />
            </View>

            {/* Resend OTP Text */}
            <Text style={{ paddingBottom: 10, marginTop: 16, fontWeight: 'bold', textAlign: 'center', color: textColor }}>
                {isTimerActive ? (
                    `OTP can be resent in 00:${timer < 10 ? `0${timer}` : timer} Sec`
                ) : (
                    <TouchableOpacity onPress={handleResendOTP}>
                        <Text style={{ color: COLORS.primary, textAlign: 'center' }}>
                            {isResendingOTP ? "Resending..." : "Resend OTP"}
                        </Text>
                    </TouchableOpacity>
                )}
            </Text>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    input: {
        width: 50,
        height: 50,
        borderWidth: 2,
        borderRadius: 8,
        fontSize: 24,
        textAlign: 'center',
        marginHorizontal: 5,
    },
    barContainer: {
        justifyContent: 'center',
        marginTop: 20,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    img: {
        width: '90%',
    },
});

export default OtpInput;
