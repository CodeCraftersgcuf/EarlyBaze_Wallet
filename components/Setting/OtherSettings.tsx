import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import SettingOption from './SettingOption';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { icons } from '@/constants';
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


  const theme = useThemeColor({ light: icons.theme_white, dark: icons.theme_black }, 'background');
  const term = useThemeColor({ light: icons.term_white, dark: icons.term_black }, 'background');
  const notification = useThemeColor({ light: icons.notification_white, dark: icons.notification_black }, 'background');
  const faq = useThemeColor({ light: icons.faq_white, dark: icons.faq_black }, 'background');


  const handleThemeChange = (theme: 'Light' | 'Dark') => {
    setSelectedTheme(theme);
    setDropdownVisible(false);
    onToggleTheme(theme);
  };

  // Conditional icon rendering based on the theme
  const getIconForSetting = (iconName: string) => {
    const lightIcons = {
      'moon-outline': 'sunny-outline', // Change moon icon to sun for light mode
      'document-text-outline': 'document-text-sharp', // Use sharp icons in light mode
      'notifications-outline': 'notifications-circle-outline',
      'help-circle-outline': 'help-circle-sharp',
    };

    return selectedTheme === 'Light' ? lightIcons[iconName] : iconName;
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.sectionTitle, { color: textColor }]}>Other Settings</Text>

      {/* Theme Selector */}
      <TouchableOpacity style={styles.themeSelector} onPress={() => setDropdownVisible(!dropdownVisible)}>
        <SettingOption
          title="Theme"
          iconName={theme} // Default icon (changes based on the theme)
          onPress={() => {}}
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
        <View style={[styles.dropdown, { backgroundColor: backgroundColor, borderColor: borderColor }]}>
          <TouchableOpacity onPress={() => handleThemeChange('Light')} style={styles.dropdownItem}>
            <Text style={{ color: textColor }}>Light</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleThemeChange('Dark')} style={styles.dropdownItem}>
            <Text style={{ color: textColor }}>Dark</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Other Setting Options */}
      <SettingOption
        title="Terms of Use"
        iconName={term}
        onPress={() => {}}
        textColor={textColor}
      />
      <SettingOption
        title="Notifications"
        iconName={notification}
        onPress={() => {}}
        textColor={textColor}
      />
      <SettingOption
        title="FAQ"
        iconName={faq}
        onPress={() => {}}
        textColor={textColor}
      />

      {/* Logout Button */}
      <SettingOption
        title="Logout"
        iconName="log-out-outline"
        iconColor="red"
        textColor="red"
        onPress={() => {}}
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
    top: 55,
    left: 15,
    right: 15,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // For Android shadow
    zIndex: 1000, // Ensures it appears above other elements
  },
  dropdownItem: {
    paddingVertical: 8,
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
