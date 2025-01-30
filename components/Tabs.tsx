import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

interface TabsProps {
  selectedTab: 'All Assets' | 'My Assets';
  onTabSelect: (tab: 'All Assets' | 'My Assets') => void;
}

const Tabs: React.FC<TabsProps> = ({ selectedTab, onTabSelect }) => {
  const backgroundColor = useThemeColor({ light: '#F0F0F0', dark: '#1A1A1A' }, 'tabBackground');
  const activeColor = useThemeColor({ light: '#25AE7A', dark: '#007C57' }, 'activeTab');
  const textColor = useThemeColor({ light: '#8A8A8A', dark: '#FFFFFF' }, 'text');

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {['All Assets', 'My Assets'].map((tab) => (
        <TouchableOpacity
          key={tab}
          onPress={() => onTabSelect(tab as 'All Assets' | 'My Assets')}
          style={[
            styles.tab,
            selectedTab === tab && { 
              backgroundColor: activeColor,
              shadowColor: 'rgba(162, 162, 162, 0.25)',
              shadowOffset: { width: 4, height: 4 },
              shadowOpacity: 1,
              shadowRadius: 10,
              elevation: 5,
            }
          ]}
        >
          <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText, { color: selectedTab === tab ? '#fff' : textColor }]}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 10,
    padding: 4,
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  activeTabText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Tabs;