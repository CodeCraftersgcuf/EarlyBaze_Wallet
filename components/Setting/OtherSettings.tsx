import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import SettingOption from './SettingOption';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, router } from 'expo-router';
import { icons } from '@/constants';


import { Alert } from "react-native";
import { removeFromStorage } from "@/utils/storage";


interface OtherSettingsProps {
  isDarkMode: boolean;
  onToggleTheme: (theme: 'Light' | 'Dark') => void;
}

const OtherSettings: React.FC<OtherSettingsProps> = ({ isDarkMode, onToggleTheme }) => {
  const backgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1A1A1A' }, 'background');
  const textColor = useThemeColor({ light: '#222222', dark: '#FFFFFF' }, 'text');
  const borderColor = useThemeColor({ light: '#E5E5E5', dark: '#333333' }, 'border');
  const buttonText = useThemeColor({ light: '#121212', dark: '#22A45D' }, 'buttonText');

  const [selectedTheme, setSelectedTheme] = useState<'Light' | 'Dark'>(isDarkMode ? 'Dark' : 'Light');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });

  const themeRef = useRef<TouchableOpacity>(null);

  const theme = useThemeColor({ light: icons.theme_white, dark: icons.theme_black }, 'background');
  const term = useThemeColor({ light: icons.term_white, dark: icons.term_black }, 'background');
  const notification = useThemeColor({ light: icons.notification_white, dark: icons.notification_black }, 'background');
  const faq = useThemeColor({ light: icons.faq_white, dark: icons.faq_black }, 'background');

  const handleThemeChange = (theme: 'Light' | 'Dark') => {
    setSelectedTheme(theme);
    onToggleTheme(theme);
    setDropdownVisible(false);
    console.log(`🔹 Theme changed to: ${theme}`);
  };

  // Function to toggle the dropdown and measure its position
  const toggleDropdown = () => {
    if (themeRef.current) {
      themeRef.current.measureInWindow((x, y, width) => {
        setDropdownPosition({ top: y + 40, left: x, width });
        setDropdownVisible((prev) => !prev);
      });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.sectionTitle, { color: textColor }]}>Other Settings</Text>

      {/* Theme Selector */}
      <TouchableOpacity
        ref={themeRef}
        style={styles.themeSelector}
        onPress={toggleDropdown}
      >
        <SettingOption
          title="Theme"
          iconName={theme}
          onPress={() => { }}
          rightContent={
            <View style={styles.dropdownToggle}>
              <Text style={{ color: textColor }}>{selectedTheme}</Text>
              <Ionicons name={dropdownVisible ? 'chevron-up' : 'chevron-down'} size={18} color={textColor} />
            </View>
          }
          textColor={textColor}
        />
      </TouchableOpacity>

      {/* Dropdown for theme selection */}
      {dropdownVisible && (
        <View style={[styles.dropdown, {
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          top: dropdownPosition.top,
          left: dropdownPosition.left,
          width: dropdownPosition.width
        }]}>
          <TouchableOpacity onPress={() => handleThemeChange('Light')} style={styles.dropdownItem}>
            <Text style={{ color: textColor }}>Light</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleThemeChange('Dark')} style={styles.dropdownItem}>
            <Text style={{ color: textColor }}>Dark</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Other Setting Options */}
      <SettingOption title="Terms of Use" iconName={term} onPress={() => { }} textColor={textColor} />
      <SettingOption title="Notifications" iconName={notification} onPress={() => router.push('/Notification')} textColor={textColor} />
      <SettingOption title="FAQ" iconName={faq} onPress={() => { }} textColor={textColor} />

      {/* Logout Button */}
      <SettingOption
        title="Logout"
        iconName="log-out-outline"
        iconColor="red"
        textColor="red"
        onPress={() => {
          Alert.alert(
            "Confirm Logout",
            "Are you sure you want to logout?",
            [
              { text: "Cancel", style: "cancel" },
              {
                text: "Logout",
                style: "destructive",
                onPress: async () => {
                  await removeFromStorage("authToken");
                  await removeFromStorage("user");
                  await removeFromStorage("assets");
                  console.log("✅ User logged out successfully");
                  router.replace("/login");
                }
              }
            ]
          );
        }}
      />

      {/* Close Account Button */}
      <View style={styles.closeAccountButton}>
        <Text style={[styles.closeAccountText, { color: buttonText }]}>Close Account</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    paddingVertical: 20,
    paddingBottom: 100,

  },
  sectionTitle: {
    fontSize: 12,
    marginBottom: 20,
    fontWeight: '600',
  },
  themeSelector: {
    position: 'relative',
  },
  dropdownToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
    zIndex: 9999, // Ensures it's always on top
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  closeAccountButton: {
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  closeAccountText: {
    fontSize: 14,
  },
});

export default OtherSettings;
