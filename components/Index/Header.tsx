import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeColor } from '@/hooks/useThemeColor'; // Assuming you have this hook for theming
import { images } from '@/constants';
import { useRouter, router } from 'expo-router';
export type HeaderProps = {
  username: string;
  greeting: string;
};

export function Header({ username, greeting }: HeaderProps) {
  const backgroundColor = useThemeColor(
    { light: '#EFFEF9', dark: '#000000' }, // Light mode and dark mode colors
    'background'
  );

  // Function to handle icon press
  const handleIconPress = (iconName: string) => {
    router.push('/Notification');
    console.log(`${iconName} icon clicked`);
  };

  return (
    <SafeAreaView>
      <ThemedView style={styles.headerContainer}>
        <View style={{ padding: 8 }}>
          <ThemedText style={styles.title} type="title">{`Hi, ${username}`}</ThemedText>
          <ThemedText type="subtitle">{greeting} 👋</ThemedText>
        </View>
        <View style={styles.iconsContainer}>
          {/* Replace FontAwesome icons with images and make them clickable */}
          <TouchableOpacity onPress={() => handleIconPress('Scan')}>
            <Image source={images.scan} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleIconPress('Notification')}>
            <Image source={images.notification} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    color: '#0B3558',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'backgroundColor', // Adjust based on your theme
  },
  iconsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  icon: {
    width: 24,  // Adjust icon size based on the image size
    height: 24, // Adjust icon size based on the image size
    borderRadius: 16,
  },
});
