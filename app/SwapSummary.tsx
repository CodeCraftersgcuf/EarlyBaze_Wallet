import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import PrimaryButton from '@/components/Buy/PrimaryButton';
import Header from '@/components/Header';
import SwapSummaryDetails from '@/components/Swap/SwapSummaryDetails';
import { useRouter, router } from 'expo-router';
const SwapSummary: React.FC = () => {
  // Theme Colors
  const backgroundColor = useThemeColor({ light: '#EFFEF9', dark: '#000000' }, 'background');

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Header */}
      <Header title="Swap Summary" />

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.summaryContainer}>
          <SwapSummaryDetails />
        </View>
      </ScrollView>

      {/* Proceed Button Fixed at Bottom */}
      <View style={styles.fixedButtonContainer}>
        <PrimaryButton title="Proceed" onPress={() => router.push('/TransactionPage')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    marginTop: 25,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  summaryContainer: {
    marginHorizontal: 16,
  },
  fixedButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 18,
    right: 18,
    width: '90%',
  },
});

export default SwapSummary;
