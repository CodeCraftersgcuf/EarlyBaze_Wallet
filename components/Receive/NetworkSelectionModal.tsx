// components/Receive/NetworkSelectionModal.tsx
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Modal,
    FlatList
} from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { images } from '@/constants';


//Code related to the integration:
import { useQuery } from '@tanstack/react-query';
import { getFromStorage } from '@/utils/storage';
import { getWalletCurrency, getNetworkCurreny } from '@/utils/queries/appQueries';
import LoadingIndicator from "@/components/LoadingIndicator";


// Define network type
interface NetworkOption {
    id: string;
    name: string;
    icon: any;
    color: string;

}

interface NetworkSelectionModalProps {
    visible: boolean;
    onClose: () => void;
    onSelectNetwork: (network: NetworkOption) => void;
    selectedNetwork: NetworkOption;
    networks: NetworkOption[];
    modelType: string | null;
    coinId?: string;
}

const NetworkSelectionModal: React.FC<NetworkSelectionModalProps> = ({
    visible,
    onClose,
    onSelectNetwork,
    selectedNetwork,
    networks,
    modelType,
    coinId
}) => {
    const [token, setToken] = useState<string | null>(null); // State to hold the token
    const backgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#000000' }, 'background');
    const textColor = useThemeColor({ light: '#004d00', dark: '#F6FBFF' }, 'text');
    const borderColor = useThemeColor({ light: '#DCDCDC', dark: '#1F1F1F' }, 'border');
    const itemBackgroundColor = useThemeColor({ light: '#F6FBFF', dark: '#181818' }, 'background');
    const titleTextColor = useThemeColor({ light: '#25AE7A', dark: '#25AE7A' }, 'text');
    const close = useThemeColor({ light: images.cross_white, dark: images.cross_black }, 'close');


    // Fetch the token when the component mounts
    useEffect(() => {
        const fetchUserData = async () => {
            const fetchedToken = await getFromStorage("authToken");
            setToken(fetchedToken);
            console.log("🔹 Retrieved Token:", fetchedToken);
        };

        fetchUserData();
    }, []);

    const { data: walletCurrency, error: walletCurrencyError, isLoading: walletCurrencyLoading } = useQuery(
        {
            queryKey: ["walletCurrency"],
            queryFn: () => getWalletCurrency({ token }),
            enabled: !!token && modelType === "coin", // Only run the query when token is available and modelType is "coin"
        }
    );

    console.log("🔹 Wallet Currencyss:", walletCurrency);


    const { data: networkCurrency, error: networkCurrencyError, isLoading: networkCurrencyLoading } = useQuery(
        {
            queryKey: ["networkCurrency", coinId], // Include coinId in queryKey
            queryFn: () => getNetworkCurreny(token as string, coinId), // Ensure token is a string
            enabled: !!token && !!coinId && modelType === "network", // Ensure coinId is selected
        }
    );


    console.log("🔹 Network Currencyss:", networkCurrency);

    console.log("The Model Type is:", modelType);
    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.modalContainer}>
                <View style={[styles.modalContent, { backgroundColor, borderColor }]}>
                    {/* Modal Header */}
                    <View style={styles.header}>
                        <Text style={[styles.title, { color: titleTextColor }]}>Select Network</Text>
                        <TouchableOpacity onPress={onClose} style={[styles.closeButton, { backgroundColor }]}>
                            <Image source={close} style={styles.closeIcon} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.horizontalLine} />

                    {/* Network Options */}
                    {walletCurrencyLoading || networkCurrencyLoading ? (
                        <LoadingIndicator /> // ✅ Show loading indicator while fetching data
                    ) : (
                        <FlatList
                            data={
                                modelType === "coin" && walletCurrency?.data
                                    ? walletCurrency.data.map((item) => ({
                                        id: item.currency.id.toString(),
                                        name: item.currency.currency,
                                        icon: { uri: `https://earlybaze.hmstech.xyz/storage/${item.currency.symbol}` },
                                        color: "#DCDCDC", // Default color
                                    }))
                                    : modelType === "network" && networkCurrency?.data
                                        ? networkCurrency.data.map((item) => ({
                                            id: item.id.toString(),
                                            name: item.network,
                                            icon: { uri: `https://earlybaze.hmstech.xyz/storage/${item.symbol}` },
                                            color: "#DCDCDC", // Default color
                                        }))
                                        : networks
                            }
                            keyExtractor={(item) => item.id}
                            numColumns={3}
                            contentContainerStyle={styles.networkList}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[
                                        styles.networkItem,
                                        selectedNetwork.id === item.id && styles.selectedNetwork,
                                        { backgroundColor: itemBackgroundColor },
                                    ]}
                                    onPress={() => onSelectNetwork(item)} // Update network on tap
                                >
                                    <View style={[styles.networkIconContainer, { backgroundColor: item.color }]}>
                                        <Image source={item.icon} style={styles.networkIcon} />
                                    </View>
                                    <Text style={[styles.networkText, { color: textColor }]}>{item.name}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    )}


                </View>
            </View>
        </Modal>

    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    horizontalLine: {
        marginBottom: 19,
        marginTop: 5,
        width: '100%',
        height: 1,
        backgroundColor: '#0F714D',
    },
    modalContent: {
        width: '94%',
        borderRadius: 20,
        paddingVertical: 20,
        borderWidth: 1,
    },
    closeButton: {
        padding: 5,
        borderRadius: 25,
        borderWidth: 1,
    },
    closeIcon: {
        width: 20,
        height: 20,
    },
    networkList: {
        justifyContent: 'center',
    },
    networkItem: {
        width: '29%',
        alignItems: 'center',
        margin: 8,
        paddingVertical: 15,
        borderRadius: 15,
    },
    selectedNetwork: {
        borderWidth: 2,
        borderColor: '#004d00',
    },
    networkIconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5,
    },
    networkIcon: {
        width: 30,
        height: 30,
    },
    networkText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default NetworkSelectionModal;
