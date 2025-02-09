import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import SettingOption from './SettingOption';
import { Ionicons } from '@expo/vector-icons';

interface OtherSettingsProps {
    isDarkMode: boolean;
    onToggleTheme: () => void;
}

const OtherSettings: React.FC<OtherSettingsProps> = ({ isDarkMode, onToggleTheme }) => {
    const backgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1A1A1A' }, 'background');
    const textColor = useThemeColor({ light: '#222222', dark: '#FFFFFF' }, 'text');
    const borderColor = useThemeColor({ light: '#E5E5E5', dark: '#333333' }, 'border');
    const buttonText = useThemeColor({ light: '#121212', dark: '#22A45D' }, 'buttonText');
    const [selectedTheme, setSelectedTheme] = useState(isDarkMode ? 'Dark' : 'Light');

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <Text style={[styles.sectionTitle, { color: textColor }]}>Other Settings</Text>

            {/* Theme Selector */}
            <SettingOption
                title="Theme"
                iconName="moon-outline"
                onPress={onToggleTheme}
                rightContent={<Text style={{ color: textColor }}>{selectedTheme}</Text>}
                textColor={textColor}
            />

            {/* Other Setting Options */}
            <SettingOption title="Terms of Use" iconName="document-text-outline" onPress={() => { }} textColor={textColor} />
            <SettingOption title="Notifications" iconName="notifications-outline" onPress={() => { }} textColor={textColor} />
            <SettingOption title="FAQ" iconName="help-circle-outline" onPress={() => { }} textColor={textColor} />

            {/* Logout Button */}
            <SettingOption
                title="Logout"
                iconName="log-out-outline"
                iconColor="red"
                textColor="red"
                onPress={() => { }}
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
