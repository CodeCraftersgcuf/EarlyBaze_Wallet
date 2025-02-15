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
import { images } from '@/constants';

const TransactionSummaryModal: React.FC<TransactionSummaryModalProps> = ({ visible, onClose }) => {
  const backgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1A1A1A' }, 'background');
  const textColor = useThemeColor({ light: '#000000', dark: '#FFFFFF' }, 'text');
  const labelColor = useThemeColor({ light: '#808080', dark: '#A0A0A0' }, 'label');
  const borderColor = useThemeColor({ light: '#EAEAEA', dark: '#333333' }, 'border');
  const textTitleColor = useThemeColor({ light: '#25AE7A', dark: '#25AE7A' }, 'textTitle');

  const close = useThemeColor({ light: images.cross_white, dark: images.cross_black }, 'close');

  // Sample JSON data for transaction
  const transactionData = {
    coin: "Bitcoin",
    network: "Bitcoin",
    amountBtc: "0.012BTC",
    amountUsd: "$750",
    amountPaid: "NGN10,450,445",
    accountPaidTo: "Account 1",
    transactionReference: "23JFJ46GKDR",
    transactionDate: "24 Dec, 2024 - 07:22 AM",
    status: "Rejected",
    reason: "Network congestion timeout"
  };

  const statusColor = transactionData.status === "Completed" ? "#25AE7A" : transactionData.status === "Rejected" ? "#D32F2F" : textColor;
  const showReason = transactionData.status === "Rejected"; // Only show Reason if status is "Rejected"

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={[styles.modalContainer, { backgroundColor, borderColor }]}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: textTitleColor }]}>Summary</Text>
            <TouchableOpacity onPress={onClose} style={[styles.closeButton, { backgroundColor: backgroundColor }]}>
              <Image source={close} style={styles.closeIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.horizontalLine} />

          {/* Transaction Details */}
          <View style={styles.detailContainer}>
            <TransactionDetailItem label="Coin" value={transactionData.coin} />
            <TransactionDetailItem label="Network" value={transactionData.network} />
            <TransactionDetailItem label="Amount - BTC" value={transactionData.amountBtc} />
            <TransactionDetailItem label="Amount - USD" value={transactionData.amountUsd} />
            <TransactionDetailItem label="Amount Paid" value={transactionData.amountPaid} />
            <TransactionDetailItem label="Account Paid to" value={transactionData.accountPaidTo} />
            <TransactionDetailItem label="Transaction reference" value={transactionData.transactionReference} isCopyable />
            <TransactionDetailItem label="Transaction Date" value={transactionData.transactionDate} />
            <TransactionDetailItem label="Status" value={transactionData.status} valueStyle={{ color: statusColor, fontWeight: 'bold' }} />

            {/* Conditionally render Reason */}
            {showReason && (
              <TransactionDetailItem label="Reason" value={transactionData.reason} />
            )}
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
    marginBottom: 5,
  },
  modalContainer: {
    width: '90%',
    borderRadius: 15,
    borderWidth: 1,
    position: 'relative',
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
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
    padding: 10,
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
  detailContainer: {
    marginTop: 10,
  },
});

export default TransactionSummaryModal;
