import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

interface ReferralListItemProps {
  name: string;
  amount: string;
  date: string;
  imageUrl: string;
}

const ReferralListItem: React.FC<ReferralListItemProps> = ({ name, amount, date, imageUrl }) => {
  const cardBackgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1A1A1A' }, 'card');
  const textColor = useThemeColor({ light: '#222222', dark: '#FFFFFF' }, 'text');
  const secondaryTextColor = useThemeColor({ light: '#777777', dark: '#AAAAAA' }, 'secondaryText');

  return (
    <View style={[styles.container, { backgroundColor: cardBackgroundColor }]}>
      {/* User Avatar */}
      <Image source={{ uri: imageUrl }} style={styles.avatar} />

      {/* Info Container */}
      <View style={styles.infoContainer}>
        <Text style={[styles.name, { color: textColor }]}>{name}</Text>
      </View>

      {/* Amount and Date Column */}
      <View style={styles.amountContainer}>
        <Text style={[styles.amount, { color: textColor }]}>{amount}</Text>
        <Text style={[styles.date, { color: secondaryTextColor }]}>{date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  amountContainer: {
    alignItems: 'flex-end', // Align amount and date to the right
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default ReferralListItem;
