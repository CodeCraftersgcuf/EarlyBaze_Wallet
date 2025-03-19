import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import Header from '@/components/Header';
import PrimaryButton from '@/components/Buy/PrimaryButton';
import TransactionStep from '@/components/Buy/TransactionStep';
import TransactionSuccess from '@/components/Buy/TransactionSuccess';
import TransactionSummaryModal from '@/components/Buy/TransactionSummaryModal';
import { useNavigation } from 'expo-router';
import { useRoute } from '@react-navigation/native';


//Code related to the integration:
import { getFromStorage } from '@/utils/storage';
import { getSwap } from '@/utils/queries/appQueries';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';

const TransactionPage: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const backgroundColor = useThemeColor({ light: '#EFFEF9', dark: '#000000' }, 'background');
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const textColor = useThemeColor({ light: '#000000', dark: '#FFFFFF' }, 'text');
  const route = useRoute();

  const params = route.params as { type: string };
  const transactionType = params?.type;
  const { id, types } = useLocalSearchParams();

  console.log("Type from TransactionPagess:", types);

  // Fetch the token and user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      const fetchedToken = await getFromStorage("authToken");
      setToken(fetchedToken);
      console.log("🔹 Retrieved Token:", fetchedToken);
    };

    fetchUserData();
  }, []);

  const { data: transactionSummary, error, isLoading } = useQuery({
    queryKey: [types === "swap" ? "internalSend" : "internalReceive", token, id],
    queryFn: () => {
      if (!token || !id) return Promise.reject("No valid ID or token");

      // Call the correct function based on `types`
      return getSwap({ token, id });
    },
    enabled: !!token && !!id, // Only fetch if both token and ID exist
  });

  console.log("🔹 Transaction Data of Swap/Receive:", transactionSummary);

  // Extract API transaction data safely
  const transactionData = transactionSummary?.data
    ? {
      coin: transactionSummary.data.currency || "Unknown",
      network: transactionSummary.data.network || "Unknown",
      amountBtc: `${transactionSummary.data.amount} ${transactionSummary.data.currency}`,
      amountUsd: `$${transactionSummary.data.amount_usd}`,
      amountPaid: `NGN${transactionSummary.data.amount_naira}`,
      accountPaidTo: "Account 1", // You may want to update this with real data
      transactionReference: transactionSummary.data.reference,
      transactionDate: new Date(transactionSummary.data.created_at).toLocaleString(), // Convert to readable format
      status: transactionSummary.data.status === "completed" ? "Success" : "Rejected",
      reason: transactionSummary.data.status === "failed" ? "Network congestion timeout" : null,
    }
    : null;

  // Set transaction steps dynamically based on status
  const transactions = transactionData?.status === "Rejected"
    ? [
      {
        title: 'Transaction Submitted',
        description: 'Your transaction has been submitted successfully',
        date: new Date(transactionSummary?.data?.created_at || "").toLocaleString(),
        isCompleted: true,
        hasButton: true,
      },
      {
        title: 'Transaction Processed',
        description: 'Your transaction is being processed, your naira account will be credited soon.',
        date: new Date(transactionSummary?.data?.created_at || "").toLocaleString(),
        isCompleted: true,
        isProcessing: true,
      },
      {
        title: 'Transaction Rejected',
        description: 'Your transaction has been rejected. Please try again.',
        date: new Date(transactionSummary?.data?.created_at || "").toLocaleString(),
        isCompleted: false,
        isProcessing: false,
      },
    ]
    : [
      {
        title: 'Transaction Submitted',
        description: 'Your transaction has been submitted successfully',
        date: new Date(transactionSummary?.data?.created_at || "").toLocaleString(),
        isCompleted: true,
        hasButton: true,
      },
      {
        title: 'Transaction Processed',
        description: 'Your transaction is being processed, your naira account will be credited soon.',
        date: new Date(transactionSummary?.data?.created_at || "").toLocaleString(),
        isCompleted: true,
        isProcessing: true,
      },
    ];

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor }]}>
      {/* Header */}
      <Header title="Transaction Page" />

      {/* Transaction Steps */}
      <View style={styles.progressContainer}>
        <View style={styles.progressLine} />

        {transactions.map((tx, index) => (
          <TransactionStep
            key={index}
            title={tx.title}
            description={tx.description}
            date={tx.date}
            isCompleted={tx.isCompleted}
            isProcessing={tx.isProcessing}
            hasButton={tx.hasButton}
            transactionData={transactionData}
          />
        ))}

        {/* Show success box only if the transaction is not rejected */}
        {transactionData?.status !== "Rejected" && (
          <View style={{ marginTop: 20 }}>
            <TransactionSuccess
              title={transactionType === 'withdraw' ? 'Withdrawal Successful' : 'Transaction Successful'} amount={transactionSummary?.data.amount} network={transactionSummary?.data.network}
            />
          </View>
        )}
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        {/* If only one step exists or transaction is still processing */}
        {transactions.length === 1 ||
          (transactions.some(tx => tx.title === 'Transaction Processed') &&
            transactionData?.status !== "Rejected" &&
            !transactions.some(tx => tx.title === 'Transaction Success')) ? (
          <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
            <Text style={[styles.closeButtonText, { color: textColor }]}>Close</Text>
          </TouchableOpacity>
        ) : (
          <>
            <View style={styles.buttonWrapper}>
              <PrimaryButton title="Full Summary" onPress={() => setModalVisible(true)} />
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
              <Text style={[styles.closeButtonText, { color: textColor }]}>
                {transactionData?.status === "Rejected" ? 'Support' : 'Close'}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Modal */}
      <TransactionSummaryModal visible={modalVisible} onClose={() => setModalVisible(false)} transactionData={transactionData} />
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
