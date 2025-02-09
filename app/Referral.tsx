import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Clipboard } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import PrimaryButton from '@/components/Buy/PrimaryButton';
import Header from '@/components/Header';
import ReferralStats from '@/components//Setting/Referral/ReferralStats';
import ReferralCodeBox from '@/components//Setting/Referral/ReferralCodeBox';
import ReferralListItem from '@/components//Setting/Referral/ReferralListItem';

const referralsData = [
  { name: 'Adewale', amount: '2,500', date: '29 Dec, 2024', imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { name: 'Alex', amount: '1,300', date: '29 Dec, 2024', imageUrl: 'https://randomuser.me/api/portraits/men/2.jpg' },
  { name: 'Chris', amount: '2,500', date: '29 Dec, 2024', imageUrl: 'https://randomuser.me/api/portraits/men/3.jpg' },
];

const Referral: React.FC = () => {
  const backgroundColor = useThemeColor({ light: '#EFFEF9', dark: '#000000' }, 'background');
  const referralCode = 'Qamardeen123';

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor }]}>
      <Header title="Referral" />
      <TouchableOpacity style={styles.withdrawButton}>
        <Text style={styles.withdrawText}>Withdraw</Text>
      </TouchableOpacity>

      {/* Referral Stats */}
      <ReferralStats earnings="25,000" referrals={20} />

      {/* Referral Code */}
      <ReferralCodeBox code={referralCode} onCopy={() => Clipboard.setString(referralCode)} onShare={() => console.log('Share referral')} />

      {/* Referrals List */}
      <Text style={styles.sectionTitle}>My Referrals</Text>
      {referralsData.map((referral, index) => (
        <ReferralListItem key={index} {...referral} />
      ))}
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
  withdrawButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    alignSelf: 'flex-end',
  },
  withdrawText: {
    color: '#222222',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default Referral;
