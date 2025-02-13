import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import AssetItem from './AssetItem';
import { assetsData, myAssetsData, transactionsData } from '@/constants/assetsData';
import { useThemeColor } from '@/hooks/useThemeColor';

const TABS = ['Assets', 'My Assets', 'Recent Transactions'];

const AssetsTab: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('Assets');
  const backgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#000000' }, 'background');
  const textColor = useThemeColor({ light: '#8A8A8A', dark: '#FFFFFF' }, 'text');
  const activeTabColor = useThemeColor({ light: '#25AE7A', dark: '#007C57' }, 'background');
  const tabBackgroundColor = useThemeColor({ light: '#F2F2F2', dark: '#1A1A1A' }, 'tabBackground');

  const getData = () => {
    switch (selectedTab) {
      case 'My Assets':
        return myAssetsData;
      case 'Recent Transactions':
        return transactionsData;
      default:
        return assetsData;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Tabs */}
      <View style={[styles.tabsContainer, {backgroundColor: tabBackgroundColor}]}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              selectedTab === tab && styles.activeTab,
              { backgroundColor: selectedTab === tab ? activeTabColor : 'transparent' },
            ]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === tab && styles.activeTabText,
                { color: selectedTab === tab ? '#fff' : textColor },
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* List of Assets */}
      <FlatList
        data={getData()}
        keyExtractor={(item) => item.id.toString()} // ✅ Ensure all keys are strings
        renderItem={({ item }) => <AssetItem item={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer} // Optional, ensures content is centered/has padding
        scrollEnabled={false} // ✅ Prevents nested scrolling issues
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    paddingHorizontal: 16,
    marginTop: 15,
    flex: 1, // Ensures the container takes up all available space
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    marginBottom: 10,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0,
  },
  activeTab: {
    backgroundColor: '#25AE7A',
    borderRadius: 8,
    shadowColor: 'rgba(162, 162, 162, 0.25)',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
  },
  tabText: {
    fontSize: 11,
    color: '#8A8A8A',
  },
  activeTabText: {
    color: 'white',
    fontWeight: 'bold',
  },
  flatListContainer: {
    paddingBottom: 16, // Optional: Adds extra space at the bottom if content is small
  },
});

export default AssetsTab;
