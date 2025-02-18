import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeColor } from '@/hooks/useThemeColor'; // Assuming you have this hook for theming
import { images } from '@/constants';
import { useRouter, router } from 'expo-router';
import useLoadFonts from '@/hooks/useLoadFonts';

export type HeaderProps = {
  username: string;
  greeting: string;
};

export function Header({ username, greeting }: HeaderProps) {
  const fontsLoaded = useLoadFonts(); // Load custom fonts

  const backgroundColor = useThemeColor(
    { light: '#FFFFFF', dark: '#0D0D0D' }, // Light mode and dark mode colors
    'background'
  );

  const titleColor = useThemeColor(
    { light: '#0B3558', dark: '#25AE7A' }, // Light mode and dark mode colors
    'text'
  )

  const notification = useThemeColor({
    light: images.notification,
    dark: images.notification_black,
  }, 'notification');

  const scan = useThemeColor({
    light: images.scan,
    dark: images.scan_black
  }, 'scan');

  // Function to handle icon press
  const handleIconPress = (iconName: string) => {
    router.push('/Notification');
    console.log(`${iconName} icon clicked`);
  };

  return (
    <SafeAreaView>
      <ThemedView style={styles.headerContainer}>
        <View style={{ padding: 8 }}>
          <ThemedText style={[styles.title, { color: titleColor, fontFamily: fontsLoaded ? 'Caprasimo-Regular' : undefined }]} type="title">{`Hi, ${username}`}</ThemedText>
          <ThemedText type="subtitle">{greeting} <Image source={images.hand} style={{ width: 30, height: 30 }} /></ThemedText>
        </View>
        <View style={styles.iconsContainer}>
          {/* Replace FontAwesome icons with images and make them clickable */}
          <View style={[styles.iconContainer, { backgroundColor }]}>
            <TouchableOpacity onPress={() => handleIconPress('Scan')}>
              <Image source={scan} style={styles.icon} />
            </TouchableOpacity>
          </View>
          <View style={[styles.iconContainer, { backgroundColor }]}>
            <TouchableOpacity onPress={() => handleIconPress('Notification')}>
              <Image source={notification} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    // color: '#0B3558',
    fontSize: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'backgroundColor', // Adjust based on your theme
  },
  iconContainer: {
    padding: 8,
    borderRadius: 20,
  },
  iconsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  icon: {
    width: 22,  // Adjust icon size based on the image size
    height: 22, // Adjust icon size based on the image size
    borderRadius: 16,
  },
});
