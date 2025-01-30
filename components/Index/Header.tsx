import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeColor } from '@/hooks/useThemeColor'; // Assuming you have this hook for theming
import { images } from '@/constants';

export type HeaderProps = {
  username: string;
  greeting: string;
};

export function Header({ username, greeting }: HeaderProps) {
  const backgroundColor = useThemeColor(
    { light: '#EFFEF9', dark: '#000000' }, // Light mode and dark mode colors
    'background'
  );

  return (
    <SafeAreaView>
      <ThemedView style={styles.headerContainer}>
        <View style={{ padding: 8 }}>
          <ThemedText style={styles.title} type="title">{`Hi, ${username}`}</ThemedText>
          <ThemedText type="subtitle">{greeting} 👋</ThemedText>
        </View>
        <View style={styles.iconsContainer}>
          {/* Replace FontAwesome icons with images */}
          <Image source={images.scan} style={styles.icon} />
          <Image source={images.notification} style={styles.icon} />
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
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2, // For Android shadow
  },
});
