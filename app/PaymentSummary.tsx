import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import PrimaryButton from '@/components/Buy/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import Header from '@/components/Header';
import TransactionDetailItem from '@/components/Buy/TransactionDetailItem';
import { ThemedText } from '@/components/ThemedText';
import {router, useRouter} from "expo-router";

const PaymentSummary: React.FC = () => {
    const { push } = useRouter();

  const backgroundColor = useThemeColor({ light: '#EFFEF9', dark: '#000000' }, 'background');
  const cardBackgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1A1A1A' }, 'card');
 const textBackgroundColor = useThemeColor({light: '#FFFFFF', dark: '#0000'}, 'textBackground');
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor }]}>
      {/* Header */}
      <Header title="Payment Summary" />

      {/* Account Details */}
      <View style={styles.accountHeader}>
        <Text style={styles.accountTitle}>Account 1</Text>
      </View>
      <View style={[styles.accountContainer, { backgroundColor: cardBackgroundColor }]}>
        <TransactionDetailItem label="Bank Name" value="Kuda Bank" />
        <TransactionDetailItem label="Account Name" value="Qamardeen Abdulmalik" />
        <TransactionDetailItem label="Account Number" value="123456789" isCopyable />
      </View>

      {/* Payment Summary */}
      <Text style={styles.sectionTitle}>Payment Summary</Text>
      <View style={[styles.paymentContainer, { backgroundColor: cardBackgroundColor }]}>
        <TransactionDetailItem label="Coin" value="Bitcoin" />
        <TransactionDetailItem label="Network" value="Bitcoin" />
        <TransactionDetailItem label="Amount - BTC" value="0.00023BTC" />
        <TransactionDetailItem label="Amount - USD" value="$2,350" />
        <TransactionDetailItem label="Amount to pay" value="NGN10,450,445" />
        <TransactionDetailItem label="Transaction Reference" value="23JFJ46GKDR" isCopyable />
        <TransactionDetailItem label="Transaction Date" value="24 Dec, 2024 - 07:22 AM" />
      </View>

      {/* Confirmation Message */}
      <ThemedText style={[styles.confirmationText, {backgroundColor: textBackgroundColor}]}>
        Kindly confirm that the details are correct before proceeding
      </ThemedText>

      {/* Proceed Button */}
      <View style={styles.buttonContainer}>
        <PrimaryButton title="I have made payment" onPress={() => router.push('/PaymentProof')} />
      </View>
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
  accountContainer: {
    borderRadius: 10,
    paddingBottom: 15,
    marginBottom: 20,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  accountHeader: {
    backgroundColor: '#22A45D',
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: 160,
    height: 40,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#9BCDF6',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  accountTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  paymentContainer: {
    borderRadius: 10,
    padding: 5,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  confirmationText: {
    fontSize: 10,
    marginBottom: 20,
    fontWeight: '500',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 20, // Fully rounded corners
    borderColor: '#22A45D', // Green border to match UI
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    paddingBottom: 20,
    
  },
});

export default PaymentSummary;
