import React from 'react';
import { View, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

interface CryptoItemProps {
  name: string;
  symbol: string;
  price: string;
  change: string;
  marketCap: string;
  icon: ImageSourcePropType | string;
}

const CryptoItem: React.FC<CryptoItemProps> = ({ name, symbol, price, change, marketCap, icon }) => {
  const backgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1A1A1A' }, 'background');
  const textColor = useThemeColor({ light: '#000000', dark: '#FFFFFF' }, 'text');
  const marketCapColor = useThemeColor({ light: '#888888', dark: '#CCCCCC' }, 'marketCap');
  const changeColor = parseFloat(change) > 0 ? '#22A45D' : '#E63946';

  // Ensure icon is properly formatted
  const iconSource = typeof icon === 'string' ? { uri: icon } : icon;

  return (
    <View style={[styles.itemContainer, { backgroundColor }]}>
      {/* Crypto Icon */}
      <View style={styles.iconContainer}>
        <Image source={iconSource} style={styles.icon} resizeMode="contain" />
      </View>

      {/* Text Content */}
      <View style={styles.textContainer}>
        <View style={styles.nameRow}>
          <Text style={[styles.cryptoName, { color: textColor }]}>{name}/</Text>
          <Text style={[styles.cryptoSymbol, { color: textColor }]}>{symbol}</Text>
        </View>
        <Text style={[styles.marketCap, { color: marketCapColor }]}>{marketCap} {symbol}</Text>
      </View>

      {/* Price & Change on the Same Line */}
      <View style={styles.priceContainer}>
        <View style={[styles.changeBadge, { backgroundColor: changeColor }]}>
          <Text style={styles.changeText}>{change}</Text>
        </View>
        <Text style={[styles.price, { color: textColor }]}>{price}</Text>
      </View>
    </View>
  );
};

export default CryptoItem;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
    padding: 14,
    borderRadius: 15,
    marginHorizontal: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 165, 0, 0.2)', // Light shadow effect for icon
    marginRight: 10,
  },
  icon: {
    width: 35,
    height: 35,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cryptoName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  cryptoSymbol: {
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 4,
  },
  marketCap: {
    fontSize: 12,
    marginTop: 2,
  },
  priceContainer: {
    flexDirection: 'row', // Ensures items are in the same line
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8, // Ensures space between change badge and price
  },
  changeBadge: {
    height: 15,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  changeText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
