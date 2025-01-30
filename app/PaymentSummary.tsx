import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import icons from '@/constants/icons';
import PrimaryButton from '@/components/Buy/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import Header from '@/components/Header';

const PaymentSummary: React.FC = () => {
  const backgroundColor = useThemeColor({ light: '#EFFEF9', dark: '#000000' }, 'background');
  const cardBackgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1A1A1A' }, 'card');
  const textColor = useThemeColor({ light: '#000000', dark: '#FFFFFF' }, 'text');
  const labelColor = useThemeColor({ light: '#808080', dark: '#A0A0A0' }, 'label');

  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor }]}>
      {/* Header */}
      <Header title="Payment Summary" />

      {/* Account Details */}
      <View style={[styles.accountContainer, { backgroundColor: cardBackgroundColor }]}>
        <View style={styles.accountHeader}>
          <Text style={styles.accountTitle}>Account 1</Text>
        </View>
        <View style={styles.accountDetails}>
          <Text style={[styles.label, { color: labelColor }]}>Bank Name</Text>
          <Text style={[styles.value, { color: textColor }]}>Kuda Bank</Text>
        </View>
        <View style={styles.accountDetails}>
          <Text style={[styles.label, { color: labelColor }]}>Account Name</Text>
          <Text style={[styles.value, { color: textColor }]}>Qamardeen Abdulmalik</Text>
        </View>
        <View style={styles.accountDetails}>
          <Text style={[styles.label, { color: labelColor }]}>Account Number</Text>
          <View style={styles.row}>
            <TouchableOpacity>
              <Image source={icons.copy} style={styles.icon} />
            </TouchableOpacity>
            <Text style={[styles.value, { color: textColor }]}>123456789</Text>
          </View>
        </View>
      </View>

      {/* Payment Summary */}
      <Text style={[styles.sectionTitle, { color: textColor }]}>Payment Summary</Text>
      <View style={[styles.paymentContainer, { backgroundColor: cardBackgroundColor }]}>
        <Text style={styles.detailRow}>
          <Text style={[styles.label, { color: labelColor }]}>Coin: </Text>
          <Text>Bitcoin</Text>
        </Text>
        <Text style={styles.detailRow}>
          <Text style={[styles.label, { color: labelColor }]}>Network: </Text>Bitcoin
        </Text>
        <Text style={styles.detailRow}>
          <Text style={[styles.label, { color: labelColor }]}>Amount - BTC: </Text>0.00023BTC
        </Text>
        <Text style={styles.detailRow}>
          <Text style={[styles.label, { color: labelColor }]}>Amount - USD: </Text>$2,350
        </Text>
        <Text style={styles.detailRow}>
          <Text style={[styles.label, { color: labelColor }]}>Amount to pay: </Text>NGN10,450,445
        </Text>
        <Text style={styles.detailRow}>
          <Text style={[styles.label, { color: labelColor }]}>Transaction Reference: </Text>
          <View style={styles.row}>
            <TouchableOpacity>
              <Image source={icons.copy} style={styles.icon} />
            </TouchableOpacity>
            <Text style={[styles.value, { color: textColor }]}>23JFJ46GKDR</Text>
          </View>
        </Text>
        <Text style={styles.detailRow}>
          <Text style={[styles.label, { color: labelColor }]}>Transaction Date: </Text>24 Dec, 2024 - 07:22 AM
        </Text>
      </View>

      {/* Confirmation Message */}
      <Text style={styles.confirmationText}>
        Kindly confirm that the details are correct before proceeding
      </Text>

      {/* Proceed Button */}
      <View style={styles.buttonContainer}>
        <PrimaryButton title="I have made payment" onPress={() => console.log('Payment Confirmed')} />
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
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  accountTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  accountDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paymentContainer: {
    borderRadius: 10,
    padding: 15,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  detailRow: {
    fontSize: 16,
    paddingVertical: 5,
  },
  confirmationText: {
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 20,
    fontWeight: '500',
  },
  buttonContainer: {
    paddingBottom: 20,
  },
});

export default PaymentSummary;
