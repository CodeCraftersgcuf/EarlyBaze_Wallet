import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

interface SettingsOptionProps {
  title: string;
  image: any;
  onPress: () => void;
}

const SettingsOption: React.FC<SettingsOptionProps> = ({ title, image, onPress }) => {
  // Theme colors for light & dark mode
  const backgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1E1E1E' }, 'background');
  const textColor = useThemeColor({ light: '#004D40', dark: '#FFFFFF' }, 'text');
  const iconContainerColor = useThemeColor({ light: '#F6F8FA', dark: '#333333' }, 'iconBackground');
  const shadowColor = useThemeColor({ light: '#000', dark: '#000000' }, 'shadow');

  return (
    <TouchableOpacity style={[styles.container, { backgroundColor, shadowColor }]} onPress={onPress}>
      <View style={[styles.iconContainer, { backgroundColor: iconContainerColor }]}>
        <Image source={image} style={styles.icon} />
      </View>
      <Text style={[styles.title, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '31%', // Two columns layout
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default SettingsOption;
