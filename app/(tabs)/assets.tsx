import React, { useState } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import CryptoList from '@/components/Assests/CryptoList';
import { useThemeColor } from '@/hooks/useThemeColor';
import marketData from '@/constants/marketData.json'

const Market: React.FC = () => {
  const backgroundColor = useThemeColor({ light: '#EFFEF9', dark: '#000000' }, 'background');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered data based on search input
  const filteredData = marketData.filter(crypto =>
    crypto.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <Header title="Market" onFilterPress={() => console.log('Filter pressed')} />

      {/* Search Bar */}
      {/* <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} /> */}
      <View style={styles.horPadding}>

        <SearchBar placeholder="Search Crypto" value={searchQuery} onChangeText={setSearchQuery} />
      </View>

      {/* Crypto List */}
      <CryptoList data={filteredData} />
    </ThemedView>
  );
};

export default Market;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  horPadding: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
});
