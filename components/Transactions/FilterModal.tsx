import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import icons from '@/constants/icons';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
}

const filters = ['All', 'Successful', 'Processing', 'Failed'];

const FilterModal: React.FC<FilterModalProps> = ({ visible, onClose, selectedFilter, setSelectedFilter }) => {
  const backgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1A1A1A' }, 'background');
  const textColor = useThemeColor({ light: '#000000', dark: '#FFFFFF' }, 'text');
  const borderColor = useThemeColor({ light: '#C2C2C2', dark: '#333333' }, 'border');
  const activeColor = useThemeColor({ light: '#22A45D', dark: '#157347' }, 'active');

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={[styles.modalContainer, { backgroundColor, borderColor }]}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.modalTitle]}>Status Filter</Text>
            <TouchableOpacity onPress={onClose}>
              <Image source={icons.cross} style={styles.closeIcon} />
            </TouchableOpacity>
          </View>

          {/* Filter Options */}
          {filters.map(filter => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterOption,
                selectedFilter === filter && { borderColor: activeColor },
              ]}
              onPress={() => {
                setSelectedFilter(filter);
                onClose();
              }}
            >
              <View style={styles.radioCircle}>
                {selectedFilter === filter && <View style={[styles.radioSelected, { backgroundColor: activeColor }]} />}
              </View>
              <Text style={[styles.filterText, { color: textColor }]}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#25AE7A',
  },
  closeIcon: {
    width: 14,
    height: 14,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
  filterText: {
    fontSize: 16,
    marginLeft: 10,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});
