import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import { images } from '@/constants';
// Success Icon Component
const SuccessIcon: React.FC = () => (
  <View style={styles.successIconContainer}>
    <View style={styles.successIcon}>
      <Ionicons name="checkmark" size={50} color="white" />
    </View>
  </View>
);

// Transaction Message Component
const TransactionMessage: React.FC = () => (
  <View style={styles.textContainer}>
    <Text style={styles.successText}>Transaction Successful</Text>
    <Text style={styles.description}>
      You have successfully sent <Text style={styles.bold}>0.00233 BTC</Text> to
    </Text>
    <Text style={styles.walletAddress}>0xsdjfdn3jfkdnvksdfnsdkbj</Text>
  </View>
);

// Button Component
const TransactionButton: React.FC<{ onPress: () => void }> = ({ onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>View Transaction</Text>
  </TouchableOpacity>
);

const TransactionSuccessfulModal: React.FC<{ visible: boolean; onClose: () => void }> = ({ visible, onClose }) => {
  const backgroundColor = useThemeColor({ light: '#22A45D', dark: '#000000' }, 'background');

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={[styles.modalContainer, { backgroundColor }]}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Image source={images.successTick}/>
        </TouchableOpacity>

        <SuccessIcon />
        <TransactionMessage />
        <View style={styles.buttonContainer}>
        <TransactionButton onPress={() => console.log('View Transaction')} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 30,
    right: 20,
    zIndex: 10,
  },
  successIconContainer: {
    marginBottom: 20,
  },
  successIcon: {
    backgroundColor: '#138A36',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  successText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
  walletAddress: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#E0E0E0',
    marginTop: 5,
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#22A45D',
  },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        alignItems: 'center',
    },
});

export default TransactionSuccessfulModal;
