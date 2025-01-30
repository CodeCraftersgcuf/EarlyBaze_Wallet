import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useThemeColor } from '@/hooks/useThemeColor';

interface SearchBarProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, value, onChangeText }) => {
  const backgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1A1A1A' }, 'inputBackground');
  const textColor = useThemeColor({ light: '#8A8A8A', dark: '#FFFFFF' }, 'text');

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Icon name="search" size={22} color={textColor} style={styles.icon} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={textColor}
        style={[styles.input, { color: textColor }]}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    width: '100%',
    borderRadius: 22.5, // Making it rounded
    paddingHorizontal: 26,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});

export default SearchBar;
