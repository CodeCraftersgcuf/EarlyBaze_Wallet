import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { Header } from '@/components/Index/Header';
import { useThemeColor } from '@/hooks/useThemeColor';
import WalletCard from '@/components/Index/WalletCard';
import ServiceOptions from '@/components/Index/ServiceOptions';
import ImageSlider from '@/components/Index/ImageSlider';
import AssetsTab from '@/components/Index/AssetsTab';

export default function HomeScreen() {
  const [isCrypto, setIsCrypto] = useState(true);
  const backgroundColor = useThemeColor({ light: '#EFFEF9', dark: '#000000' }, 'background');
  const toggleWallet = () => setIsCrypto(!isCrypto);

  return (
    <ScrollView style={[styles.container, { backgroundColor }]} showsVerticalScrollIndicator={false}>
      <Header username="Qamardeen" greeting="Good Morning" />
      <WalletCard isCrypto={isCrypto} onToggle={toggleWallet} />
      <ServiceOptions />
      <ImageSlider />
      
      {/* Ensure the FlatList doesn't break layout */}
      <AssetsTab />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});

