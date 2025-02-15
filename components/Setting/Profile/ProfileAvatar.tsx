import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker'; // Import ImagePicker from Expo
import { images } from '@/constants';

interface ProfileAvatarProps {
  onEditPress: () => void;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ onEditPress }) => {
  const [avatarUri, setAvatarUri] = useState<string | null>(null); // State to hold the image URI

  const pickImage = async () => {
    // Request permission to access media library (gallery)
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permission required', 'You need to grant access to the media library.');
      return;
    }

    // Open the media library and allow the user to pick an image
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Only allow images
      allowsEditing: true, // Optionally allow cropping/editing the image
      aspect: [1, 1], // Keep the aspect ratio square for the avatar
      quality: 1, // Full quality image
    });

    if (!result.canceled) { // Check if the user picked an image
      setAvatarUri(result.assets[0].uri); // Set the selected image URI to the state
    }
  };

  return (
    <View style={styles.avatarContainer}>
      {/* Gradient Background */}
      <LinearGradient colors={['#25AE7A', '#1E8753']} style={styles.gradientBackground}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={avatarUri ? { uri: avatarUri } : images.profile} // If avatarUri is set, use the selected image; else, use the default profile image
            style={styles.avatar}
          />
        </TouchableOpacity>
      </LinearGradient>

      {/* Edit Icon */}
      <TouchableOpacity style={styles.editIcon} onPress={pickImage}>
        <Ionicons name="pencil" size={16} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 15,
    position: 'relative',
  },
  gradientBackground: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2, // Ensures the image sits well within the gradient
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  editIcon: {
    position: 'absolute',
    bottom: -8,
    right: '40%',
    backgroundColor: '#1E8753', // Darker green for contrast
    borderRadius: 14,
    padding: 1,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProfileAvatar;
