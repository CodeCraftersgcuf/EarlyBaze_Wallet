import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import PaymentMethodModal from '@/components/Buy/PaymentMethodModal';
import icons from '@/constants/icons'; // Your arrow icon
import { images } from '@/constants';

const PaymentMethodHeader: React.FC = () => {
  const backgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1A1A1A' }, 'cardBackground');
  const borderColor = useThemeColor({ light: '#C2C2C2', dark: '#444' }, 'border');
  const textColor = useThemeColor({ light: '#A0A0A0', dark: '#C2C2C2' }, 'placeholder'); // Gray text
  const arrow = useThemeColor({ light: images.down_arrow, dark: images.down_arrow_black }, 'arrow');
  
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);

  const handleSelectPaymentMethod = (method: string) => {
    setSelectedPaymentMethod(method);
    setModalVisible(false); // Close modal after selection
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.container, { backgroundColor, borderColor }]}
        onPress={() => setModalVisible(true)}
      >
        {/* Display Selected Payment Method or Placeholder */}
        <Text style={[styles.text, { color: textColor }]}>
          {selectedPaymentMethod || 'Payment Method'}
        </Text>

        {/* Arrow Icon */}
        <Image source={arrow} style={styles.arrowIcon} />
      </TouchableOpacity>

      {/* Payment Method Modal */}
      <PaymentMethodModal 
        title='Payment Method' 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)} 
        onSelectPaymentMethod={handleSelectPaymentMethod} 
      />
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
  },
});

export default PaymentMethodHeader;
