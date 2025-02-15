import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Modal, Alert, Image } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import ChangePasswordModal from '@/components/Setting/Profile/ChangePasswordModal';
import * as ImagePicker from 'expo-image-picker';

interface ProfileInputFieldProps {
  label: string;
  value: string;
  onChangeText?: (text: string) => void;
  isEditable?: boolean;
  showChangeButton?: boolean;
  onChangePress?: () => void;
  showImagePicker?: boolean; // New prop to show image picker
}

const ProfileInputField: React.FC<ProfileInputFieldProps> = ({
  label,
  value,
  onChangeText,
  isEditable = true,
  showChangeButton = false,
  showImagePicker = false,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const cardBackgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1A1A1A' }, 'card');
  const textColor = useThemeColor({ light: '#222222', dark: '#FFFFFF' }, 'text');

  // Image Picker function
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission Required', 'Permission to access media library is required!');
      return;
    }

    const resultStatus = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Aspect ratio for the image
      quality: 1, // Maximum quality
    });

    if (!resultStatus.canceled) {
      setSelectedImage(resultStatus.assets[0].uri); // Set the picked image URI
    }
  };

  return (
    <View>
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
      <View style={[styles.inputContainer, { backgroundColor: cardBackgroundColor }]}>
        {showImagePicker && (
          <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
            <Image
              source={{ uri: selectedImage || value }} // Display selected image or value (fallback)
              style={styles.image}
            />
          </TouchableOpacity>
        )}
        <TextInput
          style={[styles.input, { color: textColor }]}
          value={value}
          onChangeText={onChangeText}
          editable={isEditable}
          placeholderTextColor="#A1A1A1"
        />
        {showChangeButton && (
          <TouchableOpacity style={styles.changeButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.changeText}>Change</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Password Change Modal */}
      <ChangePasswordModal visible={isModalVisible} onClose={() => setModalVisible(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    fontSize: 14,
  },
  changeButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 5,
    backgroundColor: '#E5E5E5',
  },
  changeText: {
    fontSize: 12,
    color: '#007AFF',
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
});

export default ProfileInputField;
