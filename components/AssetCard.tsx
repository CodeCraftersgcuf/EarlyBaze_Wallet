import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { images } from '@/constants';

interface AssetCardProps {
    name: string;
    fullName: string;
    balance: string;
    price: string;
    icon: string; // Ensure it's a string (URL)
}

const AssetCard: React.FC<AssetCardProps> = ({ name, fullName, balance, price, icon }) => {
    const backgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#161616' }, 'background');
    const textColor = useThemeColor({ light: '#000000', dark: '#FFFFFF' }, 'text');
    const secondaryTextColor = useThemeColor({ light: '#666', dark: '#999' }, 'secondaryText');

    console.log("the Icon", icon);
    return (
        <View style={[styles.card, { backgroundColor }]}>
            {/* Icon and Asset Name */}
            <View style={styles.iconRow}>
                <View style={styles.iconContainer}>
                <Image source={typeof icon === "string" ? { uri: icon } : icon ||images.account} style={styles.icon} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={[styles.assetName, { color: textColor }]}>{name}</Text>
                    <Text style={[styles.assetFullName, { color: secondaryTextColor }]}>{fullName}</Text>
                </View>
            </View>

            {/* Labels Row */}
            <View style={styles.row}>
                <Text style={[styles.label, { color: secondaryTextColor }]}>My Asset</Text>
                <Text style={[styles.label, { color: secondaryTextColor }]}>Price</Text>
            </View>

            {/* Values Row */}
            <View style={styles.row}>
                <Text style={[styles.balance, { color: textColor }]}>{balance}</Text>
                <Text style={[styles.price, { color: textColor }]}>{price}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        padding: 16,
        shadowColor: '#A8A8A8',
        shadowOpacity: 0.5,
        shadowRadius: 10,
        shadowOffset: { width: 4, height: 4 },
        elevation: 5, // Android shadow
        width: '100%',
    },
    iconRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(255, 165, 0, 0.2)', // Light orange background
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    icon: {
        width: 42,
        height: 42,
        resizeMode: 'contain',
    },
    textContainer: {
        flexDirection: 'column',
    },
    assetName: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    assetFullName: {
        fontSize: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 8,
    },
    label: {
        fontSize: 10,
    },
    balance: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 10,
        fontWeight: 'bold',
    },
});

export default AssetCard;
