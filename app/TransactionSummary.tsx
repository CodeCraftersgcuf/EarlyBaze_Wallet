import React, { useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import PrimaryButton from '@/components/Buy/PrimaryButton';
import Header from '@/components/Header';
import TransactionDetailItem from '@/components/Buy/TransactionDetailItem';
import icons from '@/constants/icons';
import { useLocalSearchParams } from 'expo-router';
import VerificationModal from '@/components/Send/VerificationModal';
import { useState } from 'react';
import TransactionFailedModal from '@/components/Send/TransactionFailedModal';
import TransactionSuccessfulModal from '@/components/Send/TransactionSuccessfulModal';
import moment from 'moment';


//Code Related to the Integration:
import { getFromStorage } from "@/utils/storage";
import { useQuery } from '@tanstack/react-query';
import { getInternalSend } from "@/utils/queries/appQueries";
import { getInternalReceive } from "@/utils/queries/appQueries";
import LoadingIndicator from "@/components/LoadingIndicator";

const TransactionSummary: React.FC = () => {
  const { type, currency, network, amount, email, address, temp, image } = useLocalSearchParams();
  const { id } = useLocalSearchParams();
  console.log("Transaction ID:", id); // Debugging
  console.log("The data coming from the props:", type, currency, network, amount, email, address, temp, image);
  console.log("🧾 Image from params:", image);

  console.log("The Amount:", amount);
  const [token, setToken] = useState<string | null>(null); // State to hold the token

  console.log("Received type from navigation:", type);
  const backgroundColor = useThemeColor({ light: "#EFFEF9", dark: "#000000" }, "background");
  const cardBackgroundColor = useThemeColor({ light: "#FFFFFF", dark: "#1A1A1A" }, "card");

  const [isModalVisible, setModalVisible] = useState(false);
  const [transactionReference, setTransactionReference] = useState<string | null>(null);
  const [isVerificationVisible, setVerificationVisible] = useState(false);
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const fetchedToken = await getFromStorage("authToken");
      setToken(fetchedToken);
      console.log("🔹 Retrieved Token:", fetchedToken);
    };

    fetchUserData();
  }, []);

  const { data: transactionData, error, isPending } = useQuery({
    queryKey: [type === "send" ? "internalSend" : "internalReceive", token, id],
    queryFn: () => {
      if (!token || !id) return Promise.reject("No valid ID or token");
      return type === "send" ? getInternalSend({ token, id }) : getInternalReceive({ token, id });
    },
    enabled: !!token && !!id, // Only fetch if both token and ID exist
  });

  console.log("🔹 Transaction Data:", transactionData);

  const transaction = useMemo(() => {
    return transactionData?.data || {
      id: 0,
      transaction_id: 0,
      transaction_type: type || "internal",
      currency: currency,
      symbol: "default.png",
      tx_id: "N/A",
      block_hash: "N/A",
      gas_fee: "N/A",
      status: "pending",
      created_at: "N/A",
      amount: amount || "N/A",
      amount_usd: amount || "N/A",
      sender_address: email || "N/A",
      recipient_address: email || "N/A",
    };
  }, [transactionData, type]);

  // ✅ Place this check AFTER all hooks are initialized
  if (isPending && !temp) {
    return <LoadingIndicator message="Fetching Transaction Details..." />;
  }


  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor }]}>
      {/* Header */}
      <Header title="Summary" />

      {/* Dynamic Crypto Icon with Floating Effect */}
      <View style={styles.iconWrapper}>
        <View style={styles.iconContainer}>
          <Image
            source={
              image && typeof image === "string" && image.startsWith("http")
                ? { uri: image }
                : { uri: `https://earlybaze.hmstech.xyz/storage/${transaction?.symbol || "default.png"}` }
            }
            style={styles.bitcoinIcon}
          />

        </View>

      </View>

      {/* Transaction Card */}
      <View style={[styles.card, { backgroundColor: cardBackgroundColor }]}>
        <Text style={styles.amountText}>{transaction?.amount} </Text>
        <TransactionDetailItem
          label={type === "send" ? "Recipient Address" : "Sender Address"}
          value={email || String(type === "send" ? transaction?.receiver_address : transaction?.receiver_address)}
          isCopyable
        />

        <TransactionDetailItem
          label="Network"
          value={String(transaction?.currency)}
          icon={
            image && typeof image === "string" && image.startsWith("http")
              ? { uri: image }
              : { uri: `https://earlybaze.hmstech.xyz/storage/${transaction?.symbol || "default.png"}` }
          }
        />

        <TransactionDetailItem label="Amount" value={String(transaction?.amount)} />
        <TransactionDetailItem label="Amount in USD" value={String(transaction?.amount_usd)} />

        {!temp && (
          <>
            <TransactionDetailItem label="Network fee" value={String(transaction?.gas_fee)} />
            <TransactionDetailItem label="Transaction Hash" value={String(transaction?.tx_id)} isCopyable />

            <TransactionDetailItem
              label="Transaction Date"
              value={transaction?.created_at ? moment(transaction?.created_at).format("MMMM DD, YYYY h:mm A") : "N/A"}
            />
            <TransactionDetailItem label="Type" value={String(transaction?.transaction_type)} />
            <TransactionDetailItem label="Status" value={String(transaction?.status)} />
          </>
        )}
      </View>

      {/* Action Button */}
      <View style={styles.buttonContainer}>
        {type === "send" && (
          <PrimaryButton title="Proceed" onPress={() => setVerificationVisible(true)} />
        )}
      </View>

      {/* Show Verification Modal */}
      <VerificationModal
        visible={isVerificationVisible}
        onClose={() => setVerificationVisible(false)}
        onFail={() => {
          setVerificationVisible(false);
          setModalVisible(true); // ✅ Show failed modal when transfer fails
        }}
        onSuccess={(data) => {
          console.log("The data is:", data);
          setTransactionReference(data);
          setSuccessModalVisible(true); // ✅ Show success modal on transfer success
        }}
        requestData={{ currency, network, amount, email, token }}
      />

      <TransactionSuccessfulModal visible={isSuccessModalVisible} onClose={() => setSuccessModalVisible(false)} />
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 20,
  },
  iconWrapper: {
    alignItems: 'center',
    marginBottom: -45, // Pulls it into the card
    zIndex: 10,
  },
  iconContainer: {
    width: 65,
    height: 65,
    backgroundColor: '#FFA500', // Bitcoin orange
    borderRadius: 32.5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 10,
  },
  bitcoinIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  card: {
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderColor: '#22A45D',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginTop: 10,
  },
  amountText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#22A45D',
    textAlign: 'center',
    marginVertical: 10,

  },
  buttonContainer: {
    marginTop: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
  },
});

export default TransactionSummary;
