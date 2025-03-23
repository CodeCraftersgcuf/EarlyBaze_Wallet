import React, { useState, useEffect, useRef } from 'react';
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


//Code realted to the integration:

import { useMutation } from '@tanstack/react-query';
import { calculateExchangeRate } from "@/utils/mutations/accountMutations";
import { getFromStorage } from "@/utils/storage";



const SendCryptoForm: React.FC<{
    selectedTab: 'Crypto Address' | 'Internal Transfer';
    setSelectedTab: React.Dispatch<React.SetStateAction<'Crypto Address' | 'Internal Transfer'>>;
    selectedCoin: any;
    setSelectedCoin: React.Dispatch<React.SetStateAction<any>>;
    selectedNetwork: any;
    setSelectedNetwork: React.Dispatch<React.SetStateAction<any>>;
    usdAmount: string;
    setUsdAmount: React.Dispatch<React.SetStateAction<string>>;
    scannedAddress: string;
    setScannedAddress: React.Dispatch<React.SetStateAction<string>>;
    assetData: { assestId: string, icon: string, assetName: string };
}> = ({
    selectedTab,
    setSelectedTab,
    selectedCoin,
    setSelectedCoin,
    selectedNetwork,
    setSelectedNetwork,
    usdAmount,
    setUsdAmount,
    scannedAddress,
    setScannedAddress,
    assetData
}) => {
        const [token, setToken] = useState<string | null>(null);
        const cardBackgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1A1A1A' }, 'card');
        const textColor = useThemeColor({ light: '#222222', dark: '#FFFFFF' }, 'text');
        const borderColor = useThemeColor({ light: '#E5E5E5', dark: '#333333' }, 'border');

        const { assestId, icon, assetName } = assetData;  // Access individual properties
        console.log("The Final data receving: ", assetName, assestId, icon);

        const [convertedAmount, setConvertedAmount] = useState("0.00");
        const convertedAmountRef = useRef("0.00");
        const ngnAmountRef = useRef("0.00");


        const [isScannerOpen, setIsScannerOpen] = useState(false);
        const [modalType, setModalType] = useState<string | null>(null);
        const [modalVisible, setModalVisible] = useState(false);

        const scan = useThemeColor({ light: images.scan, dark: images.scan_black }, 'scan');
        const didMountRef = useRef(false); // ⬅️ Add this at the top of your component

        // Ensure selectedCoin and selectedNetwork are never null
        const coinId = selectedCoin?.id?.toString() || assestId || undefined;

        const handleSelectNetwork = (network: any) => {
            if (modalType === "coin") {
                setSelectedCoin(network);
            } else if (modalType === "network") {
                setSelectedNetwork(network);
            }
            setModalVisible(false);
        };

        // Fetch the token and user data when the component mounts
        useEffect(() => {
            const fetchUserData = async () => {
                const fetchedToken = await getFromStorage("authToken");
                setToken(fetchedToken);
                console.log("🔹 Retrieved Token:", fetchedToken);
            };

            fetchUserData();
        }, []);

        const { mutate: getExchangeRate } = useMutation({
            mutationFn: ({
                data,
                token,
            }: {
                data: { currency: string; amount: string };
                token: string;
            }) => calculateExchangeRate({ data, token }),

            onSuccess: (response: { data: { amount_usd: string | null; amount_naira: string | null }; message: string; status: string }) => {
                console.log("✅ Exchange Rate Fetched:", response);

                // Safely destructure and provide fallback values in case of undefined or null
                const { amount_usd, amount_naira } = response.data;

                // Default to "0.00" if either value is undefined or null
                const usdAmount = amount_usd ?? "0.00";
                const ngnAmount = amount_naira ?? "0.00";

                console.log("The data", ngnAmount);

                // ✅ Store exchange rate values in refs to persist them
                convertedAmountRef.current = usdAmount;
                ngnAmountRef.current = ngnAmount;

                // ✅ Update state only if values have changed
                setConvertedAmount(usdAmount);
            },

            onError: (error: any) => {
                console.error('❌ Error fetching exchange rate:', error);
            },
        });

        const openModal = (type: string) => {
            setModalType(type);
            setModalVisible(true);
        };
        useEffect(() => {
            if (assetName && assestId && icon) {
                setSelectedCoin({
                    id: assestId,
                    name: assetName,
                    icon: icon,
                });
                setModalType("coin");
                setModalVisible(true);
            }
        }, [assetName, assestId, icon]);
        
        useEffect(() => {
            if (didMountRef.current) {
                if (token && selectedCoin?.name && usdAmount) {
                    getExchangeRate({
                        data: {
                            currency: selectedCoin.name.toLowerCase(),
                            amount: usdAmount
                        },
                        token: token
                    });
                }
            } else {
                didMountRef.current = true; // ⬅️ Mark as mounted after first render
            }
        }, [usdAmount, selectedCoin, token]);
        return (
            <View style={styles.container}>
                <TabSwitcher selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

                {/* Main Card Container */}
                <View style={[styles.mainContainer, { backgroundColor: cardBackgroundColor, borderColor }]}>
                    {/* ✅ Input Address Field */}
                    <View style={[styles.inputContainer, { borderColor }]}>
                        <TextInput
                            placeholder={selectedTab === "Internal Transfer" ? "Enter Email" : "Input Address"}
                            placeholderTextColor="#A1A1A1"
                            style={[styles.inputField, { color: textColor }]}
                            value={scannedAddress}
                            onChangeText={setScannedAddress}
                        />
                        <TouchableOpacity onPress={() => setIsScannerOpen(true)}>
                            <Image source={scan} style={styles.scanIcon} />
                        </TouchableOpacity>
                    </View>

                    {/* ✅ Amount and Currency Selection */}
                    <View style={styles.exchangeContainer}>
                        <InputField label={selectedCoin?.name} value={usdAmount} onChange={setUsdAmount} />
                        <SelectionBox
                            label="Coin"
                            id={selectedCoin?.id || assestId}
                            value={selectedCoin?.name || assetName}
                            icon={selectedCoin?.icon || icon}
                        // onPress={() => {
                        //     openModal("coin");
                        // }}
                        />

                    </View>

                    {/* ✅ Network Selection */}
                    <View style={styles.selectionContainer}>
                        <InputField
                            label="USD"
                            value={convertedAmount}
                            onChange={() => { }}
                            editable={false} // ✅ Make it disabled
                        />                        <SelectionBox
                            label="Network"
                            id={selectedNetwork.id}
                            value={selectedNetwork.name || "Select Network"}
                            icon={selectedNetwork?.icon || images.solana}
                            onPress={coinId ? () => openModal("network") : undefined}
                            disabled={!coinId}
                            style={!coinId ? { opacity: 0.5 } : undefined}
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
                        modelType={modalType}
                        coinId={selectedCoin?.id || assestId}
                        assetName={assetName}
                    />
                )}

                {/* ✅ QR Scanner Modal */}
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
        paddingHorizontal: 16,
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
        fontSize: 14,
        flex: 1,
    },
    scanIcon: {
        width: 20,
        height: 20,
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
        gap: 8,
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
