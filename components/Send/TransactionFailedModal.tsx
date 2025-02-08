import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    StyleSheet,
    Image
} from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import PrimaryButton from '@/components/Buy/PrimaryButton';
import { Ionicons } from '@expo/vector-icons';
import { images } from '@/constants';
interface TransactionFailedModalProps {
    visible: boolean;
    onClose: () => void;
}

const TransactionFailedModal: React.FC<TransactionFailedModalProps> = ({ visible, onClose }) => {
    const cardBackgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1A1A1A' }, 'card');
    const textColor = useThemeColor({ light: '#222222', dark: '#FFFFFF' }, 'text');
    const titleColor = useThemeColor({ light: '#D32F2F', dark: '#FF6B6B' }, 'title');
    const buttonColor = useThemeColor({ light: '#25AE7A', dark: '#22A45D' }, 'button');

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.overlay}>
                <View style={[styles.modalContainer, { backgroundColor: cardBackgroundColor }]}>
                    {/* Close Button */}
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Ionicons name="close-circle-outline" size={30} color={textColor} />
                    </TouchableOpacity>

                    {/* Failed Icon */}
                    <Image source={images.failed} style={styles.failedIcon} />

                    {/* Title */}
                    <Text style={[styles.title, { color: titleColor }]}>Transaction Failed</Text>

                    {/* Description */}
                    <Text style={[styles.description, { color: textColor }]}>
                        Your transaction could not be completed due to insufficient gas fee
                    </Text>

                    {/* Proceed Button */}
                    <PrimaryButton title="Proceed" onPress={onClose} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '90%',
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 15,
        right: 15,
    },
    failedIcon: {
        width: 80,
        height: 80,
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 20,
    },
});

export default TransactionFailedModal;
