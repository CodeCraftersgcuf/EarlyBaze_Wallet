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
import { images } from '@/constants';
interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
}

const filters = ['All', 'completed', 'pending', 'failed'];

const FilterModal: React.FC<FilterModalProps> = ({ visible, onClose, selectedFilter, setSelectedFilter }) => {
  const backgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1A1A1A' }, 'background');
  const textColor = useThemeColor({ light: '#000000', dark: '#FFFFFF' }, 'text');
  const borderColor = useThemeColor({ light: '#C2C2C2', dark: '#333333' }, 'border');
  const activeColor = useThemeColor({ light: '#22A45D', dark: '#157347' }, 'active');
  const close = useThemeColor({ light: images.cross_white, dark: images.cross_black }, 'close');
  const borderColorRadio= useThemeColor({ light: '#C2C2C2', dark: '#333333' }, 'border');

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={[styles.modalContainer, { backgroundColor, borderColor }]}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.modalTitle]}>Status Filter</Text>
            <TouchableOpacity onPress={onClose} style={[styles.closeButton, { backgroundColor: backgroundColor }]}>
              <Image source={close} style={styles.closeIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.horizontalLine} />

          <View style={styles.filterContainer}>
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
                <View style={[styles.radioCircle, { borderColor: borderColorRadio }]}>
                  {selectedFilter === filter && <View style={[styles.radioSelected, { backgroundColor: activeColor }]} />}
                </View>
                <Text style={[styles.filterText, { color: textColor }]}>{filter}</Text>
              </TouchableOpacity>
            ))}
          </View>
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
    width: '95%',
    borderRadius: 15,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 5,
  },
  horizontalLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#0F714D',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#25AE7A',

  },filterContainer: {
    padding: 10,
  },
  
  closeButton: {
    padding: 5,
    borderRadius: 25,
    borderWidth: 1,
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    marginHorizontal: 5,
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
