import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import SearchBar from '@/components/SearchBar';
import Tabs from '@/components/Tabs';
import AssetList from '@/components/AssetList';
import Header from '@/components/Header';

const SendReceive: React.FC = () => {
  const backgroundColor = useThemeColor({ light: '#EFFEF9', dark: '#000000' }, 'background');

  // State to track the selected tab
  const [selectedTab, setSelectedTab] = useState<'All Assets' | 'My Assets'>('All Assets');

  // State for search query
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Custom Header */}
      <Header title="Assets"  onFilterPress={() => console.log('Filter pressed')} />

      {/* Search Bar */}
      <View style={styles.horPadding}>  
      <SearchBar placeholder="Search Crypto" value={searchQuery} onChangeText={setSearchQuery} />
      </View>
      {/* Tabs */}
      <View style={styles.horPadding}>
      <Tabs selectedTab={selectedTab} onTabSelect={setSelectedTab} />
      </View>
      {/* Asset List */}
      <AssetList selectedTab={selectedTab} searchQuery={searchQuery} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 16,
    paddingTop: 16,
  },
  horPadding: {
    paddingHorizontal: 16,
  },
});

export default SendReceive;
