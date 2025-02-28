import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useThemeColor } from '@/hooks/useThemeColor';
import { images } from '@/constants';

interface DatePickerFieldProps {
  label: string;
  value: string;
  onChange: (date: string) => void;
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({ label, value, onChange }) => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  // Theme colors for light & dark mode
  const backgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1E1E1E' }, 'background');
  const textColor = useThemeColor({ light: '#222222', dark: '#FFFFFF' }, 'text');
  const placeholderColor = useThemeColor({ light: '#888888', dark: '#CCCCCC' }, 'placeholder');
  const borderColor = useThemeColor({ light: '#E0E0E0', dark: '#444444' }, 'border');

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
      onChange(selectedDate.toISOString().split('T')[0]); // Format YYYY-MM-DD
    }
  };

  const openDatePicker = () => {
    setShowPicker(true);
  };

  return (
    <View style={styles.container}>
      {/* Label */}
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>

      {/* Input Field with Calendar Icon */}
      <TouchableOpacity 
        style={[styles.inputContainer, { backgroundColor, borderColor }]} 
        onPress={openDatePicker}
      >
        <TextInput
          style={[styles.input, { color: textColor }]}
          value={value}
          placeholder="Choose Date of Birth"
          placeholderTextColor={placeholderColor}
          editable={false} // Prevent manual input
        />
        <TouchableOpacity onPress={openDatePicker}>
          <Image source={images.picker} style={styles.icon} />
        </TouchableOpacity>
      </TouchableOpacity>

      {/* Date Picker for Android & iOS */}
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

// Keep the same styles as before
const styles = StyleSheet.create({
  container: { marginBottom: 15 },
  label: { fontSize: 14, fontWeight: 'bold', marginBottom: 5 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 55,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#000', // Adjust for dark mode if needed
  },
});

export default DatePickerField;
