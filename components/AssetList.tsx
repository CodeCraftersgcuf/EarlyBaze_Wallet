import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AssetCard from '@/components/AssetCard';
import icons from '@/constants/icons';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useRouter } from 'expo-router';

const assetData = [
    { id: '1', name: 'BTC', fullName: 'Bitcoin', balance: '0.00234', price: '$97,456.33', icon: icons.bitCoin },
    { id: '2', name: 'ETH', fullName: 'Ethereum', balance: '0.0000', price: '$3,754.34', icon: icons.bitCoin },
    { id: '3', name: 'USDT', fullName: 'Tether', balance: '1,546', price: '$1.11', icon: icons.bitCoin },
    { id: '4', name: 'SOL', fullName: 'Solana', balance: '3.12', price: '$197.35', icon: icons.bitCoin },
    { id: '5', name: 'XRP', fullName: 'Ripple', balance: '5,000', price: '$0.53', icon: icons.bitCoin },
    { id: '6', name: 'ADA', fullName: 'Cardano', balance: '2,300', price: '$0.40', icon: icons.bitCoin },
    { id: '7', name: 'DOT', fullName: 'Polkadot', balance: '10.50', price: '$7.32', icon: icons.bitCoin },
    { id: '8', name: 'DOGE', fullName: 'Dogecoin', balance: '20,000', price: '$0.08', icon: icons.bitCoin },
];

const AssetList: React.FC<{ selectedTab: 'All Assets' | 'My Assets'; searchQuery: string; type: string }> = ({
    selectedTab,
    searchQuery,
    type,
}) => {
    console.log("Type from SendReceive:", type);
    const backgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#000000' }, 'background');
    const router = useRouter();

    let filteredData = selectedTab === 'All Assets' ? assetData : assetData.filter((asset) => Number(asset.balance) > 0);

    // Filter assets based on search query
    if (searchQuery) {
        filteredData = filteredData.filter(
            (asset) =>
                asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                asset.fullName.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    return (
        <View style={[styles.mainContainer, { backgroundColor }]}>
            <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id}
                numColumns={2} // Ensures two items per row
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.cardContainer}
                        onPress={() => {
                            if (type === 'receive') {
                                router.push({
                                    pathname: '/Receive',
                                    params: { assetName: item.name, fullName: item.fullName, icon: item.icon },
                                });
                            } else if (type === 'send') {
                                router.push({
                                    pathname: '/Send',
                                    params: { assetName: item.name, fullName: item.fullName, icon: item.icon },
                                });
                            }
                            else {
                                console.log(`Normal action for ${item.name}`);
                            }
                        }}
                    >
                        <AssetCard {...item} />
                    </TouchableOpacity>
                )}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
        flex: 1,
        alignSelf: 'stretch',
    },
    list: {
        paddingBottom: 20,
        paddingHorizontal: 8,
    },
    cardContainer: {
        flex: 1,
        margin: 6,
    },
});

export default AssetList;
