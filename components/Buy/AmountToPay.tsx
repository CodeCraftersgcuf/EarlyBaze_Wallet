// components/BuyCard/AmountToPay.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

interface AmountToPayProps {
  label: string;
  value: string;
}

const AmountToPay: React.FC<AmountToPayProps> = ({ label, value }) => {
  const textColor = useThemeColor({ light: '#000000', dark: '#FFFFFF' }, 'text');

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
      <Text style={[styles.value, { color: textColor }]}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 16, // Slightly adjusted for better padding
    borderWidth: 0.5, // Lighter border for a subtle effect
    borderRadius: 15, // Adjusted radius to 15px for bottom corners as per your spec
    borderColor: '#25AE7A',
    boxShadow: '0px 0px 4px rgba(165, 165, 165, 0.25)', // Add shadow effect to match your style
    alignItems: 'center',
    justifyContent: 'center',
    width: 163, // Set width to match the spec
    height: 60, // Set height as per your spec
    marginHorizontal: 'auto', // Ensures horizontal centering
  },
  label: {
    fontSize: 10,
  },
  value: {
    fontSize: 13,
    fontWeight: 'bold',
  },
});

export default AmountToPay;
