import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Modal,
    FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';

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
}

const NetworkSelectionModal: React.FC<NetworkSelectionModalProps> = ({
    visible,
    onClose,
    onSelectNetwork,
    selectedNetwork,
    networks
}) => {
    // ✅ FIX: Move useThemeColor() calls to the top level of the component
    const backgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#000000' }, 'background');
    const textColor = useThemeColor({ light: '#004d00', dark: '#F6FBFF' }, 'text');
    const borderColor = useThemeColor({ light: '#DCDCDC', dark: '#1F1F1F' }, 'border');
    const itemBackgroundColor = useThemeColor({ light: '#F6FBFF', dark: '#181818' }, 'background');

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.modalContainer}>
                <View style={[styles.modalContent, { backgroundColor, borderColor }]}>
                    {/* Modal Header */}
                    <View style={styles.modalHeader}>
                        <Text style={[styles.modalTitle, { color: textColor }]}>Select Network</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name="close" size={28} color={textColor} />
                        </TouchableOpacity>
                    </View>

                    {/* Network Options */}
                    <FlatList
                        data={networks}
                        keyExtractor={(item) => item.id}
                        numColumns={3}
                        contentContainerStyle={styles.networkList}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={[
                                    styles.networkItem,
                                    selectedNetwork.id === item.id && styles.selectedNetwork,
                                    { backgroundColor: itemBackgroundColor }
                                ]}
                                onPress={() => onSelectNetwork(item)}
                            >
                                <View style={[styles.networkIconContainer, { backgroundColor: item.color }]}>
                                    <Image source={item.icon} style={styles.networkIcon} />
                                </View>
                                <Text style={[styles.networkText, { color: textColor }]}>
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
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
    modalContent: {
        width: '90%',
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderWidth: 1,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    networkList: {
        // alignItems: 'center',
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
