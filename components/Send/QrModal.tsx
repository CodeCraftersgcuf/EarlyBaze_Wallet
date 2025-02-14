import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
// import { BarCodeScanner } from 'expo-barcode-scanner';
import * as ImagePicker from 'expo-image-picker';

interface QrModalProps {
    isVisible: boolean;
    onClose: () => void;
}

const QrModal: React.FC<QrModalProps> = ({ isVisible, onClose }) => {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [scanned, setScanned] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // useEffect(() => {
    //     (async () => {
    //         const { status } = await BarCodeScanner.requestPermissionsAsync();
    //         setHasPermission(status === 'granted');
    //     })();
    // }, []);

    // Debugging - Log Camera Permission Status
    useEffect(() => {
        if (hasPermission !== null) {
            console.log('Barcode Scanner permission:', hasPermission ? 'granted' : 'denied');
        }
    }, [hasPermission]);

    const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
        setScanned(true);
        alert(`QR Code scanned: ${data}`);
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    // // Handle case when permissions are null or denied
    // if (hasPermission === null) {
    //     return <Text>Requesting camera permission...</Text>;
    // }
    // if (hasPermission === false) {
    //     return <Text>No access to camera</Text>;
    // }

    return (
        <Modal visible={isVisible} animationType="slide" transparent>
            <View style={styles.scannerContainer}>
                <Text style={styles.scannerText}>Scan the QR Code or Choose an Image</Text>
{/* 
                {selectedImage ? (
                    <Image source={{ uri: selectedImage }} style={styles.qrScanner} />
                ) : (
                    // <BarCodeScanner
                    //     style={styles.qrScanner}
                    //     onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    // />
                )} */}

                {scanned && (
                    <TouchableOpacity onPress={() => setScanned(false)} style={styles.scanAgainButton}>
                        <Text style={styles.scanAgainText}>Scan Again</Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity onPress={pickImage} style={styles.chooseImageButton}>
                    <Text style={styles.chooseImageText}>Choose Image</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={onClose} style={styles.closeScannerButton}>
                    <Text style={styles.closeScannerText}>Close Scanner</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    scannerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    scannerText: {
        color: '#FFFFFF',
        fontSize: 16,
        marginBottom: 10,
    },
    closeScannerButton: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 8,
        marginTop: 20,
    },
    closeScannerText: {
        fontSize: 14,
        color: '#000',
    },
    qrScanner: {
        width: 250,
        height: 250,
        borderRadius: 10,
    },
    chooseImageButton: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 8,
        marginTop: 20,
    },
    chooseImageText: {
        fontSize: 14,
        color: '#FFFFFF',
    },
    scanAgainButton: {
        backgroundColor: '#FF9500',
        padding: 10,
        borderRadius: 8,
        marginTop: 20,
    },
    scanAgainText: {
        fontSize: 14,
        color: '#FFFFFF',
    },
});

export default QrModal;
