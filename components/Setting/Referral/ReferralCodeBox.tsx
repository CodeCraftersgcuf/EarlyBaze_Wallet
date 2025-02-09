import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';

interface ReferralCodeBoxProps {
  code: string;
  onCopy: () => void;
  onShare: () => void;
}

const ReferralCodeBox: React.FC<ReferralCodeBoxProps> = ({ code, onCopy, onShare }) => {
  const cardBackgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1A1A1A' }, 'card');
  const textColor = useThemeColor({ light: '#222222', dark: '#FFFFFF' }, 'text');

  return (
    <View style={[styles.container, { backgroundColor: cardBackgroundColor }]}>
      <TextInput
        style={[styles.input, { color: textColor }]}
        value={code}
        editable={false}
      />
      <TouchableOpacity onPress={onCopy} style={styles.icon}>
        <Ionicons name="copy-outline" size={20} color={textColor} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onShare} style={styles.icon}>
        <Ionicons name="share-outline" size={20} color={textColor} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 8,
  },
  icon: {
    padding: 6,
  },
});

export default ReferralCodeBox;
