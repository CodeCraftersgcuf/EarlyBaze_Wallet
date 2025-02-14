import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useThemeColor } from '@/hooks/useThemeColor';
import Header from '@/components/Header';
import PrimaryButton from '@/components/Buy/PrimaryButton';
import icons from '@/constants/icons';
import { router, useRouter } from 'expo-router';

const PaymentProof: React.FC = () => {
  const { push } = useRouter();
  const backgroundColor = useThemeColor({ light: '#EFFEF9', dark: '#000000' }, 'background');
  const cardBackgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1A1A1A' }, 'card');
  const textColor = useThemeColor({ light: '#000000', dark: '#FFFFFF' }, 'text');
  const placeholderColor = useThemeColor({ light: '#A0A0A0', dark: '#CCCCCC' }, 'placeholder');

  const upload= useThemeColor({ light: icons.upload, dark: icons.upload_black }, 'background');

  const [receipt, setReceipt] = useState<string | null>(null);

  const handleUploadPress = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'You need to allow access to your media library.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setReceipt(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={[styles.container, { backgroundColor }]}>
        {/* Header */}
        <Header title="Payment Proof" />

        {/* Form Section */}
        <View style={[styles.formContainer]}>
          {/* Name on Account */}
          <Text style={[styles.label, { color: textColor }]}>Name on Account</Text>
          <TextInput
            style={[styles.input, { color: textColor, backgroundColor: cardBackgroundColor }]}
            placeholder="Type full account name"
            placeholderTextColor={placeholderColor}
          />

          {/* Amount Paid */}
          <Text style={[styles.label, { color: textColor }]}>Amount Paid</Text>
          <TextInput
            style={[styles.input, { color: textColor, backgroundColor: cardBackgroundColor }]}
            placeholder="Amount Paid"
            keyboardType="numeric"
            placeholderTextColor={placeholderColor}
          />

          {/* Payment Receipt */}
          <Text style={[styles.label, { color: textColor }]}>Payment Receipt</Text>
          <TouchableOpacity style={styles.uploadContainer} onPress={handleUploadPress}>
            {receipt ? (
              <Image source={{ uri: receipt }} style={styles.uploadedImage} />
            ) : (
              <>
                <Image source={upload} style={styles.uploadIcon} />
                <Text style={styles.uploadText}>Upload Receipt</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Submit Button */}
        <View style={styles.buttonContainer}>
          <PrimaryButton title="Proceed" onPress={() => router.push('/TransactionPage')} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 8,
    paddingBottom: 20,
    marginTop: 25,
  },
  formContainer: {
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 45,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  uploadContainer: {
    height: 120,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#22A45D',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  uploadIcon: {
    width: 24,
    height: 24,
    marginBottom: 5,
  },
  uploadText: {
    fontSize: 14,
    color: '#808080',
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
  },
});

export default PaymentProof;
