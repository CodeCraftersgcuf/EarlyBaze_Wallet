import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import PrimaryButton from '@/components/Buy/PrimaryButton';
import Header from '@/components/Header';
import BuyHead from '@/components/BuyHead';
import SwapAssetSection from '@/components/Swap/SwapAssetSection';
import ExchangeRate from '@/components/Swap/ExchangeRate';
import { useRouter, router } from 'expo-router';
import NoteSwapBox from '@/components/Swap/NoteSwapBox';
import NetworkSelectionModal from '@/components/Receive/NetworkSelectionModal'; // ✅ Import modal
import bitCoin from '@/assets/images/bitcoin.png';
import { images } from '@/constants';
import SwapTabs from '@/components/Swap/SwapTabs';
import networkOptions from '@/constants/networkOptions.json';

const Swap: React.FC = () => {
  const backgroundColor = useThemeColor({ light: '#EFFEF9', dark: '#000000' }, 'background');
  const arrowBorderColor = useThemeColor({ light: '#E5E5E5', dark: '#095D3F' }, 'arrowBorder');
  const doublearrow = useThemeColor({ light: images.double_arrow_white, dark: images.double_arrow_black }, 'doublearrow');
  const containerBackgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#0D0D0D' }, 'card');

  // ✅ Manage state for the modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<'asset' | 'network'>('asset'); // Start with asset selection

  const [selectedAsset, setSelectedAsset] = useState<{ id: string; name: string; icon: any }>({
    id: "",
    name: "Select Asset",
    icon: bitCoin,
  });

  const [selectedNetwork, setSelectedNetwork] = useState<{ id: string; name: string; icon: any }>({
    id: "",
    name: "Select Network",
    icon: bitCoin,
  });

  // ✅ Ensure network selection is only possible when an asset is selected
  const assetId = selectedAsset?.id ? selectedAsset.id : null;

  // Function to update asset or network on selection
  const handleSelectItem = (item: any) => {
    if (modalType === 'asset') {
      setSelectedAsset(item);
      setSelectedNetwork({ id: "", name: "Select Network", icon: bitCoin }); // Reset network selection when asset changes
    } else {
      setSelectedNetwork(item);
    }
    setModalVisible(false);
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Header />
      <BuyHead buttonText="Swap Crypto" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.swapContainer, { backgroundColor: containerBackgroundColor }]}>
          {/* Asset Selection */}
          <SwapAssetSection
            title="You Send"
            asset={selectedAsset.name}
            assetImage={selectedAsset.icon}
            network={selectedNetwork.name}
            networkImage={selectedNetwork.icon}
            amount="12,500"
            converted="5,123"
            onPressAsset={() => {
              setModalType('asset'); // ✅ Open modal for asset selection first
              setModalVisible(true);
            }}
            onPressNetwork={assetId ? () => {
              setModalType('network'); // ✅ Open modal for network selection only when asset is selected
              setModalVisible(true);
            } : undefined} // Disable if asset is not selected
            disabled={!assetId} // Ensure proper disable behavior
            style={!assetId ? { opacity: 0.5 } : undefined} // Visual disable
          />

          {/* Swap Button */}
          <TouchableOpacity style={[styles.swapButton, { borderColor: arrowBorderColor }]}>
            <Image source={doublearrow} style={styles.swapIcon} />
          </TouchableOpacity>

          {/* Receive Section */}
          <SwapAssetSection
            title="You Receive"
            asset="Naira"
            assetImage={bitCoin}
            amount="54,000,000"
          />
        </View>

        <View style={styles.exchangeRate}>
          <ExchangeRate rate="$1 = 1,750 NGN" />
        </View>
        <NoteSwapBox />
      </ScrollView>

      <View style={styles.fixedButtonContainer}>
        <PrimaryButton title="Proceed" onPress={() => router.push('/SwapSummary')} />
      </View>

      {/* ✅ Show Modal (Opens First with Coin, then Network) */}
      <NetworkSelectionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelectNetwork={handleSelectItem}
        selectedNetwork={modalType === 'asset' ? selectedAsset : selectedNetwork}
        networks={networkOptions} // You might need to fetch network options dynamically
        modelType={modalType === 'asset' ? 'coin' : 'network'} // ✅ First opens as 'coin', then switches to 'network'
        coinId={selectedAsset.id} // ✅ Ensures network fetch depends on selected asset
      />
    </View>
  );
};



const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 25, paddingTop: 10 },
  scrollContent: { paddingBottom: 0 },
  swapContainer: { paddingHorizontal: 16, marginHorizontal: 18, borderRadius: 20 },
  fixedButtonContainer: { position: 'absolute', bottom: 20, left: 18, right: 18, width: '90%' },
  swapButton: {
    padding: 11,
    borderRadius: 50,
    marginHorizontal: 8,
    borderWidth: 2,
    position: 'absolute',
    zIndex: 10,
    top: '50.5%',
    right: '45%',
  },
  swapIcon: { width: 24, height: 24 },
  exchangeRate: { paddingHorizontal: 16, marginBottom: 20 },
});

export default Swap;
