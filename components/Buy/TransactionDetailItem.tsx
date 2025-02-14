import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import icons from '@/constants/icons';
import { images } from '@/constants';
interface TransactionDetailItemProps {
  label: string;
  value: string;
  isCopyable?: boolean;
  icon?: any; // Icon is now optional
}

const TransactionDetailItem: React.FC<TransactionDetailItemProps> = ({ label, value, isCopyable, icon }) => {
  const textColor = useThemeColor({ light: '#000000', dark: '#FFFFFF' }, 'text');
  const labelColor = useThemeColor({ light: '#808080', dark: '#A0A0A0' }, 'label');
  const copy = useThemeColor({ light: images.copy_white, dark: images.copy_black }, 'copy');

  return (
    <View style={styles.paymentRow}>
      <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
      <View style={styles.row}>
        {isCopyable && (
          <TouchableOpacity onPress={() => console.log(`Copied: ${value}`)}>
            <Image source={copy} style={styles.icon} />
          </TouchableOpacity>
        )}
        <Text style={[styles.value, { color: textColor }]}>{value}</Text>
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
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 5, // Ensure proper spacing for the optional icon
  },
});

export default TransactionDetailItem;
