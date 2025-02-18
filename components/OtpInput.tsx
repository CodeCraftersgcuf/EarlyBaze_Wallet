import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { images, COLORS } from '@/constants';

interface OtpInputProps {
    length: number;
    onComplete: (otp: string) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ length, onComplete }) => {
    
    const textColor = useThemeColor({ light: '#000', dark: '#fff' }, 'text');
    const borderColor = useThemeColor({ light: '#E0E0E0', dark: '#333' }, 'border');
    const backgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1A1A1A' }, 'background');

    const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
    const inputRefs = useRef<Array<TextInput | null>>([]);

    const [timer, setTimer] = useState(60);
    const [isTimerActive, setIsTimerActive] = useState(true);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isTimerActive && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            setIsTimerActive(false);
        }
        return () => clearInterval(interval);
    }, [timer, isTimerActive]);

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
                        style={[styles.input, { borderColor: borderColor, color: textColor, backgroundColor: backgroundColor }]}
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
                {isTimerActive && timer > 0 ? (
                    <Text>
                        OTP can be resent in
                        <Text style={{ color: COLORS.primary }}> {`00 : ${timer} Sec`}</Text>
                    </Text>
                ) : (
                    <TouchableOpacity onPress={() => {
                        setTimer(60);
                        setIsTimerActive(true);
                    }}>
                        <Text style={{ color: COLORS.primary, textAlign: 'center' }}>Resend OTP</Text>
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
