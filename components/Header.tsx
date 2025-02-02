import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { images } from '@/constants';
import { ThemedText } from './ThemedText';

interface HeaderProps {
  title?: string;
  onBackPress?: () => void;
  onFilterPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onBackPress, onFilterPress }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      {/* Back Button */}
      <TouchableOpacity style={styles.iconButton} onPress={onBackPress || (() => navigation.goBack())}>
        <Image source={images.back_icon} style={styles.icon} />
      </TouchableOpacity>

      {/* Show Title if passed */}
      {title && <ThemedText style={styles.headerTitle}>{title}</ThemedText>}

      {/* Show Filter Button only if onFilterPress exists */}
      {title && onFilterPress && (
        <TouchableOpacity style={styles.iconButton} onPress={onFilterPress}>
          <Image source={images.filter_icon} style={styles.icon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 18,
    // marginTop: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1, // Ensures proper alignment of title
    textAlign: 'center',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});

export default Header;
