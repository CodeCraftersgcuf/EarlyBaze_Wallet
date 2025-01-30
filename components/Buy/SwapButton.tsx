// components/BuyCard/SwapButton.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

const SwapButton: React.FC = () => {
  const iconColor = useThemeColor({ light: '#000000', dark: '#FFFFFF' }, 'icon');

  return (
    <View style={styles.container}>
      <Text style={[styles.icon, { color: iconColor }]}>↕</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 20,
  },
});

export default SwapButton;