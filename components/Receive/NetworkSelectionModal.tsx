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
import { images } from '@/constants';
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
    const titleTextColor = useThemeColor({ light: '#25AE7A', dark: '#25AE7A' }, 'text');
    const close = useThemeColor({ light: images.cross_white, dark: images.cross_black }, 'close');

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.modalContainer}>
                <View style={[styles.modalContent, { backgroundColor, borderColor }]}>
                    {/* Modal Header */}
                    <View style={styles.header}>
                        <Text style={[styles.title, { color: titleTextColor }]}>Select Network</Text>
                        <TouchableOpacity onPress={onClose} style={[styles.closeButton, { backgroundColor: backgroundColor }]}>
                            <Image source={close} style={styles.closeIcon} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.horizontalLine} />

                    {/* Network Options */}
                    <View style={styles.modalHeader}>                  
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
