import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native';
import WalletItem from './WalletItem';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter, router } from 'expo-router';
import { images } from '@/constants';
import { LinearGradient } from 'expo-linear-gradient';
// Importing background image
const card_back = images.card_back;
const card_back2 = images.card_back2;

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
      {/* Switch Button with Glowing Effect */}
      <View style={styles.cusButton}>
        <TouchableOpacity onPress={onToggle} style={[styles.switchButton, isCrypto ? styles.cryptoSwitchButton : styles.nairaSwitchButton]}>
          <Text style={styles.switchText}>{switchText}</Text>
        </TouchableOpacity>
      </View>

      {/* Wallet Card with Image Background */}
      <ImageBackground source={isCrypto ? card_back : card_back2} style={styles.card} imageStyle={styles.cardImage}>
        <LinearGradient
          colors={isCrypto
            ? ['rgba(11, 86, 12, 0.75)', 'rgba(6, 48, 82, 0.75)'] // For Crypto Wallet
            : ['rgba(83, 5, 74, 0.75)', 'rgba(6, 48, 82, 0.75)']} // For Naira Wallet
          style={styles.cardOverlay}
        />

        {/* Withdraw Button Positioned in the Bottom-Right Corner */}
        {!isCrypto && (
          <TouchableOpacity style={styles.withdrawButton} onPress={() => router.push('/Withdraw')}>
            <Text style={styles.withdrawText}>Withdraw</Text>
          </TouchableOpacity>
        )}

        {/* Card Header */}
        <View style={styles.pad}>
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
        </View>
        {/* Wallet Items or Content */}
        {isCrypto ? (
          <View style={styles.cryptoInfoContainer}>
            <WalletItem label="BTC" value="0.003" icon="bitcoin" />
            <WalletItem label="USDT" value="15,234" icon="dollar" />
            <WalletItem label="ETH" value="0.234" icon="ethereum" />
          </View>
        ) : null}
      </ImageBackground>
    </>
  );
};

export default WalletCard;

const styles = StyleSheet.create({
  // Wallet Card with Image Background
  card: {
    margin: 16,
    borderRadius: 20, // Matches the provided design
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
    height: 243, // Fixed height as per design
    overflow: 'hidden', // Ensures rounded corners work with ImageBackground
    zIndex: 1, // Ensure the card is above the Switch Button
  },

  cardImage: {
    borderRadius: 20, // Ensures image background follows rounded corners
    position: 'absolute',
    zIndex: -1,
  },
  pad: {
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject, // Covers the entire ImageBackground
    padding: 16,
    borderRadius: 20,
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

  // SWITCH BUTTON WITH GLOW EFFECT
  switchButton: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 10,
    width: 136,
    height: 57,
    justifyContent: 'center',
    alignItems: 'center',

    // Shadow for glow effect
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 10,
  },

  // For Crypto Switch Background Color with Glow
  cryptoSwitchButton: {
    backgroundColor: '#084B82',
    shadowColor: '#5CE3B0',
  },

  // For Naira Switch Background Color with Glow
  nairaSwitchButton: {
    backgroundColor: '#25AE7A',
    shadowColor: '#77BBF2',
  },

  cusButton: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 120,
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
    fontWeight: 'bold',
    fontStyle: 'italic',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    fontSize: 18,
  },
});
