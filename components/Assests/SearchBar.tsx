import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  const backgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1A1A1A' }, 'background');
  const textColor = useThemeColor({ light: '#000000', dark: '#FFFFFF' }, 'text');
  const placeholderColor = useThemeColor({ light: '#A0A0A0', dark: '#CCCCCC' }, 'placeholder');

  return (
    <View style={[styles.searchContainer, { backgroundColor }]}>
      <TextInput
        style={[styles.input, { color: textColor }]}
        placeholder="Search Crypto"
        placeholderTextColor={placeholderColor}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchContainer: {
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    margin: 16,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  input: {
    fontSize: 16,
  },
});
