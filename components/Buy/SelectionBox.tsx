// components/common/SelectionBox.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

interface SelectionBoxProps {
  label: string;
  value: string;
  icon: any;
  onPress?: () => void;
}

const SelectionBox: React.FC<SelectionBoxProps> = ({ label, value, icon, onPress }) => {
  const textColor = useThemeColor({ light: '#000000', dark: '#FFFFFF' }, 'text');
  const bgColor = useThemeColor({ light: '#F5F5F5', dark: '#2D2D2D' }, 'inputBackground');

  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: bgColor }]}
      onPress={onPress}
    >
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
      <View style={styles.content}>
        <Text style={[styles.value, { color: textColor }]}>{value}</Text>
        <Image source={icon} style={styles.icon} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  value: {
    fontSize: 16,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default SelectionBox;