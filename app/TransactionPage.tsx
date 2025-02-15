import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import Header from '@/components/Header';
import PrimaryButton from '@/components/Buy/PrimaryButton';
import TransactionStep from '@/components/Buy/TransactionStep';
import TransactionSuccess from '@/components/Buy/TransactionSuccess';
import TransactionSummaryModal from '@/components/Buy/TransactionSummaryModal';
import { useNavigation } from 'expo-router';

const TransactionPage: React.FC = () => {
  const backgroundColor = useThemeColor({ light: '#EFFEF9', dark: '#000000' }, 'background');
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const textColor = useThemeColor({ light: '#000000', dark: '#FFFFFF' }, 'text');

  // Example Transactions (Replace this with API response later)
  const transactions = [
    {
      title: 'Transaction Submitted',
      description: 'Your transaction has been submitted successfully',
      date: '27 Dec, 2024 - 05:22 PM',
      isCompleted: true,
      hasButton: true,
    },
    {
      title: 'Transaction Processed',
      description: 'Your transaction is being processed, your naira account will be credited soon.',
      date: '27 Dec, 2024 - 05:22 PM',
      isCompleted: true,
      isProcessing: true,
    },
    {
      title: 'Transaction Rejected',
      description: 'Your transaction was rejected due to network congestion. Kindly try again.',
      date: '27 Dec, 2024 - 05:22 PM',
      isCompleted: true,
      isProcessing: true,
    },
  ];

  // Function to filter transactions
  const filterTransactions = (transactions) => {
    const hasSubmitted = transactions.some(tx => tx.title === 'Transaction Submitted');
    const hasProcessing = transactions.some(tx => tx.title === 'Transaction Processed');
    const hasSuccess = transactions.some(tx => tx.title === 'Transaction Success');
    const hasRejected = transactions.some(tx => tx.title === 'Transaction Rejected');

    // If only "Transaction Submitted" exists, show only it
    if (hasSubmitted && !hasProcessing && !hasSuccess && !hasRejected) {
      return transactions.filter(tx => tx.title === 'Transaction Submitted');
    }

    // If "Transaction Processed" exists, show both "Submitted" and "Processing"
    if (hasProcessing && !hasSuccess && !hasRejected) {
      return transactions.filter(tx => ['Transaction Submitted', 'Transaction Processed'].includes(tx.title));
    }

    // If "Transaction Success" exists (and not rejected), show only success
    if (hasSuccess && !hasRejected) {
      return transactions.filter(tx => tx.title === 'Transaction Success');
    }

    return transactions;
  };



  const filteredTransactions = filterTransactions(transactions);
  const isTransactionFailed = filteredTransactions.some(tx => tx.title === 'Transaction Rejected');

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor }]}>
      {/* Header */}
      <Header title="Transaction Page" />

      {/* Transaction Steps */}
      <View style={styles.progressContainer}>
        <View style={styles.progressLine} />

        {filteredTransactions.map((tx, index) => (
          <TransactionStep
            key={index}
            title={tx.title}
            description={tx.description}
            date={tx.date}
            isCompleted={tx.isCompleted}
            isProcessing={tx.isProcessing}
            hasButton={tx.hasButton}
          />
        ))}

        {/* Show success box only if the transaction is not rejected */}
        {!isTransactionFailed && (
          <View style={{ marginTop: 20 }}>
            <TransactionSuccess />
          </View>
        )}
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <PrimaryButton title="Full Summary" onPress={() => setModalVisible(true)} />
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
          <Text style={[styles.closeButtonText, { color: textColor }]}>Close</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <TransactionSummaryModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 3,
    paddingBottom: 20,
    marginTop: 25,
  },
  progressContainer: {
    marginBottom: 20,
    position: 'relative',
    paddingHorizontal: 18,
  },
  progressLine: {
    position: 'absolute',
    left: -130,
    top: 170,
    width: 327,
    height: 0,
    borderWidth: 0.5,
    borderColor: '#9A9A9A',
    transform: [{ rotate: '90deg' }],
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 18,
    position: 'absolute',
    bottom: 0,
  },
  buttonWrapper: {
    flex: 1,
    marginRight: 10,
  },
  closeButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#A0A0A0',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    height: 60,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default TransactionPage;
