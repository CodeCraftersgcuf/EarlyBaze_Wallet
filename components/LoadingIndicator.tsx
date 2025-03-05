// components/LoadingIndicator.tsx

import React from 'react';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

interface LoadingIndicatorProps {
  message?: string; // Optional loading message
  size?: "small" | "large"; // Loading spinner size
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ message = "Loading...", size = "large" }) => {
  const backgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#000000' }, 'background');
  const textColor = useThemeColor({ light: '#222222', dark: '#FFFFFF' }, 'text');

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <ActivityIndicator size={size} color={textColor} />
      <Text style={[styles.text, { color: textColor }]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default LoadingIndicator;
