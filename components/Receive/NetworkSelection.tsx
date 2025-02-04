import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { images } from '@/constants';
import PrimaryButton from '@/components/Buy/PrimaryButton';
import NetworkSelectionModal from './NetworkSelectionModal';
import networkOptions from '@/constants/networkOptions.json';
import { useRouter, router } from 'expo-router';
import { useThemeColor } from '@/hooks/useThemeColor';
interface NetworkSelectionProps {
    cardBackgroundColor: string;
    textColor: string;
}

const NetworkSelection: React.FC<NetworkSelectionProps> = ({ cardBackgroundColor, textColor }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedNetwork, setSelectedNetwork] = useState(networkOptions[0]); // Default to Bitcoin

    const backgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#161616' }, 'background');


    const handleSelectNetwork = (network: any) => {
        setSelectedNetwork(network);
        setModalVisible(false);
    };

    return (
        <View style={[styles.networkContainer, { backgroundColor: cardBackgroundColor }]}>
            <Text style={[styles.label, { color: textColor }]}>Select Network</Text>

            {/* Dropdown */}
            <TouchableOpacity style={[styles.dropdown, { backgroundColor }]} onPress={() => setModalVisible(true)}>
                <View style={styles.networkInfo}>
                    <Image source={images.solana} style={styles.networkIcon} />
                    <Text style={[styles.networkText, { color: textColor }]}>{selectedNetwork.name}</Text>
                </View>
                <Ionicons name="chevron-down-outline" size={20} color="black" />
            </TouchableOpacity>

            <View style={styles.hintContainer}>
                <Text style={[styles.networkHint, { color: textColor }]}>Make sure to choose the right network to avoid loss of funds</Text>
            </View>

            <PrimaryButton title="Proceed" onPress={() => router.push('/SummaryReceive')} />

            {/* Show Modal */}
            <NetworkSelectionModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSelectNetwork={handleSelectNetwork}
                selectedNetwork={selectedNetwork}
                networks={networkOptions}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    networkContainer: {
        flex: 1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 30,
        paddingHorizontal: 25,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    dropdown: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 12,
        justifyContent: 'space-between',
    },
    networkInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    networkIcon: {
        width: 24,
        height: 24,
        marginRight: 8,
    },
    networkText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    hintContainer: {
        borderWidth: 1,
        borderColor: '#0F9D58',
        borderRadius: 10,
        marginTop: 10,
        paddingVertical: 4,
        paddingHorizontal: 4,
        marginBottom: 20,
    },
    networkHint: {
        fontSize: 12,
        color: 'gray',
        textAlign: 'center',
    },
    proceedButton: {
        marginTop: 20,
    },
});

export default NetworkSelection;
