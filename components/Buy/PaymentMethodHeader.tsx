import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import PaymentMethodModal from '@/components/Buy/PaymentMethodModal';
import icons from '@/constants/icons'; // Your arrow icon

const PaymentMethodHeader: React.FC = () => {
  const backgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1A1A1A' }, 'cardBackground');
  const borderColor = useThemeColor({ light: '#C2C2C2', dark: '#444' }, 'border');
  const textColor = useThemeColor({ light: '#A0A0A0', dark: '#C2C2C2' }, 'placeholder'); // Gray text

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={[styles.container, { backgroundColor, borderColor }]}
        onPress={() => setModalVisible(true)}
      >
        {/* Payment Method Placeholder Text */}
        <Text style={[styles.text, { color: textColor }]}>Payment Method</Text>

        {/* Arrow Icon */}
        <Image source={icons.down_arrow} style={styles.arrowIcon} />
      </TouchableOpacity>

      {/* Payment Method Modal */}
      <PaymentMethodModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {

    height: 60,
    borderWidth: 0.3,
    borderColor: '#C2C2C2',
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 0px 4px rgba(165, 165, 165, 0.25)',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginVertical: 15,
    alignSelf: 'center',
  },
  text: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400', // Regular weight for placeholder
  },
  arrowIcon: {
    width: 16,
    height: 16,
    tintColor: '#000000', // Black color for the arrow
  },
});

export default PaymentMethodHeader;
