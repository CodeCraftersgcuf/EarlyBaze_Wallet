import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

interface AccountInputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  isEditable?: boolean;
}

const AccountInputField: React.FC<AccountInputFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  isEditable = true,
}) => {
  const cardBackgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1A1A1A' }, 'card');
  const textColor = useThemeColor({ light: '#222222', dark: '#FFFFFF' }, 'text');
  const borderColor = useThemeColor({ light: '#E5E5E5', dark: '#333333' }, 'border');
  
  const [isFocused, setIsFocused] = useState(false);  // Track focus state

  // Border color when focused
  const focusBorderColor = '#25AE7A'; // Green color for focus

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          { 
            color: textColor, 
            backgroundColor: cardBackgroundColor, 
            borderColor: isFocused ? focusBorderColor : borderColor,  // Update border color based on focus
            // Add a glowing effect when focused
            shadowColor: isFocused ? focusBorderColor : 'transparent',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: isFocused ? 0.8 : 0,
            shadowRadius: isFocused ? 10 : 0,  // Adjust the glow radius
            elevation: isFocused ? 10 : 0, // For Android
          }
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#A1A1A1"
        editable={isEditable}
        onFocus={() => setIsFocused(true)}  // Set focus state to true when input is focused
        onBlur={() => setIsFocused(false)}  // Set focus state to false when input loses focus
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
  },
  input: {
    fontSize: 14,
    borderRadius: 15,
    borderWidth: 1.5,
    paddingVertical: 17,
    paddingHorizontal: 12,
  },
});

export default AccountInputField;
