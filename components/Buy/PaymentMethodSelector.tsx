import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import PaymentMethodModal from '@/components/Buy/PaymentMethodModal';
import icons from '@/constants/icons'; // Your bank icon & arrow icons

const PaymentMethodSelector: React.FC = () => {
  const backgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1A1A1A' }, 'cardBackground');
  const borderColor = useThemeColor({ light: '#C2C2C2', dark: '#444' }, 'borderColor');
  const textColor = useThemeColor({ light: '#000000', dark: '#FFFFFF' }, 'text');

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={[styles.container, { backgroundColor, borderColor }]}
        onPress={() => setModalVisible(true)}
      >
        {/* Bank Icon */}
        <Image source={icons.bank} style={styles.bankIcon} />

        {/* Payment Method Text */}
        <Text style={[styles.text, { color: textColor }]}>Bank Transfer</Text>

        {/* Arrow Icon */}
        <Image source={icons.down_arrow} style={styles.arrowIcon} />
      </TouchableOpacity>

      {/* Payment Method Modal */}
      <PaymentMethodModal title='Payment Method' visible={modalVisible} onClose={() => setModalVisible(false)} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    borderWidth: 0.3,
    boxShadow: '0px 0px 4px rgba(165, 165, 165, 0.25)',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginVertical: 15,
    alignSelf: 'center',
  },
  bankIcon: {
    width: 32,
    height: 32,
    marginRight: 12,
  },
  text: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  arrowIcon: {
    width: 20,
    height: 20,
  },
});

export default PaymentMethodSelector;
