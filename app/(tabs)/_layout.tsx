import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Image, View, StyleSheet } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useColorScheme } from '@/hooks/useColorScheme';
import icons from '@/constants/icons'; // Import icons

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor({ light: '#F6FBFF', dark: '#202020' }, 'background');
  const activeColor = useThemeColor({ light: '#25AE7A', dark: '#25AE7A' }, 'primary'); // Green for active tab
  const inactiveColor = useThemeColor({ light: '#E5FFF5', dark: '#303030' }, 'secondary'); // Light green for inactive tab
  const tabIconColor = useThemeColor({ light: '#5A5A5A', dark: '#C7C7C7' }, 'text');
  const tabTextColor = useThemeColor({ light: '#000000', dark: '#FFFFFF' }, 'text'); // Dark text color for white theme, light for dark theme

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
          height: 80, // Height adjusted for the rounded effect
        },
        tabBarBackground: () => (
          <View style={[styles.tabBarBackground, { backgroundColor }]} />
        ),
        tabBarIcon: ({ size, focused }) => {
          let iconSource;

          if (route.name === 'index') {
            iconSource = icons.home;
          } else if (route.name === 'assets') {
            iconSource = icons.assests;
          } else if (route.name === 'transactions') {
            iconSource = icons.tnxs;
          } else if (route.name === 'settings') {
            iconSource = icons.settings;
          } else if (route.name === 'bills') {
            iconSource = icons.bills;
          }

          return (
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: focused ? activeColor : inactiveColor },
              ]}
            >
              <Image
                source={iconSource}
                style={[
                  styles.icon,
                  { tintColor: focused ? '#FFFFFF' : tabIconColor, width: size, height: size },
                ]}
              />
            </View>
          );
        },
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarLabelStyle: {
            color: colorScheme === 'light' ? '#000000' : '#FFFFFF', // Adjust text color for both light and dark themes
          },
        }}
      />
      <Tabs.Screen
        name="assets"
        options={{
          title: 'Assets',
          tabBarLabelStyle: {
            color: colorScheme === 'light' ? '#000000' : '#FFFFFF', // Adjust text color for both light and dark themes
          },
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: 'Tnxs',
          tabBarLabelStyle: {
            color: colorScheme === 'light' ? '#000000' : '#FFFFFF', // Adjust text color for both light and dark themes
          },
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarLabelStyle: {
            color: colorScheme === 'light' ? '#000000' : '#FFFFFF', // Adjust text color for both light and dark themes
          },
        }}
      />
      <Tabs.Screen
        name="bills"
        options={{
          title: 'Bills',
          tabBarLabelStyle: {
            color: colorScheme === 'light' ? '#000000' : '#FFFFFF', // Adjust text color for both light and dark themes
          },
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarBackground: {
    position: 'absolute',
    bottom: 15,
    width: '90%', // Responsive width
    height: 75,
    borderRadius: 50,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: 'rgba(179, 179, 179, 0.25)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});

export default TabLayout;
