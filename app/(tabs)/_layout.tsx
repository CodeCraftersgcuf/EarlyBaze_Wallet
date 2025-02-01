import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Image, View, StyleSheet, Text } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import icons from '@/constants/icons'; // Import the fixed icons

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: () => <View style={styles.tabBarBackground} />, // Custom background
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: 'transparent', // Ensures transparency
            borderTopWidth: 0,
            elevation: 0,
            height: 67, // Exact height from design
          },
          default: {
            backgroundColor: 'white',
            height: 67, // Consistent height for Android
          },
        }),
        tabBarIcon: ({ color, size, focused }) => {
          let iconSource, label;

          // Assign icons and labels based on route name
          if (route.name === 'index') {
            iconSource = icons.home;
            label = 'Home';
          } else if (route.name === 'assets') {
            iconSource = icons.assests;
            label = 'Assets';
          } else if (route.name === 'transactions') {
            iconSource = icons.tnxs;
            label = 'Tnxs';
          } else if (route.name === 'settings') {
            iconSource = icons.settings;
            label = 'Settings';
          } else if (route.name === 'bills') {
            iconSource = icons.bills;
            label = 'Bills';
          }

          return (
            <View
              style={[
                styles.iconContainer,
                focused ? styles.activeTab : styles.inactiveTab,
              ]}
            >
              <Image
                source={iconSource}
                style={[
                  styles.icon,
                  { tintColor: focused ? 'white' : color, width: size, height: size },
                ]}
              />

            </View>
          );
        },
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="assets" options={{ title: 'Assets' }} />
      <Tabs.Screen name="transactions" options={{ title: 'Tnxs' }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
      <Tabs.Screen name="bills" options={{ title: 'Bills' }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarBackground: {
    position: 'absolute',
    bottom: 0,
    width: 391, // Exact width from design
    height: 67, // Exact height from design
    backgroundColor: '#F6FBFF', // Soft white background
    borderRadius: 100, // Rounded border
    borderColor: '#DCDCDC',
    borderWidth: 0.5,
    shadowColor: 'rgba(179, 179, 179, 0.25)',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 5,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  iconContainer: {
    width: 62,
    height: 62,
    borderRadius: 31,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  activeTab: {
    backgroundColor: '#25AE7A', // Green active color
    elevation: 5,
  },
  inactiveTab: {
    backgroundColor: '#E5FFF5', // Light green circle for inactive tabs
  },
  icon: {
    width: 24, // Icon size based on design
    height: 24,
    resizeMode: 'contain',
  },
  tabLabel: {
    fontSize: 8, // Exact font size from design
    fontFamily: 'Chivo',
    lineHeight: 10,
    marginTop: 4, // Adjust label position
  },
});
