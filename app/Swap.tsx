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
import bitCoin from '@/assets/images/bitcoin.png';
import { images } from '@/constants';
import SwapTabs from '@/components/Swap/SwapTabs'; // ✅ Importing new component

const Swap: React.FC = () => {
  const backgroundColor = useThemeColor({ light: '#EFFEF9', dark: '#000000' }, 'background');
  const arrowBorderColor = useThemeColor({ light: '#E5E5E5', dark: '#095D3F' }, 'arrowBorder');
  const doublearrow = useThemeColor({ light: images.double_arrow_white, dark: images.double_arrow_black }, 'doublearrow');
  const containerBackgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#0D0D0D' }, 'card');

  // ✅ Manage state here and pass to SwapTabs
  const [selectedTab, setSelectedTab] = useState<'Naira' | 'Crypto'>('Naira');

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Header />
      <BuyHead buttonText="Swap Crypto" />

      <SwapTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.swapContainer, { backgroundColor: containerBackgroundColor }]}>
          <SwapAssetSection
            title="You Send"
            asset="USDT"
            assetImage={bitCoin}
            network="Tron"
            networkImage={bitCoin}
            amount="12,500"
            converted="5,123"
          />
          <TouchableOpacity style={[styles.swapButton, { borderColor: arrowBorderColor }]}>
            <Image source={doublearrow} style={styles.swapIcon} />
          </TouchableOpacity>
          <SwapAssetSection title="You Receive" asset="Naira" assetImage={bitCoin} amount="54,000,000" />

        </View>
        <View style={styles.exchangeRate}>
          <ExchangeRate rate="$1 = 1,750 NGN" />
        </View>
        <NoteSwapBox />
      </ScrollView>
      <View style={styles.fixedButtonContainer}>
        <PrimaryButton title="Proceed" onPress={() => router.push('/SwapSummary')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 25 , paddingTop:10},
  scrollContent: { paddingBottom: 100 },
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
