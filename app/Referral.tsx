import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Clipboard, Image } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '@/components/Header';
import ReferralStats from '@/components/Setting/Referral/ReferralStats';
import ReferralCodeBox from '@/components/Setting/Referral/ReferralCodeBox';
import ReferralListItem from '@/components/Setting/Referral/ReferralListItem';
import { images } from '@/constants';
import { useRouter, router } from 'expo-router';
// Example referrals data (set to empty array to test empty state)
const referralsData = [
  { name: 'Adewale', amount: '2,500', date: '29 Dec, 2024', imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { name: 'Alex', amount: '1,300', date: '29 Dec, 2024', imageUrl: 'https://randomuser.me/api/portraits/men/2.jpg' },
  { name: 'Chris', amount: '2,500', date: '29 Dec, 2024', imageUrl: 'https://randomuser.me/api/portraits/men/3.jpg' },
];
const Referral: React.FC = () => {
  const backgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#000000' }, 'background');
  const titleText = useThemeColor({ light: '#0B3558', dark: '#25AE7A' }, 'text');
  const textColor = useThemeColor({ light: '#222222', dark: '#FFFFFF' }, 'text');
  const referralCode = 'Qamardeen123';

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Gradient Background */}
      <LinearGradient colors={['#25AE7A', '#0E5A98']} style={styles.gradientBackground}>
        <View>
          <Header />
          <TouchableOpacity style={styles.withdrawButton} onPress={() => router.push('/Withdraw')}>
            <Text style={styles.withdrawText}>Withdraw</Text>
          </TouchableOpacity>
          <Text style={[styles.title,]}>Referral</Text>
          {/* Referral Stats */}
          <View style={{ marginHorizontal: 10 }}>
            <ReferralStats earnings="25,000" referrals={20} />

            {/* Referral Code */}
            <ReferralCodeBox code={referralCode} onCopy={() => Clipboard.setString(referralCode)} onShare={() => console.log('Share referral')} />
          </View>
        </View>
      </LinearGradient>

      {/* Referrals List */}
      <View style={[styles.section, { backgroundColor }]}>
        <Text style={[styles.sectionTitle, { color: titleText }]}>My Referrals</Text>

        {/* Show Empty State if No Referrals */}
        {referralsData.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Image source={images.empty} style={styles.emptyImage} />
            <Text style={[styles.emptyText, { color: textColor }]}>You have no referrals yet</Text>
          </View>
        ) : (
          referralsData.map((referral, index) => <ReferralListItem key={index} {...referral} />)
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
    marginTop: 30,
  },
  gradientBackground: {
    paddingHorizontal: 6,
    paddingBottom: 20,
  },
  withdrawButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    alignSelf: 'flex-end',
    position: 'absolute',
    top: 25,
    width: 100,
    alignItems: 'center',
    right: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    marginLeft: 20,
  },
  withdrawText: {
    color: '#222222',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 13,
  },
  section: {
    flex: 1,
    paddingHorizontal: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  emptyText: {
    fontSize: 16,
    marginTop: 12,
  },
});

export default Referral;
