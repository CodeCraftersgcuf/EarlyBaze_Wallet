import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { images } from '@/constants';

interface ProfileAvatarProps {
  onEditPress: () => void;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ onEditPress }) => {
  return (
    <View style={styles.avatarContainer}>
      {/* Gradient Background */}
      <LinearGradient colors={['#25AE7A', '#1E8753']} style={styles.gradientBackground}>
        <Image source={images.profile} style={styles.avatar} />
      </LinearGradient>

      {/* Edit Icon */}
      <TouchableOpacity style={styles.editIcon} onPress={onEditPress}>
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
    bottom: 5,
    right: 5,
    backgroundColor: '#1E8753', // Darker green for contrast
    borderRadius: 14,
    padding: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProfileAvatar;
