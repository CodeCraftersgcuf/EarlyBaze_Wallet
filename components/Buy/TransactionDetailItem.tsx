import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as Clipboard from 'expo-clipboard'; // ✅ Correct Clipboard import
import { useThemeColor } from '@/hooks/useThemeColor';
import { images } from '@/constants';

interface TransactionDetailItemProps {
  label: string;
  value: string | number;
  isCopyable?: boolean;
  icon?: any;
  valueStyle?: object;
}

const TransactionDetailItem: React.FC<TransactionDetailItemProps> = ({ label, value, isCopyable, icon, valueStyle }) => {
  const textColor = useThemeColor({ light: '#000000', dark: '#FFFFFF' }, 'text');
  const labelColor = useThemeColor({ light: '#808080', dark: '#A0A0A0' }, 'label');
  const copy = useThemeColor({ light: images.copy_white, dark: images.copy_black }, 'copy');

  const handleCopy = async () => {
    await Clipboard.setString(String(value)); // Ensure value is always a string
    console.log(`Copied: ${value}`);
  };

  return (
    <View style={styles.paymentRow}>
      <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
      <View style={styles.row}>
        {/* Ensure Copy Button is wrapped inside TouchableOpacity */}
        {isCopyable && (
          <TouchableOpacity onPress={handleCopy}>
            <Image source={copy} style={styles.icon} />
          </TouchableOpacity>
        )}
        
        {/* Ensure value is wrapped in a <Text> element */}
        <Text style={[styles.value, { color: textColor }, valueStyle]}>{String(value)}</Text>

        {/* Ensure Icon is placed correctly */}
        {icon && <Image source={icon} style={styles.icon} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // ✅ Ensure proper alignment
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomColor: '#ddd',
  },
  label: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 13,
    fontWeight: '500',
    marginLeft: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 18,
    height: 18,
    marginLeft: 5,
  },
});

export default TransactionDetailItem;
