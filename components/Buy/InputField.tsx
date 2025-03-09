// components/common/InputField.tsx
import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

interface InputFieldProps extends TextInputProps {
  label?: string;
  value?: string;
  editable?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label = '', value = '', editable = true, ...props }) => {
  const textColor = useThemeColor({ light: '#000000', dark: '#FFFFFF' }, 'text');
  const bgColor = useThemeColor({ light: '#FFFFFF', dark: '#2D2D2D' }, 'inputBackground');
  const borderColor = useThemeColor({ light: '#C2C2C2', dark: '#3A3A3A' }, 'border');

  return (
    <View style={[styles.container, { backgroundColor: bgColor, borderColor }]}>
      {label ? <Text style={[styles.label, { color: textColor }]}>{label}</Text> : null}
      <TextInput
        style={[styles.input, { color: textColor }]}
        value={value}
        editable={editable}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 0.31,
    borderRadius: 15,
    borderTopLeftRadius: 20,
    borderColor: '#E0E0E0',
    width: 160,
    height: 75,
    justifyContent: 'center',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    opacity: 0.6,
    marginBottom: 2,
  },
  input: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default InputField;
