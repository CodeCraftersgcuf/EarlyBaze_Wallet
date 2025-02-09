import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

interface ReferralStatsProps {
  earnings: string;
  referrals: number;
}

const ReferralStats: React.FC<ReferralStatsProps> = ({ earnings, referrals }) => {
  const cardBackgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1A1A1A' }, 'card');
  const textColor = useThemeColor({ light: '#222222', dark: '#FFFFFF' }, 'text');

  return (
    <View style={[styles.container, { backgroundColor: cardBackgroundColor }]}>
      <View style={styles.statBox}>
        <Text style={[styles.amount, { color: textColor }]}>${earnings}</Text>
        <Text style={styles.label}>Earnings</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.statBox}>
        <Text style={[styles.amount, { color: textColor }]}>{referrals}</Text>
        <Text style={styles.label}>No of Referrals</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 12,
    color: '#777',
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: '#E5E5E5',
  },
});

export default ReferralStats;
