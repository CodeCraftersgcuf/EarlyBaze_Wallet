import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

interface NotificationItemProps {
  title: string;
  message: string;
  timestamp: string;
  isUnread?: boolean;
  imageUrl?: any;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ title, message, timestamp, isUnread, imageUrl }) => {
  const cardBackgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1A1A1A' }, 'card');
  const textColor = useThemeColor({ light: '#222222', dark: '#FFFFFF' }, 'text');
  const secondaryTextColor = useThemeColor({ light: '#777777', dark: '#AAAAAA' }, 'secondaryText');
  const backgroundColor = useThemeColor({ light: '#EFFEF9', dark: '#000000' }, 'background');

  return (
    <View style={[styles.wrapper, { backgroundColor }]}>
      {/* Title & Timestamp */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          {isUnread && <View style={styles.unreadDot} />}
          <Text style={[styles.title, { color: textColor }]}>{title}</Text>
        </View>
        <Text style={[styles.timestamp, { color: secondaryTextColor }]}>{timestamp}</Text>
      </View>

      {/* Content Row (Text + Image) */}
      <View style={[styles.container, { backgroundColor: cardBackgroundColor }]}>
        <View style={styles.textContainer}>
          <Text style={[styles.message, { color: textColor }]}>{message}</Text>
        </View>
        {imageUrl && <Image source={imageUrl} style={styles.image} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    marginRight: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  timestamp: {
    fontSize: 10,
  },
  container: {
    padding: 12,
    borderRadius: 10,
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1, // Ensures text takes available space
  },
  message: {
    fontSize: 12,
  },
  image: {
    width: 100, // Adjusted for better fit
    height: 100,
    borderRadius: 8,
    marginLeft: 10,
  },
});

export default NotificationItem;
