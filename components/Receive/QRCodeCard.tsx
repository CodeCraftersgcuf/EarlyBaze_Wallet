import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, ToastAndroid, Platform, Alert } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons';
import { images } from '@/constants';

interface QRCodeCardProps {
    cardBackgroundColor: string;
    selectedTab: 'Crypto Address' | 'Email Address';
}

const QRCodeCard: React.FC<QRCodeCardProps> = ({ cardBackgroundColor, selectedTab }) => {
    const cryptoAddress = "0xednfvdnkdwj43rnggnfner43itjfkmfltr...";
    const randomEmails = [
        "example1@email.com",
        "user.test@mail.com",
        "crypto.receiver@domain.com",
        "sampleaddress@wallet.com",
    ];
    const randomEmail = randomEmails[Math.floor(Math.random() * randomEmails.length)];

    const handleSaveImage = async () => {
        try {
            // Request permission for storage
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Required', 'Please grant storage permissions to save the image.');
                return;
            }

            // Save the image to a file
            const fileUri = FileSystem.cacheDirectory + 'qrcode.png';
            const imageBase64 = await FileSystem.readAsStringAsync(images.qrcode, { encoding: FileSystem.EncodingType.Base64 });
            await FileSystem.writeAsStringAsync(fileUri, imageBase64, { encoding: FileSystem.EncodingType.Base64 });

            // Save the file to gallery
            const asset = await MediaLibrary.createAssetAsync(fileUri);
            await MediaLibrary.createAlbumAsync('QR Codes', asset, false);

            // Show success toast message
            if (Platform.OS === 'android') {
                ToastAndroid.show('The image has been saved to your gallery', ToastAndroid.SHORT);
            } else {
                Alert.alert('Saved', 'The image has been saved to your gallery');
            }
        } catch (error) {
            console.error('Error saving image:', error);
            Alert.alert('Error', 'Failed to save image. Please try again.');
        }
    };

    return (
        <View style={[styles.qrContainer, { backgroundColor: cardBackgroundColor }]}>
            <Image source={images.qrcode} style={styles.qrCode} />
            <View style={styles.iconRow}>
                <TouchableOpacity style={styles.iconButton} onPress={handleSaveImage}>
                    <View style={styles.iconBackground}>
                        <Ionicons name="save-outline" size={28} color="black" />
                    </View>
                    <Text style={styles.iconText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                    <View style={styles.iconBackground}>
                        <Ionicons name="share-social-outline" size={28} color="black" />
                    </View>
                    <Text style={styles.iconText}>Share</Text>
                </TouchableOpacity>
            </View>

            <View style={[styles.inputContainer, { backgroundColor: selectedTab === 'Crypto Address' ? '#25AE7A' : '#25AE7A' }]}>
                <Text style={styles.cryptoAddress}>
                    {selectedTab === 'Crypto Address' ? cryptoAddress : randomEmail}
                </Text>
                <TouchableOpacity>
                    <Ionicons name="copy-outline" size={20} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    qrContainer: {
        alignItems: 'center',
        paddingVertical: 20,
        borderRadius: 10,
        marginBottom: 10,
        marginHorizontal: 16,
    },
    qrCode: {
        width: 150,
        height: 150,
        marginBottom: 15,
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 30,
        marginBottom: 10,
    },
    iconButton: {
        alignItems: 'center',
    },
    iconBackground: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#E6E6E6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconText: {
        fontSize: 14,
        color: 'black',
        marginTop: 5,
        fontWeight: '500',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 10,
        justifyContent: 'space-between',
        marginTop: 20,
        marginHorizontal: 10,
    },
    cryptoAddress: {
        color: 'white',
        fontSize: 14,
        flex: 1,
    },
});

export default QRCodeCard;
