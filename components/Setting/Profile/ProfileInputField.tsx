import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import ChangePasswordModal from '@/components/Setting/Profile/ChangePasswordModal';

interface ProfileInputFieldProps {
  label: string;
  value: string;
  onChangeText?: (text: string) => void;
  isEditable?: boolean;
  showChangeButton?: boolean;
  onChangePress?: () => void;
}

const ProfileInputField: React.FC<ProfileInputFieldProps> = ({
  label,
  value,
  onChangeText,
  isEditable = true,
  showChangeButton = false,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const cardBackgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1A1A1A' }, 'card');
  const textColor = useThemeColor({ light: '#222222', dark: '#FFFFFF' }, 'text');

  return (
    <View>
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
      <View style={[styles.inputContainer, { backgroundColor: cardBackgroundColor }]}>
        <TextInput
          style={[styles.input, { color: textColor }]}
          value={value}
          onChangeText={onChangeText}
          editable={isEditable}
          placeholderTextColor="#A1A1A1"
        />
        {showChangeButton && (
          <TouchableOpacity style={styles.changeButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.changeText}>Change</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Password Change Modal */}
      <ChangePasswordModal visible={isModalVisible} onClose={() => setModalVisible(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  input: {
    flex: 1,
    fontSize: 14,
  },
  changeButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 5,
    backgroundColor: '#E5E5E5',
  },
  changeText: {
    fontSize: 12,
    color: '#007AFF',
  },
});

export default ProfileInputField;
