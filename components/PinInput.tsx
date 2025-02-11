import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

interface PinInputProps {
  length: number;
  onComplete: (pin: string) => void;
}

const PinInput: React.FC<PinInputProps> = ({ length, onComplete }) => {
  const textColor = useThemeColor({ light: '#000', dark: '#fff' }, 'text');
  const borderColor = useThemeColor({ light: '#E0E0E0', dark: '#333' }, 'border');
  const backgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1A1A1A' }, 'background');
  const [pin, setPin] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, index: number) => {
    if (!/^\d*$/.test(text)) return;

    const newPin = [...pin];
    newPin[index] = text;
    setPin(newPin);

    if (text && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newPin.join('').length === length) {
      onComplete(newPin.join(''));
    }
  };

  return (
    <View style={styles.container}>
      {pin.map((_, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputRefs.current[index] = ref)}
          style={[styles.input, { borderColor: borderColor, color: textColor , backgroundColor: backgroundColor }]}
          keyboardType="numeric"
          maxLength={1}
          secureTextEntry
          value={pin[index]}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === 'Backspace' && index > 0) {
              inputRefs.current[index - 1]?.focus();
            }
          }}
        />
      ))}
    </View>
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
});

export default PinInput;
