import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

interface ExchangeRateProps {
  rate: string;
}

const ExchangeRate: React.FC<ExchangeRateProps> = ({ rate }) => {
  const highlightColor = useThemeColor({ light: '#046A38', dark: '#22A45D' }, 'highlight');

  return (
    <View style={styles.exchangeRateBox}>
      <Text style={[styles.exchangeRateText, { color: highlightColor }]}>{rate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  exchangeRateBox: {
    padding: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  exchangeRateText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ExchangeRate;
