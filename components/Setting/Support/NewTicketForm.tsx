import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import PrimaryButton from '@/components/Buy/PrimaryButton';
import PrioritySelector from './PrioritySelector';
import SubjectSelectionModal from './SubjectSelectionModal';  // Import the new component

const NewTicketForm: React.FC = () => {
  const cardBackgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1A1A1A' }, 'card');
  const textColor = useThemeColor({ light: '#222222', dark: '#FFFFFF' }, 'text');
  const placeholderColor = useThemeColor({ light: '#888888', dark: '#CCCCCC' }, 'placeholder');
  const titleColor = useThemeColor({ light: '#0C5E3F', dark: '#FFFFFF' }, 'title');
  const borderColor = useThemeColor({ light: '#E5E5E5', dark: '#444444' }, 'border');

  const [priority, setPriority] = useState('Low');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: cardBackgroundColor }]}>
      <Text style={[styles.title, { color: titleColor }]}>New Ticket</Text>

      {/* Subject Input (Dropdown Trigger) */}
      <TouchableOpacity style={[styles.dropdownContainer, { borderColor }]} onPress={() => setModalVisible(true)}>
        <Text style={[styles.subjectText, { color: selectedSubject ? textColor : placeholderColor }]}>
          {selectedSubject || 'Enter subject'}
        </Text>
        <Ionicons name="chevron-down" size={20} color={textColor} />
      </TouchableOpacity>

      {/* Message Input */}
      <TextInput
        style={[styles.textarea, { color: textColor }]}
        placeholder="Type your message"
        placeholderTextColor={placeholderColor}
        multiline
      />

      {/* Priority Selector */}
      <PrioritySelector onSelect={setPriority} />

      {/* Submit Button */}
      <View style={{ marginTop: 20 }}>
        <PrimaryButton title="Send" onPress={() => console.log('Ticket Submitted')} />
      </View>

      {/* Pass necessary props to the SubjectSelectionModal component */}
      <SubjectSelectionModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedSubject={selectedSubject}
        setSelectedSubject={setSelectedSubject}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
  },
  dropdownContainer: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subjectText: {
    fontSize: 14,
  },
  textarea: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    height: 100,
    marginBottom: 12,
    textAlignVertical: 'top',
  },
});

export default NewTicketForm;
