import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

interface SwapAssetSectionProps {
  title: string;
  asset: string;
  network: string;
  amount: string;
  converted?: string;
}

const SwapAssetSection: React.FC<SwapAssetSectionProps> = ({ title, asset, network, amount, converted }) => {
  const textColor = useThemeColor({ light: '#000000', dark: '#FFFFFF' }, 'text');
  const cardBackgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1A1A1A' }, 'card');

  return (
    <View style={[styles.swapBox, { backgroundColor: cardBackgroundColor }]}>
      <Text style={[styles.label, { color: textColor }]}>{title}</Text>
      <View style={styles.row}>
        <TouchableOpacity style={styles.assetBox}>
          <Text style={styles.assetText}>{asset}</Text>
        </TouchableOpacity>
        <Text style={[styles.amountText, { color: textColor }]}>{amount}</Text>
      </View>
      {converted && (
        <View style={styles.row}>
          <TouchableOpacity style={styles.assetBox}>
            <Text style={styles.assetText}>{network}</Text>
          </TouchableOpacity>
          <Text style={[styles.amountText, { color: textColor }]}>{converted}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  swapBox: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  assetBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
  },
  assetText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  amountText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SwapAssetSection;
