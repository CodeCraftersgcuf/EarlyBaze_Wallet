import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { Header } from '@/components/Index/Header';
import { useThemeColor } from '@/hooks/useThemeColor';
import WalletCard from '@/components/Index/WalletCard';
import ServiceOptions from '@/components/Index/ServiceOptions';
import ImageSlider from '@/components/Index/ImageSlider';
import AssetsTab from '@/components/Index/AssetsTab'; // ✅ Import the new component

export default function HomeScreen() {
  const [isCrypto, setIsCrypto] = useState(true);
  const backgroundColor = useThemeColor({ light: '#EFFEF9', dark: '#000000' }, 'background');
  const toggleWallet = () => setIsCrypto(!isCrypto);

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <ScrollView>
        <Header username="Qamardeen" greeting="Good Morning" />
        <WalletCard isCrypto={isCrypto} onToggle={toggleWallet} />
        <ServiceOptions />
        <ImageSlider />
        <AssetsTab /> ✅ Added the new AssetsTab
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
