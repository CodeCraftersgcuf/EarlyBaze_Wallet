import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import icons from '@/constants/icons';
import TransactionDetailItem from '@/components/Buy/TransactionDetailItem';
import { images } from '@/constants';
const SwapSummaryDetails: React.FC = () => {
  // Theme Colors
  const backgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1A1A1A' }, 'background');
  const textColor = useThemeColor({ light: '#0C5E3F', dark: '#0C5E3F' }, 'text');
  const borderColor = useThemeColor({ light: '#22A45D', dark: '#157347' }, 'border');
  const highlightTextColor = useThemeColor({ light: '#0C5E3F', dark: '#22A45D' }, 'highlightText');
  const swapIcon = useThemeColor({ light: images.double_side_white, dark: images.double_side_black }, 'swapIcon');
  return (
    <>
      <View style={styles.swapHeader}>
        <View style={styles.assetContainer}>
          <Image source={icons.bitCoin} style={styles.assetIcon} />
          <Text style={[styles.amountText, { color: textColor }]}>12,500</Text>
        </View>
        <Image source={swapIcon} style={[styles.swapIcon]} />
        <View style={styles.assetContainer}>
          <Image source={icons.bitCoin} style={styles.assetIcon} />
          <Text style={[styles.amountText, { color: textColor }]}>54,000,000</Text>
        </View>
      </View>


      <View style={[styles.summaryBox, { backgroundColor, borderColor }]}>
        {/* Swap Header */}


        {/* Transaction Details */}
        <View style={styles.transactionDetails}>
          <TransactionDetailItem label="Coin Sent" value="Tether USD" icon={icons.bitCoin} />
          <TransactionDetailItem label="Network" value="Tron" icon={icons.bitCoin} />
          <TransactionDetailItem label="Asset Received" value="Naira" icon={icons.bitCoin} />
          <TransactionDetailItem label="Amount paid in BTC" value="12,500" />
          <TransactionDetailItem label="Amount paid in USD" value="12,500" />
          <TransactionDetailItem label="Amount to receive in NGN" value="54,000,000" />
          <TransactionDetailItem label="Amount to receive in USD" value="12,500" />
          <TransactionDetailItem label="Exchange Rate" value="1$ = 1,750NGN" />
          <TransactionDetailItem label="Transaction ID" value="DF0GJFBGH34HNVFNJ4NOJ" />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  summaryBox: {
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginHorizontal: 16,
    marginTop: 20,
    overflow: 'hidden',
    paddingTop: 50,
  },
  swapHeader: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    top: -20,
    width: '100%',
    paddingVertical: 10,
    marginBottom: 10,
    zIndex: 10,
    left: '20%',
  },
  assetContainer: {
    alignItems: 'center',
    marginHorizontal: 20,


  },
  assetIcon: {
    width: 50,
    height: 50,
  },
  amountText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  swapIcon: {
    position: 'absolute',
    width: 30,
    left: '24%',
    top: 22,
  },
  transactionDetails: {
    width: '100%',
    // paddingHorizontal: 10,
  },
});

export default SwapSummaryDetails;
