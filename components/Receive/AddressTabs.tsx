import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

interface AddressTabsProps {
    selectedTab: 'Crypto Address' | 'Email Address';
    setSelectedTab: (tab: 'Crypto Address' | 'Email Address') => void;
}

const AddressTabs: React.FC<AddressTabsProps> = ({ selectedTab, setSelectedTab }) => {
    const backgroundColor = useThemeColor({ light: '#F0F0F0', dark: '#1A1A1A' }, 'tabBackground');
    const activeColor = useThemeColor({ light: '#25AE7A', dark: '#25AE7A' }, 'activeTab');
    const textColor = useThemeColor({ light: '#8A8A8A', dark: '#FFFFFF' }, 'text');
    const activeTextColor = useThemeColor({ light: '#FFFFFF', dark: '#FFFFFF' }, 'activeText');

    return (
        <View style={[styles.tabContainer, { backgroundColor }]}>
            <TouchableOpacity
                style={[styles.tab, selectedTab === 'Crypto Address' && { backgroundColor: activeColor }]}
                onPress={() => setSelectedTab('Crypto Address')}
            >
                <Text style={[styles.tabText, { color: textColor }, selectedTab === 'Crypto Address' && { color: activeTextColor }]}>
                    Crypto Address
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.tab, selectedTab === 'Email Address' && { backgroundColor: activeColor }]}
                onPress={() => setSelectedTab('Email Address')}
            >
                <Text style={[styles.tabText, { color: textColor }, selectedTab === 'Email Address' && { color: activeTextColor }]}>
                    Email Address
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        borderRadius: 10,
        padding: 2,
        marginBottom: 15,
        marginHorizontal: 16,
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 10,
        paddingHorizontal: 16,
    },
    tabText: {
        fontSize: 12,
    },
});

export default AddressTabs;
