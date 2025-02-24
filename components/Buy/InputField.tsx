// components/common/InputField.tsx
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

interface InputFieldProps {
  label: string;
  value: string;
  onChange?: (text: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChange }) => {
  const textColor = useThemeColor({ light: '#000000', dark: '#FFFFFF' }, 'text');
  const bgColor = useThemeColor({ light: '#FFFFFF', dark: '#2D2D2D' }, 'inputBackground');
  const borderColor = useThemeColor({ light: '#C2C2C2', dark: '#3A3A3A' }, 'border');

  return (
    <View style={[styles.container, { backgroundColor: bgColor, borderColor }]}>
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
      <TextInput
        style={[styles.input, { color: textColor }]}
        value={value}
        onChangeText={onChange}
        keyboardType="numeric"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 0.31,
    borderRadius: 15, // Adjusted radius to match the image
    borderTopLeftRadius: 20, // Specific rounded corner on top left
    borderColor: '#E0E0E0', // Light gray border
    width: 160, // Adjust width to fit content
    height: 75, // Adjust height for better alignment
    justifyContent: 'center',
    alignItems: 'flex-start', // Align text to left like in the image
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2, // Shadow for Android
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    opacity: 0.6, // Light gray effect like in the image
    marginBottom: 2, // Adjusted spacing between label and value
  },
  input: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default InputField;
