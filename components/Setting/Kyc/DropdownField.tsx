import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

interface DropdownFieldProps {
  label: string;
  options: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

const DropdownField: React.FC<DropdownFieldProps> = ({ label, options, selectedValue, onSelect }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  // Theme colors
  const backgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1E1E1E' }, 'background');
  const textColor = useThemeColor({ light: '#222222', dark: '#FFFFFF' }, 'text');
  const modalBackgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#2D2D2D' }, 'modalBackground');
  const borderColor = useThemeColor({ light: '#D3D3D3', dark: '#555555' }, 'border');

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
      <TouchableOpacity 
        style={[styles.input, { borderColor, backgroundColor }]} 
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ color: textColor }}>{selectedValue || 'Select document type'}</Text>
      </TouchableOpacity>

      <Modal visible={isModalVisible} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={[styles.modal, { backgroundColor: modalBackgroundColor }]}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.modalTitle}>Select Document</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={[styles.closeButton, { color: textColor }]}>✖</Text>
              </TouchableOpacity>
            </View>

            {/* Options List */}
            <FlatList
              data={options}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.option,
                    selectedValue === item && styles.selectedOption,
                    { borderColor, backgroundColor }
                  ]}
                  onPress={() => {
                    onSelect(item);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.radio}>{selectedValue === item ? '🟢' : '⚪'}</Text>
                  <Text style={[styles.optionText, { color: textColor }]}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 10 },
  label: { fontSize: 14, fontWeight: 'bold', marginBottom: 5 },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    marginBottom: 10,
  },
  modal: {
    width: '92%',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#25AE7A',
  },
  closeButton: {
    fontSize: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
  },
  selectedOption: {
    borderColor: '#008000',
    backgroundColor: '#F0FFF0',
  },
  radio: {
    marginRight: 15,
    fontSize: 18,
  },
  optionText: {
    fontSize: 16,
  },
});

export default DropdownField;
