import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

interface PrioritySelectorProps {
  onSelect: (priority: string) => void;
}

const priorities = ['Low', 'Medium', 'High', 'Critical'];

const PrioritySelector: React.FC<PrioritySelectorProps> = ({ onSelect }) => {
  const [selectedPriority, setSelectedPriority] = useState('Low');
  const textColor = useThemeColor({ light: '#222222', dark: '#FFFFFF' }, 'text');

  return (
    <View style={styles.container}>
      {priorities.map((priority) => (
        <TouchableOpacity
          key={priority}
          style={styles.option}
          onPress={() => {
            setSelectedPriority(priority);
            onSelect(priority);
          }}
        >
          <View style={selectedPriority === priority ? styles.radioSelected : styles.radio} />
          <Text style={[styles.label, { color: textColor }]}>{priority}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radio: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#777',
    marginRight: 6,
  },
  radioSelected: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#25AE7A',
    borderWidth: 1,
    borderColor: '#25AE7A',
    marginRight: 6,
  },
  label: {
    fontSize: 14,
  },
});

export default PrioritySelector;
