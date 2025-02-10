import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

interface SupportOptionProps {
  title: string;
  image: any;
  onPress: () => void;
  notificationCount?: number;
}

const SupportOption: React.FC<SupportOptionProps> = ({ title, image, onPress, notificationCount }) => {
  const cardBackgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1A1A1A' }, 'card');
  const textColor = useThemeColor({ light: '#222222', dark: '#FFFFFF' }, 'text');

  return (
    <TouchableOpacity style={[styles.container, { backgroundColor: cardBackgroundColor }]} onPress={onPress}>
      {notificationCount && (
        <View style={styles.notificationBadge}>
          <Text style={styles.badgeText}>{notificationCount}</Text>
        </View>
      )}
      <Image source={image} style={styles.icon} />
      <Text style={[styles.title, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '30%',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    elevation: 2,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 5,
    right: 15,
    backgroundColor: 'red',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default SupportOption;
