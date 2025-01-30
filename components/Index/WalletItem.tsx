import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import icons from '@/constants/icons'; // Assuming icons contains the Bitcoin icon

type WalletItemProps = {
  label: string;
  value: string;
  icon: string; // The icon key from the icons object
};

const WalletItem: React.FC<WalletItemProps> = ({ label, value, icon }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
      <View style={styles.iconWrapper}>
        <Image source={icons.bitCoin} style={styles.icon} />
      </View>
    </View>
  );
};

export default WalletItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
    width: 92, // Adjust as needed
    height: 88, // Adjust as needed
  },
  card: {
    width: '100%',
    height: '100%',
    backgroundColor: '#15655B',
    borderRadius: 16,
    alignItems: 'center',
    paddingTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  label: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: '600',
    marginBottom: 8,
  },
  value: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFF',
  },
  iconWrapper: {
    position: 'absolute',
    bottom: -15, // Position the icon outside the card
    width: 36,
    height: 36,
    borderRadius: 24,
    backgroundColor: '#FF9900', // Icon background color
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF9900', // Glowing effect
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  icon: {
    width: 32,
    height: 32,
    // tintColor: '#FFF', // Adjust as needed
  },
});
