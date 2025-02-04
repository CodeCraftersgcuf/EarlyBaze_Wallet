import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { images } from '@/constants';

interface SendCryptoFormProps {
    selectedTab: 'Crypto Address' | 'Internal Transfer';
    setSelectedTab: (tab: 'Crypto Address' | 'Internal Transfer') => void;
}

const SendCryptoForm: React.FC<SendCryptoFormProps> = ({ selectedTab, setSelectedTab }) => {
    // Theme-based colors
    const cardBackgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1A1A1A' }, 'card');
    const textColor = useThemeColor({ light: '#222222', dark: '#FFFFFF' }, 'text');
    const borderColor = useThemeColor({ light: '#E5E5E5', dark: '#333333' }, 'border');

    return (
        <View>
            {/* Tab Switcher */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tabButton, selectedTab === 'Crypto Address' && styles.activeTab]}
                    onPress={() => setSelectedTab('Crypto Address')}>
                    <Text style={[styles.tabText, selectedTab === 'Crypto Address' && styles.activeTabText]}>
                        Crypto Address
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tabButton, selectedTab === 'Internal Transfer' && styles.activeTab]}
                    onPress={() => setSelectedTab('Internal Transfer')}>
                    <Text style={[styles.tabText, selectedTab === 'Internal Transfer' && styles.activeTabText]}>
                        Internal Transfer
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Main Card Container */}
            <View style={[styles.mainContainer, { backgroundColor: cardBackgroundColor, borderColor }]}>
                {/* Input Address Field */}
                <View style={[styles.inputContainer, { borderColor }]}>
                    <TextInput
                        placeholder="Input Address"
                        placeholderTextColor="#A1A1A1"
                        style={[styles.inputField, { color: textColor }]}
                    />
                    <TouchableOpacity>
                        <Image source={images.scan} style={styles.scanIcon} />
                    </TouchableOpacity>
                </View>

                {/* Amount and Currency Selection */}
                <View style={styles.amountContainer}>
                    <View style={[styles.amountBox, { borderColor }]}>
                        <Text style={styles.amountLabel}>BTC</Text>
                        <Text style={styles.amountValue}>0.000234</Text>
                        <Text style={styles.maxText}>Max</Text>
                    </View>
                    <TouchableOpacity style={styles.swapButton}>
                        <Image source={images.solana} style={styles.swapIcon} />
                    </TouchableOpacity>
                    <View style={[styles.amountBox, { borderColor }]}>
                        <Text style={styles.amountLabel}>USD</Text>
                        <Text style={styles.amountValue}>2,345</Text>
                        <Text style={styles.maxText}>Max</Text>
                    </View>
                </View>

                {/* Coin & Network Selection */}
                <View style={styles.selectionContainer}>
                    <View style={[styles.selectionBox, { borderColor }]}>
                        <Text style={styles.selectionLabel}>Coin</Text>
                        <View style={styles.coinWrapper}>
                            <Text style={styles.coinText}>Bitcoin</Text>
                            <Image source={images.solana} style={styles.coinIcon} />
                        </View>
                    </View>
                    <View style={[styles.selectionBox, { borderColor }]}>
                        <Text style={styles.selectionLabel}>Network</Text>
                        <View style={styles.coinWrapper}>
                            <Text style={styles.coinText}>Bitcoin</Text>
                            <Image source={images.solana} style={styles.coinIcon} />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#F6F6F6',
        borderRadius: 12,
        marginHorizontal: 16,
        marginBottom: 16,
        padding: 4,
    },
    tabButton: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 10,
    },
    activeTab: {
        backgroundColor: '#25AE7A',
    },
    tabText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#999',
    },
    activeTabText: {
        color: '#FFFFFF',
    },
    mainContainer: {
        borderRadius: 12,
        marginHorizontal: 16,
        paddingVertical: 16,
        marginBottom: 16,
        borderWidth: 1,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 14,
        borderRadius: 10,
        marginHorizontal: 12,
        borderWidth: 1,
    },
    inputField: {
        fontSize: 16,
        flex: 1,
    },
    scanIcon: {
        width: 22,
        height: 22,
    },
    amountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
    },
    amountBox: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 1,
    },
    amountLabel: {
        fontSize: 12,
        color: '#999',
        alignSelf: 'flex-start',
    },
    amountValue: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    maxText: {
        fontSize: 12,
        color: '#25AE7A',
        alignSelf: 'flex-end',
    },
    swapButton: {
        padding: 14,
        borderRadius: 50,
        backgroundColor: '#F6F6F6',
        marginHorizontal: 8,
        borderWidth: 1,
        borderColor: '#E5E5E5',
    },
    swapIcon: {
        width: 28,
        height: 28,
    },
    selectionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 12,
        marginTop: 16,
    },
    selectionBox: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderRadius: 10,
        marginHorizontal: 6,
        borderWidth: 1,
    },
    selectionLabel: {
        fontSize: 12,
        color: '#999',
        marginBottom: 4,
    },
    coinWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    coinText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    coinIcon: {
        width: 28,
        height: 28,
    },
});

export default SendCryptoForm;
