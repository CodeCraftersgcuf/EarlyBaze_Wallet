import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import Header from '@/components/Header';
import PrimaryButton from '@/components/Buy/PrimaryButton';
import ProfileAvatar from '@/components/Setting/Profile/ProfileAvatar';
import ProfileInputField from '@/components/Setting/Profile/ProfileInputField';

const EditProfile: React.FC = () => {
  const backgroundColor = useThemeColor({ light: '#EFFEF9', dark: '#000000' }, 'background');
  const [username, setUsername] = useState('Qamardeen');
  const [email] = useState('Qamardeenoladimeji@gmail.com'); // Read-only
  const [phone, setPhone] = useState('07023456789');
  const [password, setPassword] = useState('**********');

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor }]}>
      {/* Header */}
      <Header title="Edit Profile" />

      {/* Avatar */}
      <ProfileAvatar onEditPress={() => console.log('Edit Avatar')} />

      {/* Profile Fields */}
      <ProfileInputField label="Username" value={username} onChangeText={setUsername} />
      <ProfileInputField label="Email" value={email} isEditable={false} />
      <ProfileInputField label="Phone" value={phone} onChangeText={setPhone} />
      <ProfileInputField
        label="Password"
        value={password}
        isEditable={false}
        showChangeButton
        onChangePress={() => console.log('Change Password')}
      />

      {/* Save Button */}
      <View style={styles.buttonContainer}>
        <PrimaryButton title="Save" onPress={() => console.log('Profile Saved')} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default EditProfile;
