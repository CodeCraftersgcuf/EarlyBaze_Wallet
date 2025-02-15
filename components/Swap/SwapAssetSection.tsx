import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

interface SwapAssetSectionProps {
  title: string;
  asset: string;
  assetImage: any;
  amount: string;
  network?: string;
  networkImage?: any;
  converted?: string;
}

const SwapAssetSection: React.FC<SwapAssetSectionProps> = ({
  title,
  asset,
  assetImage,
  amount,
  network,
  networkImage,
  converted
}) => {
  const textColor = useThemeColor({ light: '#000000', dark: '#FFFFFF' }, 'text');
  const cardBackgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#161616' }, 'card');
  const inputBackgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#000000' }, 'input');
  const labelColor = useThemeColor({ light: '#888', dark: '#BBBBBB' }, 'label');
  const borderColor = useThemeColor({ light: '#E5E5E5', dark: '#000000' }, 'border');

  return (
    <View style={[styles.swapBox, { backgroundColor: cardBackgroundColor, borderColor }]}>
      <Text style={[styles.label, { color: labelColor }]}>{title}</Text>

      {/* Asset Selection */}
      <View style={styles.row}>
        <TouchableOpacity style={[styles.assetBox, { borderColor, backgroundColor: inputBackgroundColor }]}>
          <Image source={assetImage} style={styles.assetImage} />
          <View>
            <Text style={[styles.assetSubText, { color: textColor }]}>Assest</Text>
            <Text style={[styles.assetText, { color: textColor }]}>{asset}</Text>
          </View>
        </TouchableOpacity>

        {/* Amount Display */}
        <View style={[styles.amountBox, { borderColor, backgroundColor: inputBackgroundColor }]}>
          <Text style={[styles.amountCurrency, { color: labelColor }]}>{asset}</Text>
          <Text style={[styles.amountText, { color: textColor }]}>{amount}</Text>
        </View>
      </View>

      {/* Network Selection Row (if applicable) */}
      {network && converted && (
        <View style={styles.row}>
          <TouchableOpacity style={[styles.assetBox, { borderColor, backgroundColor: inputBackgroundColor }]}>
            <Image source={networkImage} style={styles.assetImage} />
            <View>
              <Text style={[styles.assetSubText, { color: textColor }]}>Network</Text>
              <Text style={[styles.assetText, { color: textColor }]}>{network}</Text>
            </View>
          </TouchableOpacity>
          <View style={[styles.amountBox, { borderColor, backgroundColor: inputBackgroundColor }]}>
            <Text style={[styles.amountCurrency, { color: labelColor }]}>USD</Text>
            <Text style={[styles.amountText, { color: textColor }]}>{converted}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  swapBox: {
    borderRadius: 20,
    padding: 15,
    marginBottom: 2,
    marginTop: 10,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  assetBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
    paddingVertical: 5,
    paddingHorizontal: 4,
    width: '48%',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  assetSubText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#888',
    marginBottom: 7,
  },
  assetImage: {
    width: 42,
    height: 42,
    marginRight: 7,
  },
  assetText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  amountBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 10,
    width: '48%',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  amountCurrency: {
    fontSize: 11,
    fontWeight: '500',
  },
  amountText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default SwapAssetSection;
