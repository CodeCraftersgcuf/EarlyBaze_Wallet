import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { images } from '@/constants';

interface SwapAssetSectionProps {
  title: string;
  asset: string;
  assetImage: any;
  amount: string;
  network?: string;
  networkImage?: any;
  converted?: string;
  onPressAsset?: () => void;
  onPressNetwork?: () => void;
}

const SwapAssetSection: React.FC<SwapAssetSectionProps> = ({
  title,
  asset,
  assetImage,
  amount,
  network,
  networkImage,
  converted,
  onPressAsset,
  onPressNetwork
}) => {
  const textColor = useThemeColor({ light: '#000000', dark: '#FFFFFF' }, 'text');
  const cardBackgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#161616' }, 'card');
  const inputBackgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#000000' }, 'input');
  const labelColor = useThemeColor({ light: '#888', dark: '#BBBBBB' }, 'label');
  const borderColor = useThemeColor({ light: '#E5E5E5', dark: '#000000' }, 'border');
  const arrow = useThemeColor({ light: images.down_arrow, dark: images.down_arrow_black }, 'arrow');

  return (
    <View style={[styles.swapBox, { backgroundColor: cardBackgroundColor, borderColor }]}>
      <Text style={[styles.label, { color: labelColor }]}>{title}</Text>

      {/* Asset Selection */}
      <View style={styles.row}>
        <TouchableOpacity style={[styles.assetBox, { borderColor, backgroundColor: inputBackgroundColor }]} onPress={onPressAsset}>
          <Image source={assetImage} style={styles.assetImage} />
          <View style={styles.assetTextContainer}>
            <Text style={[styles.assetSubText, { color: labelColor }]}>Asset</Text>
            <Text style={[styles.assetText, { color: textColor }]}>{asset}</Text>
          </View>
          
          {title ==='You Send' &&<Image source={arrow} style={styles.arrowIcon} />}

        </TouchableOpacity>

        {/* Amount Display */}
        <View style={[styles.amountBox, { borderColor, backgroundColor: inputBackgroundColor }]}>
          <Text style={[styles.amountCurrency, { color: labelColor }]}>{asset}</Text>
          <Text style={[styles.amountText, { color: textColor }]}>{amount}</Text>
        </View>
      </View>

      {/* Network Selection Row */}
      {network && converted && (
        <View style={styles.row}>
          <TouchableOpacity style={[styles.assetBox, { borderColor, backgroundColor: inputBackgroundColor }]} onPress={onPressNetwork}>
            <Image source={networkImage} style={styles.assetImage} />
            <View style={styles.assetTextContainer}>
              <Text style={[styles.assetSubText, { color: labelColor }]}>Network</Text>
              <Text style={[styles.assetText, { color: textColor }]}>{network}</Text>
            </View>
            <Image source={arrow} style={styles.arrowIcon} />
          </TouchableOpacity>
          <View style={[styles.amountBox, { borderColor, backgroundColor: inputBackgroundColor }]}>
            <Text style={[styles.amountCurrency, { color: labelColor }]}>USD</Text>
            <Text style={[styles.amountText, { color: textColor }]}>{converted}</Text>
          </View>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  swapBox: {
    borderRadius: 20,
    padding: 15,
    marginBottom: 2,
    marginTop: 10,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  assetBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50, // Rounded corners
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: '48%',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    justifyContent: 'space-between',
  },
  assetTextContainer: {
    flex: 1,
    marginLeft: 8, // Adjust spacing between icon and text
  },
  assetSubText: {
    fontSize: 12,
    fontWeight: '500',
    opacity: 0.6, // Light gray effect
  },
  assetImage: {
    width: 42,
    height: 42,
  },
  assetText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  arrowIcon: {
    marginTop: 10,
    width: 10,
    height: 10,
  },
  amountBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 10,
    width: '48%',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  amountCurrency: {
    fontSize: 12,
    fontWeight: '500',
    opacity: 0.6, // Light gray effect
  },
  amountText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
export default SwapAssetSection;
