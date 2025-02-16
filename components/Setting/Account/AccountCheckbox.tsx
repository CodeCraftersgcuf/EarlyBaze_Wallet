import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';

interface AccountCheckboxProps {
  label: string;
  checked: boolean;
  onToggle: () => void;
}

const AccountCheckbox: React.FC<AccountCheckboxProps> = ({ label, checked, onToggle }) => {
  const checkboxBackgroundColor = checked ? '#25AE7A' : '#E5E5E5';
  const textColor = useThemeColor({ light: '#222222', dark: '#FFFFFF' }, 'text');

  return (
    <TouchableOpacity style={styles.container} onPress={onToggle}>
      <View style={[styles.checkbox, { backgroundColor: checkboxBackgroundColor }]}>
        {checked && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
      </View>
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#25AE7A',
    borderRadius: 20,
    padding: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  label: {
    fontSize: 14,
  },
});

export default AccountCheckbox;
