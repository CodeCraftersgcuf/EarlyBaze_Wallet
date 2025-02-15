import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import CryptoItem from '@/components/Assests/CryptoItem';
import { useThemeColor } from '@/hooks/useThemeColor';
interface CryptoListProps {
  data: {
    id: string;
    name: string;
    symbol: string;
    price: string;
    usdPrice: string;
    change: string;
    marketCap: string;
    icon: any;
  }[];
}

const CryptoList: React.FC<CryptoListProps> = ({ data }) => {
    const backgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#000000' }, 'background');

    return (
    <View style={[styles.listContainer, { backgroundColor }]}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <CryptoItem {...item} />}
      />
    </View>
  );
};

export default CryptoList;

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 10,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
});
