import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import PrimaryButton from '@/components/Buy/PrimaryButton';
import Header from '@/components/Header';
import BuyHead from '@/components/BuyHead';
import SwapAssetSection from '@/components/Swap/SwapAssetSection';
import ExchangeRate from '@/components/Swap/ExchangeRate';
import { useRouter, router } from 'expo-router';

const Swap: React.FC = () => {
  // Theme Colors
  const backgroundColor = useThemeColor({ light: '#EFFEF9', dark: '#000000' }, 'background');
  const borderColor = useThemeColor({ light: '#22A45D', dark: '#157347' }, 'border');

  const [selectedTab, setSelectedTab] = useState<'Naira' | 'Crypto'>('Naira');

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Header */}
      <Header />

      {/* Title Section */}
      <BuyHead buttonText="Swap Crypto" />

      {/* Currency Toggle Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Naira' && styles.activeTab]}
          onPress={() => setSelectedTab('Naira')}
        >
          <Text style={[styles.tabText, selectedTab === 'Naira' && styles.activeTabText]}>Naira</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Crypto' && styles.activeTab]}
          onPress={() => setSelectedTab('Crypto')}
        >
          <Text style={[styles.tabText, selectedTab === 'Crypto' && styles.activeTabText]}>Crypto</Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.swapContainer}>
          {/* Swap Sections */}
          <SwapAssetSection title="You Send" asset="USDT" network="Tron" amount="12,500" converted="5,123" />
          
          {/* Swap Icon */}
          <View style={styles.swapIconContainer}>
            <Text style={styles.swapIcon}>⇅</Text>
          </View>

          <SwapAssetSection title="You Receive" asset="Naira" network="NGN" amount="54,000,000" />

          {/* Exchange Rate */}
          <ExchangeRate rate="$1 = 1,750NGN" />

          {/* Note Box */}
          <View style={[styles.noteContainer, { borderColor }]}>
            <Text style={styles.noteTitle}>Note</Text>
            <Text style={styles.noteText}>
              Crosscheck all address before pasting{'\n'}
              Make sure you select the right network
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Proceed Button Fixed at Bottom */}
      <View style={styles.fixedButtonContainer}>
        <PrimaryButton title="Proceed" onPress={() => router.push('/SwapSummary')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
    marginTop: 100,
    paddingHorizontal: 18,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#22A45D',
    borderRadius: 10,
  },
  tabText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  swapContainer: {
    marginHorizontal: 16,
  },
  swapIconContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  swapIcon: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  noteContainer: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  noteTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  noteText: {
    fontSize: 12,
  },
  fixedButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 18,
    right: 18,
    width: '90%',
  },
});

export default Swap;
