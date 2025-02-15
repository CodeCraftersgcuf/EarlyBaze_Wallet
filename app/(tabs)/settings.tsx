import React, { useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import ProfileHeader from '@/components/Setting/ProfileHeader';
import SettingsList from '@/components/Setting/SettingsList';
import OtherSettings from '@/components/Setting/OtherSettings';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useRouter, router } from 'expo-router';
import { images } from '@/constants';

const SettingsScreen: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const backgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#000000' }, 'background');

  const handleThemeToggle = (theme: 'Light' | 'Dark') => {
    setIsDarkMode(theme === 'Dark');
  };

  return (
    <ScrollView>
      <ProfileHeader name="Qamardeen" email="Qamardeenoladimaji@gmail.com" cryptoBalance="35,000" nairaBalance="35,000" />

      {/* Settings Grid */}
      <View style={[styles.gridContainer, { backgroundColor }]}>
        <SettingsList
          options={[
            { title: 'Edit Profile', image: images.edit_profile, onPress: () => { router.push('/EditProfile') } },
            { title: 'Account', image: images.account, onPress: () => { router.push('/Account')} },
            { title: 'Referral', image: images.referral, onPress: () => {router.push('/Referral') } },
            { title: 'KYC', image: images.kyc, onPress: () => { router.push('/Kyc') } },
            { title: 'Support', image: images.support, onPress: () => {router.push('/Support') } },
            { title: 'Security', image: images.security, onPress: () => {router.push('/Security') } },
          ]}
        />
      </View>

      <OtherSettings isDarkMode={isDarkMode} onToggleTheme={handleThemeToggle} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 25,
  },
});

export default SettingsScreen;
