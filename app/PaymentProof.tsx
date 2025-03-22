import React, { useState, useEffect } from 'react';
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

// Import related to the integration
import { paymentProof } from '@/utils/mutations/accountMutations';
import { useMutation } from '@tanstack/react-query';
import Toast from "react-native-toast-message"; // ✅ Import Toast
import { getFromStorage } from "@/utils/storage";
import { useLocalSearchParams } from 'expo-router';

const PaymentProof: React.FC = () => {
  const { id, transaction_id } = useLocalSearchParams(); // Ensure id is retrieved correctly
  const backgroundColor = useThemeColor({ light: '#EFFEF9', dark: '#000000' }, 'background');
  const cardBackgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1A1A1A' }, 'card');
  const textColor = useThemeColor({ light: '#000000', dark: '#FFFFFF' }, 'text');
  const placeholderColor = useThemeColor({ light: '#A0A0A0', dark: '#CCCCCC' }, 'placeholder');

  const [token, setToken] = useState<string | null>(null);
  const [nameOnAccount, setNameOnAccount] = useState('');
  const [amountPaid, setAmountPaid] = useState('');
  const [receipt, setReceipt] = useState<string | null>(null);
  const { push } = useRouter();
  const upload = useThemeColor({ light: icons.upload, dark: icons.upload_black }, 'background');
  const type= "buy";

  console.log("📌 The Id received for the Buy:", id);
  console.log("📌 The Transaction Id received for the Buy:", transaction_id);

  // Fetch authentication token
  useEffect(() => {
    const fetchUserData = async () => {
      const fetchedToken = await getFromStorage("authToken");
      setToken(fetchedToken);
      console.log("🔹 Retrieved Token:", fetchedToken);
    };

    fetchUserData();
  }, []);

  // Image Picker Function
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

  // ✅ Corrected useMutation function signature with timeout before redirecting
  const mutation = useMutation({
    mutationFn: async ({ data, id, token }: { data: FormData; id: string; token: string }) => {
      return paymentProof({ data, id, token });
    },
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'Payment Proof',
        text2: 'Payment proof uploaded successfully',
      });

      // Wait 1 second before redirecting so the toast is visible
      setTimeout(() => {
         router.push(`/TransactionPage?id=${transaction_id}&types=${type}`); // Redirect after success
      }, 1000);
    },
    onError: (error) => {
      console.error("❌ Upload Error:", error);
      Toast.show({
        type: 'error',
        text1: 'Payment Proof',
        text2: 'Payment proof upload failed. Please try again.',
      });
    },
  });


  // Handle Form Submission
  const handleProceed = async () => {
    // Validate required fields
    if (!nameOnAccount.trim()) {
      Toast.show({ type: 'error', text1: 'Payment Proof', text2: 'Please enter your account name.' });
      return;
    }

    if (!amountPaid || isNaN(parseFloat(amountPaid)) || parseFloat(amountPaid) <= 0) {
      Toast.show({ type: 'error', text1: 'Payment Proof', text2: 'Please enter a valid amount paid.' });
      return;
    }

    if (!receipt) {
      Toast.show({ type: 'error', text1: 'Payment Proof', text2: 'Please upload a payment receipt.' });
      return;
    }

    if (!token) {
      Toast.show({ type: 'error', text1: 'Authentication Error', text2: 'User authentication failed. Please log in again.' });
      return;
    }

    if (!id) {
      Toast.show({ type: 'error', text1: 'Payment Proof', text2: 'Transaction ID is missing. Please try again.' });
      return;
    }

    // Prepare FormData
    const formData = new FormData();
    formData.append('name_on_account', nameOnAccount);
    formData.append('amount_paid', amountPaid);
    formData.append('receipt', {
      uri: receipt,
      name: 'payment_receipt.jpg', // Assign a default name
      type: 'image/jpeg', // Ensure correct file type
    });

    console.log('📤 Sending Payment Proof:', formData);

    // Call API mutation
    mutation.mutate({ data: formData, id, token });
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
            value={nameOnAccount}
            onChangeText={setNameOnAccount}
            placeholderTextColor={placeholderColor}

          />

          {/* Amount Paid */}
          <Text style={[styles.label, { color: textColor }]}>Amount Paid</Text>
          <TextInput
            style={[styles.input]}
            placeholder="Amount Paid"
            keyboardType="numeric"
            value={amountPaid}
            onChangeText={setAmountPaid}
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
          <PrimaryButton title={mutation.isPending ? "Uploading..." : "Proceed"} onPress={handleProceed} disabled={mutation.isPending} />
        </View>
      </ScrollView>
      <Toast /> {/* ✅ Add Toast Component to Render */}

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
