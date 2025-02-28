import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

interface InputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, placeholder, value, onChangeText }) => {
  // Theme colors for light & dark mode
  const backgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1E1E1E' }, 'background');
  const textColor = useThemeColor({ light: '#222222', dark: '#FFFFFF' }, 'text');
  const placeholderColor = useThemeColor({ light: '#888888', dark: '#CCCCCC' }, 'placeholder');
  const borderColor = useThemeColor({ light: '#E0E0E0', dark: '#444444' }, 'border');

  // State to track if the input field is focused
  const [isFocused, setIsFocused] = useState(false);

  // Handle focus and blur to change the border color
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
      <TextInput 
        style={[
          styles.input, 
          { 
            backgroundColor, 
            borderColor: isFocused ? '#25AE7A' : borderColor, // Green border on focus
            color: textColor 
          }
        ]}
        placeholder={placeholder} 
        placeholderTextColor={placeholderColor} 
        value={value} 
        onChangeText={onChangeText} 
        onFocus={handleFocus} // Set focus to true
        onBlur={handleBlur}   // Set focus to false
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 10 },
  label: { fontSize: 14, fontWeight: 'bold', marginBottom: 5 },
  input: { 
    height: 50, 
    borderWidth: 1,  
    borderRadius: 10, 
    paddingHorizontal: 10,
  },
});

export default InputField;
