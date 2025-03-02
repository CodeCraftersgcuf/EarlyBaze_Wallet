import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    Modal
} from 'react-native';
// import { BarCodeScanner } from 'expo-barcode-scanner';
import { useThemeColor } from '@/hooks/useThemeColor';
import { images } from '@/constants';

interface SendCryptoFormProps {
    selectedTab: 'Crypto Address' | 'Internal Transfer';
    setSelectedTab: (tab: 'Crypto Address' | 'Internal Transfer') => void;
}
import TabSwitcher from './TabSwitcher';
import QrModal from './QrModal';

import SelectionBox from '@/components/Buy/SelectionBox';
import InputField from '@/components/Buy/InputField';
import networkOptions from '@/constants/networkOptions.json';
import NetworkSelectionModal from '../Receive/NetworkSelectionModal';


const SendCryptoForm: React.FC<SendCryptoFormProps> = ({ selectedTab, setSelectedTab }) => {
    // Theme-based colors
    const cardBackgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1A1A1A' }, 'card');
    const textColor = useThemeColor({ light: '#222222', dark: '#FFFFFF' }, 'text');
    const borderColor = useThemeColor({ light: '#E5E5E5', dark: '#333333' }, 'border');
    const doublearrow = useThemeColor({ light: images.double_arrow_white, dark: images.double_arrow_black }, 'doublearrow');
    const arrowBorderColor = useThemeColor({ light: '#E5E5E5', dark: '#095D3F' }, 'arrowBorder');

    // QR Scanner State
    const [scannedAddress, setScannedAddress] = useState('');
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [isScannerOpen, setIsScannerOpen] = useState(false);
    const [selectedCoin, setSelectedCoin] = useState(networkOptions[0]); // Default coin
    const [selectedNetwork, setSelectedNetwork] = useState(networkOptions[0]); // Default network
    const [modalType, setModalType] = useState<string | null>(null); // Store modal type
    const [modalVisible, setModalVisible] = useState(false);


    const scan = useThemeColor({
        light: images.scan,
        dark: images.scan_black
    }, 'scan');
    // Request Camera Permission
    useEffect(() => {
        (async () => {
            // const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    // Handle QR Code Scanning
    const handleBarCodeScanned = ({ data }: { data: string }) => {
        setScannedAddress(data);
        setIsScannerOpen(false);
    };


    const coinId = selectedCoin?.id ? selectedCoin.id.toString() : null; // ✅ Ensure proper check

    const handleSelectNetwork = (network: any) => {
        if (modalType === "coin") {
            setSelectedCoin(network);
        } else if (modalType === "network") {
            setSelectedNetwork(network);
        }
        setModalVisible(false); // Close modal after selection
    };

    const openModal = (type: string) => {
        setModalType(type); // Store the type
        setModalVisible(true); // Show the modal
    };

    return (
        <View style={styles.container}>
            <TabSwitcher selectedTab={selectedTab} setSelectedTab={setSelectedTab} />


            {/* Main Card Container */}
            <View style={[styles.mainContainer, { backgroundColor: cardBackgroundColor, borderColor }]}>
                {/* Input Address Field */}
                <View style={[styles.inputContainer, { borderColor }]}>
                    <TextInput
                        placeholder="Input Address"
                        placeholderTextColor="#A1A1A1"
                        style={[styles.inputField, { color: textColor }]}
                        value={scannedAddress}
                        onChangeText={setScannedAddress}
                    />
                    <TouchableOpacity onPress={() => setIsScannerOpen(true)}>
                        <Image source={scan} style={styles.scanIcon} />
                    </TouchableOpacity>
                </View>

                {/* Amount and Currency Selection */}
                <View style={styles.exchangeContainer}>
                    <InputField label="USD" value="2,345" />
                    <SelectionBox
                        label="Coin"
                        id={selectedCoin.id}
                        value={selectedCoin.name}
                        icon={selectedCoin.icon}
                        onPress={() => openModal("coin")}
                    />
                </View>


                {/* Network Selection */}
                <View style={styles.selectionContainer}>
                    <InputField label="BTC" value="0.000234" />
                    <SelectionBox
                        label="Network"
                        id={selectedNetwork.id}
                        value={selectedNetwork.name}
                        icon={selectedNetwork.icon}
                        onPress={coinId ? () => openModal("network") : undefined}
                        disabled={!coinId}
                        style={!coinId ? { opacity: 0.5 } : undefined} // ✅ Ensure `undefined` if no extra styles
                    />



                </View>
            </View>
            {coinId && (
                <NetworkSelectionModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    onSelectNetwork={handleSelectNetwork}
                    selectedNetwork={selectedNetwork}
                    networks={networkOptions}
                    modelType={modalType} // ✅ Dynamically sets modelType
                    coinId={selectedCoin.id} // ✅ Passes selected coin ID
                />
            )}
            {/* QR Scanner Modal */}
            <QrModal isVisible={isScannerOpen} onClose={() => setIsScannerOpen(false)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 27,
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#F6F6F6',
        borderRadius: 12,
        marginHorizontal: 16,
        marginBottom: 16,
        padding: 4,
    },
    exchangeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
        gap: 8,
    },
    tabButton: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 10,
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
        // alignItems: 'center',
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
        marginTop: 4,
    },
    maxText: {
        fontSize: 12,
        color: '#25AE7A',
        position: 'absolute',
        right: 2,
        top: 17,

    },
    swapButton: {
        padding: 14,
        borderRadius: 50,
        marginHorizontal: 8,
        borderWidth: 2,
        position: 'absolute',
        zIndex: 1,
        top: '70%',
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
