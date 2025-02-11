import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';

interface ChangePinModalProps {
  visible: boolean;
  onClose: () => void;
}

const ChangePinModal: React.FC<ChangePinModalProps> = ({ visible, onClose }) => {
  const backgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1A1A1A' }, 'background');
  const textColor = useThemeColor({ light: '#000', dark: '#fff' }, 'text');
  const buttonColor = useThemeColor({ light: '#22A45D', dark: '#2E7D32' }, 'button');
  const borderColor = useThemeColor({ light: '#E0E0E0', dark: '#333' }, 'border');

  const [step, setStep] = useState(1);
  const [pin, setPin] = useState<string[]>(['', '', '', '']);
  const [newPin, setNewPin] = useState<string[]>(['', '', '', '']);
  const [confirmPin, setConfirmPin] = useState<string[]>(['', '', '', '']);

  const inputRefs = useRef<Array<TextInput | null>>([]);

  // Reset the modal state when it is closed
  useEffect(() => {
    if (!visible) {
      setStep(1);
      setPin(['', '', '', '']);
      setNewPin(['', '', '', '']);
      setConfirmPin(['', '', '', '']);
    }
  }, [visible]);

  const handleChange = (text: string, index: number) => {
    if (!/^\d*$/.test(text)) return; // Ensure only numeric input

    let newPinArray = [...pin];

    if (step === 1) newPinArray = [...pin];
    else if (step === 2) newPinArray = [...newPin];
    else newPinArray = [...confirmPin];

    newPinArray[index] = text;
    
    if (step === 1) setPin(newPinArray);
    else if (step === 2) setNewPin(newPinArray);
    else setConfirmPin(newPinArray);

    // Move to the next input field automatically
    if (text && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleProceed = () => {
    const enteredPin = step === 1 ? pin.join('') : step === 2 ? newPin.join('') : confirmPin.join('');

    if (enteredPin.length !== 4) {
      Alert.alert('Error', 'Please enter a valid 4-digit PIN.');
      return;
    }

    if (step === 1) {
      setStep(2);
      setNewPin(['', '', '', '']); // Reset new PIN fields
    } else if (step === 2) {
      setStep(3);
      setConfirmPin(['', '', '', '']); // Reset confirm PIN fields
    } else if (step === 3) {
      if (confirmPin.join('') !== newPin.join('')) {
        Alert.alert('Error', 'New PIN does not match. Please try again.');
        return;
      }
      Alert.alert('Success', 'PIN successfully changed!');
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={[styles.modalContainer, { backgroundColor }]}>
          {/* Header with Close Button */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: buttonColor }]}>Pin Setup</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={22} color={textColor} />
            </TouchableOpacity>
          </View>

          {/* Step Text */}
          <Text style={styles.subTitle}>
            {step === 1 ? 'Input Old Pin' : step === 2 ? 'Input New Pin' : 'Re-enter New Pin'}
          </Text>

          {/* PIN Input Fields */}
          <View style={styles.pinInputContainer}>
            {(step === 1 ? pin : step === 2 ? newPin : confirmPin).map((_, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                style={[
                  styles.pinInput,
                  { borderColor: borderColor, color: textColor, backgroundColor: backgroundColor }
                ]}
                keyboardType="numeric"
                maxLength={1}
                secureTextEntry
                value={step === 1 ? pin[index] : step === 2 ? newPin[index] : confirmPin[index]}
                onChangeText={(text) => handleChange(text, index)}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === 'Backspace' && index > 0) {
                    inputRefs.current[index - 1]?.focus();
                  }
                }}
              />
            ))}
          </View>

          {/* Proceed Button */}
          <TouchableOpacity style={[styles.button, { backgroundColor: buttonColor }]} onPress={handleProceed}>
            <Text style={styles.buttonText}>Proceed</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContainer: {
    width: '93%',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6, // For Android shadow
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 15,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  subTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#22A45D',
    paddingBottom: 10,
  },
  pinInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  pinInput: {
    width: 55,
    height: 55,
    borderWidth: 2,
    borderRadius: 10,
    fontSize: 26,
    textAlign: 'center',
    marginHorizontal: 8,
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChangePinModal;
