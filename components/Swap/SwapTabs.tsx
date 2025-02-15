import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

interface SwapTabsProps {
  selectedTab: 'Naira' | 'Crypto';
  setSelectedTab: (tab: 'Naira' | 'Crypto') => void;
}

const SwapTabs: React.FC<SwapTabsProps> = ({ selectedTab, setSelectedTab }) => {
  const tabBackgroundColor = useThemeColor({ light: '#F6F6F6', dark: '#0D0D0D' }, 'tab');
  const activeTabBackground = '#25AE7A';
  const isDarkTheme = tabBackgroundColor === '#0D0D0D'; // Check if dark mode is active

  return (
    <View style={[styles.tabContainer, { backgroundColor: tabBackgroundColor }]}>
      <TouchableOpacity
        style={[styles.tab, selectedTab === 'Naira' && { backgroundColor: activeTabBackground }]}
        onPress={() => setSelectedTab('Naira')}
      >
        <Text
          style={[
            styles.tabText,
            {
              color: selectedTab === 'Naira' ? '#FFFFFF' : isDarkTheme ? '#FFFFFF' : '#00000080',
            },
          ]}
        >
          Naira
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, selectedTab === 'Crypto' && { backgroundColor: activeTabBackground }]}
        onPress={() => setSelectedTab('Crypto')}
      >
        <Text
          style={[
            styles.tabText,
            {
              color: selectedTab === 'Crypto' ? '#FFFFFF' : isDarkTheme ? '#FFFFFF' : '#00000080',
            },
          ]}
        >
          Crypto
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
    marginHorizontal: 18,
    marginTop: 100,
    paddingHorizontal: 18,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  tabText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default SwapTabs;
