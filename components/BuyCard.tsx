// components/BuyCard/index.tsx
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import InputField from '@/components/Buy/InputField';
import SelectionBox from '@/components/Buy/SelectionBox';
import PaymentMethodHeader from '@/components/Buy/PaymentMethodHeader';
import SwapButton from '@/components/Buy/SwapButton';
import AmountToPay from '@/components/Buy/AmountToPay';
import NetworkSelectionModal from './Receive/NetworkSelectionModal';
import networkOptions from '@/constants/networkOptions.json';

import icons from '@/constants/icons';
import { images } from '@/constants';

const BuyCard: React.FC = () => {
  const backgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#161616' }, 'cardBackground');
  const doublearrow = useThemeColor({ light: images.double_arrow_white, dark: images.double_arrow_black }, 'doublearrow');
  const arrowBorderColor = useThemeColor({ light: '#E5E5E5', dark: '#095D3F' }, 'arrowBorder');

  // State to handle modal visibility
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(networkOptions[0]); // Default coin
  const [selectedNetwork, setSelectedNetwork] = useState(networkOptions[0]); // Default network
  const [modalType, setModalType] = useState<string | null>(null); // Store modal type

  // Function to handle network selection
  const handleSelectNetwork = (network: any) => {
    if (modalType === "coin") {
      setSelectedCoin(network);
    } else if (modalType === "network") {
      setSelectedNetwork(network);
    }
    setModalVisible(false); // Close modal after selection
  };

  // Function to handle coin selection
  const coinId = selectedCoin?.id ? selectedCoin.id.toString() : null; // ✅ Ensure proper check

  const openModal = (type: string) => {
    setModalType(type); // Store the type
    setModalVisible(true); // Show the modal
  };

  return (
    <View style={[styles.card, { backgroundColor }]}>
      <PaymentMethodHeader />

      {/* Coin Selection */}
      <View style={styles.exchangeContainer}>
        <InputField label="USD" value="2,345" />
        <SelectionBox
          label="Coin"
          id={selectedCoin.id}
          value={selectedCoin.name}
          icon={selectedCoin.icon}
          onPress={() => openModal("coin")}
        />
      </View>

      {/* Swap Button */}
      <TouchableOpacity style={[styles.swapButton, { borderColor: arrowBorderColor }]}>
        <Image source={doublearrow} style={styles.swapIcon} />
      </TouchableOpacity>

      {/* Network Selection */}
      <View style={styles.selectionContainer}>
        <InputField label="BTC" value="0.000234" />
        <SelectionBox
          label="Network"
          id={selectedNetwork.id}
          value={selectedNetwork.name}
          icon={selectedNetwork.icon}
          onPress={coinId ? () => openModal("network") : undefined}
          disabled={!coinId}
          style={!coinId ? { opacity: 0.5 } : undefined} // ✅ Ensure `undefined` if no extra styles
        />



      </View>

      {/* Amount to Pay Section */}
      <AmountToPay label="Amount to pay" value="NGN 25,000,000" />

      {/* Show Modal with Correct Type */}
      {/* Show Modal with Correct Type (only when coinId exists) */}
      {coinId && (
        <NetworkSelectionModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSelectNetwork={handleSelectNetwork}
          selectedNetwork={selectedNetwork}
          networks={networkOptions}
          modelType={modalType} // ✅ Dynamically sets modelType
          coinId={selectedCoin.id} // ✅ Passes selected coin ID
        />
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    borderRadius: 10,
    padding: 16,
    margin: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  exchangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    gap: 8,
  },
  selectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: 8,
  },
  swapButton: {
    padding: 14,
    borderRadius: 50,
    marginHorizontal: 8,
    borderWidth: 2,
    position: 'absolute',
    zIndex: 1,
    top: '50%',
    right: '45%',
  },
  swapIcon: {
    width: 28,
    height: 28,
  },
});

export default BuyCard;
