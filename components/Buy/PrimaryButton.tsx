import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean; // Optional prop to disable the button
  loading?: boolean; // Optional loading prop
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ title, onPress, disabled = false, loading = false }) => {
  const buttonColor = useThemeColor({ light: '#22A45D', dark: '#157347' }, 'button'); // Green Button
  const textColor = useThemeColor({ light: '#FFFFFF', dark: '#EAEAEA' }, 'text');

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: buttonColor, opacity: disabled || loading ? 0.5 : 1 }]} // Reduce opacity if disabled or loading
      onPress={disabled || loading ? undefined : onPress} // Disable onPress when disabled or loading
      disabled={disabled || loading} // Prevents clicks if disabled or loading
    >
      {loading ? (
        <ActivityIndicator size="small" color={textColor} /> // Show spinner while loading
      ) : (
        <Text style={[styles.text, { color: textColor }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    flexDirection: 'row',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PrimaryButton;
