import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import PrimaryButton from '@/components/Buy/PrimaryButton';
import Header from '@/components/Header';
import KycInfoCard from '@/components/Setting/Kyc/KycInfoCard';
import { useRouter, router } from 'expo-router';

const Kyc: React.FC = () => {
  const backgroundColor = useThemeColor({ light: '#EFFEF9', dark: '#000000' }, 'background');

  // Simulating KYC status (replace with real API data)
  const [kycStatus, setKycStatus] = useState<'Pending' | 'Failed' | 'Approved' | undefined>('Approved');

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor }]}>
      {/* Header */}
      <Header title="KYC Verification" />

      {/* KYC Instructions */}
      <KycInfoCard status={kycStatus} />

      {/* Proceed Button */}
      <View style={styles.buttonContainer}>
        <PrimaryButton
          title="Proceed"
          onPress={() => router.push('/KycDetail')}
          disabled={kycStatus === 'Approved'} // Disable button if KYC is approved
        />
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
