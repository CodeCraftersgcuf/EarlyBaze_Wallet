import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import PrimaryButton from '@/components/Buy/PrimaryButton';
import Header from '@/components/Header';
import KycInfoCard from '@/components/Setting/Kyc/KycInfoCard';
import { useRouter, router } from 'expo-router';
const Kyc: React.FC = () => {
  const backgroundColor = useThemeColor({ light: '#EFFEF9', dark: '#000000' }, 'background');

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor }]}>
      {/* Header */}
      <Header title="KYC Verification" />

      {/* KYC Instructions */}
      <KycInfoCard status="Pending" />

      {/* Proceed Button */}
      <View style={styles.buttonContainer}>
        <PrimaryButton title="Proceed" onPress={() =>router.push('/KycDetail')} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 20,
  },
  buttonContainer: {
    paddingHorizontal: 6,
    marginTop: 20,
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignSelf: 'center',
  },
});

export default Kyc;
