import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

interface AssetProps {
    item: {
        id: string;
        name: string;
        balance: string;
        price: string;
        icon?: string | null; // ✅ Now using `icon`, not `symbol`
    };
}

const AssetItem: React.FC<AssetProps> = ({ item }) => {
    const backgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#161616' }, 'background');
    const textColor = useThemeColor({ light: '#8A8A8A', dark: '#FFFFFF' }, 'text');
    const balanceTextColor = useThemeColor({ light: '#000000', dark: '#FFFFFF' }, 'text');

    return (
        <View style={[styles.assetContainer, { backgroundColor }]}>
            {/* ✅ FIXED: Ensure Image source is properly set */}
            {item.icon ? (
                <Image
                    source={{ uri: item.icon }}
                    style={styles.assetIcon}
                    resizeMode="contain"
                />
            ) : (
                <Text style={{ color: textColor }}>No Image</Text>
            )}

            <View style={styles.assetDetails}>
                <Text style={[styles.assetName, { color: textColor }]}>{item.name}</Text>
            </View>
            <View style={styles.assetValue}>
                <Text style={[styles.balance, { color: balanceTextColor }]}>{item.balance}</Text>
                <Text style={[styles.price, { color: textColor }]}>{item.price}</Text>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    assetContainer: {
        flexDirection: 'row',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    assetIcon: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    assetDetails: {
        flex: 1,
    },
    assetName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    assetType: {
        fontSize: 12,
        color: '#8A8A8A',
    },
    assetValue: {
        alignItems: 'flex-end',
    },
    balance: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 12,
        color: '#8A8A8A',
    },
});

export default AssetItem;
