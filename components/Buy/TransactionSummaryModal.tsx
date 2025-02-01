import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image
} from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import icons from '@/constants/icons';
import TransactionDetailItem from '@/components/Buy/TransactionDetailItem';

interface TransactionSummaryModalProps {
  visible: boolean;
  onClose: () => void;
}

const TransactionSummaryModal: React.FC<TransactionSummaryModalProps> = ({ visible, onClose }) => {
  const backgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1A1A1A' }, 'background');
  const textColor = useThemeColor({ light: '#000000', dark: '#FFFFFF' }, 'text');
  const labelColor = useThemeColor({ light: '#808080', dark: '#A0A0A0' }, 'label');
  const borderColor = useThemeColor({ light: '#EAEAEA', dark: '#333333' }, 'border');

  const status = "Completed"; // Change this to test different statuses
  const statusColor = status === "Completed" ? "#22A45D" : status === "Rejected" ? "#D32F2F" : textColor;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={[styles.modalContainer, { backgroundColor, borderColor }]}>
          
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.modalTitle, { color: textColor }]}>Summary</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Image source={icons.close} style={styles.closeIcon} />
            </TouchableOpacity>
          </View>

          {/* Transaction Details */}
          <View style={styles.detailContainer}>
            <TransactionDetailItem label="Coin" value="Bitcoin" />
            <TransactionDetailItem label="Network" value="Bitcoin" />
            <TransactionDetailItem label="Amount - BTC" value="0.012BTC" />
            <TransactionDetailItem label="Amount - USD" value="$750" />
            <TransactionDetailItem label="Amount Paid" value="NGN10,450,445" />
            <TransactionDetailItem label="Account Paid to" value="Account 1" />
            <TransactionDetailItem label="Transaction reference" value="23JFJ46GKDR" isCopyable />
            <TransactionDetailItem label="Transaction Date" value="24 Dec, 2024 - 07:22 AM" />
            <TransactionDetailItem label="Status" value={status} valueStyle={{ color: statusColor, fontWeight: 'bold' }} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    width: 10,
    height: 10,
  },
  detailContainer: {
    marginTop: 10,
  },
});

export default TransactionSummaryModal;
