import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ReferralCodeBoxProps {
  code: string;
  onCopy: () => void;
  onShare: () => void;
}

const ReferralCodeBox: React.FC<ReferralCodeBoxProps> = ({ code, onCopy, onShare }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Referral Code</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={code}
          editable={false}
        />
        <TouchableOpacity onPress={onCopy} style={styles.iconButton}>
          <Ionicons name="copy-outline" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onShare} style={styles.iconButton}>
          <Ionicons name="share-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    color: '#A1A1A1',
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  iconButton: {
    backgroundColor: '#F0F0F0',
    padding: 10,
    borderRadius: 50,
    marginLeft: 10,
  },
});

export default ReferralCodeBox;
