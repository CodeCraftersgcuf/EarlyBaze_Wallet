// components/BuyCard/index.tsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import InputField from '@/components/Buy/InputField';
import SelectionBox from '@/components/Buy/SelectionBox';
import PaymentMethodHeader from '@/components/Buy/PaymentMethodHeader';
import SwapButton from '@/components/Buy/SwapButton';
import AmountToPay from '@/components/Buy/AmountToPay';
import icons from '@/constants/icons';
import { images } from '@/constants';


const BuyCard: React.FC = () => {
  const backgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#161616' }, 'cardBackground');
  const doublearrow = useThemeColor({ light: images.double_arrow_white, dark: images.double_arrow_black }, 'doublearrow');
  const arrowBorderColor = useThemeColor({ light: '#E5E5E5', dark: '#095D3F' }, 'arrowBorder');
  return (
    <View style={[styles.card, { backgroundColor }]}>
      <PaymentMethodHeader />

      <View style={styles.exchangeContainer}>
        <InputField label="USD" value="2,345" />
        {/* <SwapButton /> */}
        <SelectionBox
          label="Coin"
          value="Bitcoin"
          icon={icons.bitCoin}
        />
      </View>
      <TouchableOpacity style={[styles.swapButton, { borderColor: arrowBorderColor }]}>
        <Image source={doublearrow} style={styles.swapIcon} />
      </TouchableOpacity>
      <View style={styles.selectionContainer}>
        <InputField label="BTC" value="0.000234" />
        <SelectionBox
          label="Network"
          value="Bitcoin"
          icon={icons.bitCoin}
        />
      </View>

      <AmountToPay
        label="Amount to pay"
        value="NGN 25,000,000"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    borderRadius: 10,
    padding: 16,
    margin: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  exchangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    gap: 8,
  },
  selectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: 8,
  },
  swapButton: {
    padding: 14,
    borderRadius: 50,
    marginHorizontal: 8,
    borderWidth: 2,
    position: 'absolute',
    zIndex: 1,
    top: '50%',
    right: '45%',
  },

  swapIcon: {
    width: 28,
    height: 28,
  },
});

export default BuyCard;