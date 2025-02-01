import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor'; // Import theme color hook
import icons from '@/constants/icons'; // Ensure this path matches your icons file

interface PaymentMethodModalProps {
  title: string;
  visible: boolean;
  onClose: () => void;
}

const PaymentMethodModal: React.FC<PaymentMethodModalProps> = ({ title, visible, onClose }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<number | null>(null);

  const backgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#000000' }, 'background');
  const textColor = useThemeColor({ light: '#000000', dark: '#FFFFFF' }, 'text');
  const borderColor = useThemeColor({ light: '#228B22', dark: '#90EE90' }, 'border');
  const containerBackgroundColor = useThemeColor({ light: '#FFFFF', dark: '#161616' }, "containerBackgroundColor");
  const accounts = [
    { id: 1, bankName: 'Access Bank', accountName: 'Early Baze', accountNumber: '123456789' },
    { id: 2, bankName: 'Access Bank', accountName: 'Early Baze', accountNumber: '123456789' },
  ];

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.overlay}>
        <View style={[styles.modalContainer, { backgroundColor }]}>
          {/* Modal Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: textColor }]}>{title}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={[styles.closeText, { color: textColor }]}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Payment Option (Bank Transfer) */}
          <TouchableOpacity
            style={[styles.paymentOption,  { backgroundColor: containerBackgroundColor }]}
            onPress={() => setIsDropdownVisible(!isDropdownVisible)}
          >
            {/* Bank Icon */}
            <Image source={icons.bank} style={styles.bankIcon} />
            <Text style={[styles.paymentText, { color: textColor }]}>Bank Transfer</Text>

            {/* Dropdown Toggle Arrow */}
            <Image
              source={icons.down_arrow}
              style={[styles.arrowIcon, isDropdownVisible && styles.arrowRotated]}
            />
          </TouchableOpacity>

          {/* Dropdown Accounts List */}
          {isDropdownVisible && (
            <View style={[styles.accountContainer, { backgroundColor: containerBackgroundColor }]}>
              <FlatList
                data={accounts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.accountItem,
                      { borderColor },
                      selectedAccount === item.id && styles.accountSelected,
                    ]}
                    onPress={() => setSelectedAccount(item.id)}
                  >
                    {/* Radio Button */}
                    <View style={[styles.radioCircle, { borderColor }]}>
                      {selectedAccount === item.id && (
                        <View style={[styles.radioSelected, { backgroundColor: borderColor }]} />
                      )}
                    </View>

                    {/* Account Info */}
                    <View style={styles.accountDetails}>
                      <Text style={[styles.accountTitle, { color: textColor }]}>Account {item.id}</Text>
                      <Text style={[styles.accountText, { color: textColor }]}>Bank Name: {item.bankName}</Text>
                      <Text style={[styles.accountText, { color: textColor }]}>Account Name: {item.accountName}</Text>
                      <Text style={[styles.accountText, { color: textColor }]}>Account Number: {item.accountNumber}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#F5F5F5',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    fontSize: 18,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    padding: 12,
    justifyContent: 'space-between',
  },
  bankIcon: {
    width: 40,
    height: 40,
  },
  paymentText: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    marginLeft: 10,
  },
  arrowIcon: {
    width: 15,
    height: 15,
    transform: [{ rotate: '0deg' }],
  },
  arrowRotated: {
    transform: [{ rotate: '180deg' }],
  },
  accountContainer: {
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
  },
  accountItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  accountSelected: {
    backgroundColor: '#E6F4EA',
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  accountDetails: {
    flex: 1,
  },
  accountTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  accountText: {
    fontSize: 14,
  },
});

export default PaymentMethodModal;
