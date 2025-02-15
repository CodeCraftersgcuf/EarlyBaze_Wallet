import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Clipboard } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { images } from '@/constants';

interface TransactionDetailItemProps {
  label: string;
  value: string | number; // Ensure value is either string or number
  isCopyable?: boolean;
  icon?: any; // Icon is now optional
  valueStyle?: object; // Optional valueStyle prop
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
        {isCopyable && (
          <TouchableOpacity onPress={handleCopy}>
            <Image source={copy} style={styles.icon} />
          </TouchableOpacity>
        )}
        {/* Wrap value in <Text> to avoid warning */}
        <Text style={[styles.value, { color: textColor }, valueStyle]}>{String(value)}</Text>
        {icon && <Image source={icon} style={styles.icon} />} {/* Render icon only if provided */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    marginLeft: 5, // Added spacing for better layout
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 18,
    height: 18,
    marginLeft: 5, // Ensure proper spacing for the optional icon
  },
});

export default TransactionDetailItem;
