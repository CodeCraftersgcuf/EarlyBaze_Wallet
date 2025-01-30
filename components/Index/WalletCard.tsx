import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import WalletItem from './WalletItem';
import Icon from 'react-native-vector-icons/Ionicons';

type WalletCardProps = {
  isCrypto: boolean;
  onToggle: () => void;
};

const WalletCard: React.FC<WalletCardProps> = ({ isCrypto, onToggle }) => {
  const walletTitle = isCrypto ? 'Crypto Wallet' : 'Naira Wallet';
  const walletBalance = isCrypto ? '$25,000' : '₦25,000,000';
  const switchText = isCrypto ? (
    <>
      Switch to <Text style={styles.glowText}>Naira</Text> Wallet
    </>
  ) : (
    <>
      Switch to <Text style={styles.glowText}>Crypto</Text> Wallet
    </>
  );

  // State to toggle balance visibility
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  return (
    <>
      <View style={styles.cusButton}>
        <TouchableOpacity onPress={onToggle} style={[styles.switchButton, isCrypto ? styles.cryptoSwitchButton : styles.nairaSwitchButton]}>
          <Text style={styles.switchText}>{switchText}</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.card, isCrypto ? styles.cryptoCard : styles.nairaCard]}>
        {/* Withdraw Button Positioned in the Bottom-Right Corner */}
        {!isCrypto && (
          <TouchableOpacity style={styles.withdrawButton}>
            <Text style={styles.withdrawText}>Withdraw</Text>
          </TouchableOpacity>
        )}

        {/* Card Header */}
        <View style={styles.header}>
          <Text style={styles.cardTitle}>{walletTitle}</Text>
        </View>

        {/* Card Balance with Eye Icon */}
        <View style={styles.balanceContainer}>
          <Text style={styles.cardBalance}>
            {isBalanceVisible ? walletBalance : '*****'}
          </Text>
          <TouchableOpacity onPress={toggleBalanceVisibility}>
            <Icon
              name={isBalanceVisible ? 'eye-off' : 'eye'}
              size={24}
              color="#FFF"
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Wallet Items or Content */}
        {isCrypto ? (
          <View style={styles.cryptoInfoContainer}>
            <WalletItem label="BTC" value="0.003" icon="bitcoin" />
            <WalletItem label="USDT" value="15,234" icon="dollar" />
            <WalletItem label="ETH" value="0.234" icon="ethereum" />
          </View>
        ) : null}
      </View>
    </>
  );
};

export default WalletCard;

const styles = StyleSheet.create({
  // Card Container
  card: {
    margin: 16,
    borderRadius: 20, // Matches the provided design
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
    height: 243, // Fixed height as per design
  },
  cryptoCard: {
    backgroundColor: '#007F5F',
  },
  nairaCard: {
    backgroundColor: '#4C4C6D',
  },

  // Card Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },

  // Card Balance
  cardBalance: {
    color: '#FFF',
    fontSize: 48,
    fontWeight: 'bold',
    marginTop: 8,
  },

  // Balance Container for Eye Icon
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  // Eye Icon Style
  eyeIcon: {
    marginLeft: 10,
  },

  // Crypto Info Section
  cryptoInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 26,
  },

  // Withdraw Button
  withdrawButton: {
    position: 'absolute',
    bottom: 16,
    left: 16, // Set to 16 for padding from the left edge
    right: 16, // Use right: 16 for consistent spacing
    backgroundColor: '#FFF',
    paddingVertical: 12,
    borderRadius: 100, // Updated border radius to match the provided design
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  withdrawText: {
    color: '#4C4C6D',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  // Switch Button Base Style
  switchButton: {
    borderRadius: 20,  // Adjusting for the border-radius as per the provided CSS
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
    width: 136,  // Adjusted width
    height: 57,  // Adjusted height
    justifyContent: 'center',
    alignItems: 'center',
  },

  // For Crypto Switch Background Color
  cryptoSwitchButton: {
    backgroundColor: '#084B82',  // Crypto background color
    shadowColor: '#5CE3B0',  // Crypto shadow color
  },

  // For Naira Switch Background Color
  nairaSwitchButton: {
    backgroundColor: '#25AE7A',  // Naira background color
    shadowColor: '#77BBF2',  // Naira shadow color
  },

  cusButton: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 110,
    right: 15,
    zIndex: 100,
  },
  
  switchText: {
    position: 'relative',
    color: '#FFF',
    fontSize: 15,
    fontWeight: '600',
  },

  // Glow Text Style for "Naira" and "Crypto" words
  glowText: {
    fontWeight: 'bold',  // Making text bold
    fontStyle: 'italic',  // Making text italic
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,  // Radius of the glow
    fontSize: 18,
  },
});
