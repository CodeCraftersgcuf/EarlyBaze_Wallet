import { ImageSourcePropType } from 'react-native';
import icons from '@/constants/icons';

export const assetsData = [
  { id: '1', name: 'Bitcoin', symbol: 'BTC', balance: '$0.0000', price: '1 BTC = $97,000', icon: icons.bitCoin },
  { id: '2', name: 'US Dollars', symbol: 'USDT', balance: '$0.0000', price: '1 BTC = $97,000', icon: icons.bitCoin },
  { id: '3', name: 'Ethereum', symbol: 'ETH', balance: '$0.0000', price: '1 BTC = $97,000', icon: icons.bitCoin },
  { id: '4', name: 'Bitcoin', symbol: 'BTC', balance: '$0.0000', price: '1 BTC = $97,000', icon: icons.bitCoin },
];

export const myAssetsData = [
  { id: '1', name: 'Bitcoin', symbol: 'BTC', balance: '$0.5000', price: '1 BTC = $97,000', icon: icons.bitCoin },
  { id: '2', name: 'Ethereum', symbol: 'ETH', balance: '$2.0000', price: '1 ETH = $4,500', icon: icons.bitCoin },
];

export const transactionsData = [
  { id: '1', name: 'Bitcoin', symbol: 'BTC', balance: '-$100.00', price: 'Sent to Wallet', icon: icons.bitCoin },
  { id: '2', name: 'USDT', symbol: 'USDT', balance: '+$500.00', price: 'Received from Exchange', icon: icons.bitCoin },
];
