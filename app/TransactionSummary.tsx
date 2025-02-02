import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import PrimaryButton from '@/components/Buy/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import Header from '@/components/Header';
import TransactionDetailItem from '@/components/Buy/TransactionDetailItem';
import { ThemedText } from '@/components/ThemedText';
import icons from '@/constants/icons';

const TransactionSummary: React.FC = () => {
  const backgroundColor = useThemeColor({ light: '#EFFEF9', dark: '#000000' }, 'background');
  const cardBackgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1A1A1A' }, 'card');
  const textBackgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#0000' }, 'textBackground');
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor }]}>
      {/* Header */}
      <Header title="Summary" />

      {/* Bitcoin Icon with Floating Effect */}
      <View style={styles.iconWrapper}>
        <View style={styles.iconContainer}>
          <Image source={icons.bitCoin} style={styles.bitcoinIcon} />
        </View>
      </View>

      {/* Transaction Card */}
      <View style={[styles.card, { backgroundColor: cardBackgroundColor }]}>
        <Text style={styles.amountText}>0.0023 BTC</Text>

        <TransactionDetailItem label="Recipient Address" value="1oefkfdnosk23jkdksndw..." isCopyable />
        <TransactionDetailItem label="Network" value="Bitcoin" icon={icons.bitCoin}/>
        <TransactionDetailItem label="Amount in BTC" value="0.0023" />
        <TransactionDetailItem label="Amount in USD" value="$3,546" />
        <TransactionDetailItem label="Network fee" value="0.000023 BTC" />
        <TransactionDetailItem label="Transaction Hash" value="234eefkjdkfndk..." isCopyable />
        <TransactionDetailItem label="Transaction Date" value="24 Dec, 2024 - 07:22 AM" />
      </View>

      {/* View on Blockchain Button */}
      <View style={styles.buttonContainer}>
        <PrimaryButton title="View on blockchain" onPress={() => console.log('Viewing blockchain')} />
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
  iconWrapper: {
    alignItems: 'center',
    marginBottom: -35, // Pulls it into the card
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
    marginBottom: 10,
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
