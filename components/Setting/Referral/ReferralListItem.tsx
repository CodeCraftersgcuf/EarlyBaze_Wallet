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

  return (
    <View style={[styles.container, { backgroundColor: cardBackgroundColor }]}>
      <Image source={{ uri: imageUrl }} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={[styles.name, { color: textColor }]}>{name}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Text style={[styles.amount, { color: textColor }]}>{amount}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: '#777',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ReferralListItem;
