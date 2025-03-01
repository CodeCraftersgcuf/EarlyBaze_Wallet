import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

interface TicketTabsProps {
  selectedTab: string;
  onSelect: (tab: string) => void;
}

const tabs = ['All', 'unanswered', 'answered'];

const TicketTabs: React.FC<TicketTabsProps> = ({ selectedTab, onSelect }) => {
  const activeColor = useThemeColor({ light: '#25AE7A', dark: '#25AE7A' }, 'activeTab');
  const inactiveTextColor = useThemeColor({ light: '#888888', dark: '#AAAAAA' }, 'textInactive');
  const activeTextColor = useThemeColor({ light: '#FFFFFF', dark: '#FFFFFF' }, 'textActive');
  const backgroundColor = useThemeColor({ light: '#F5F5F5', dark: '#222222' }, 'background');

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[
            styles.tab,
            selectedTab === tab ? { backgroundColor: activeColor } : { backgroundColor: 'transparent' },
          ]}
          onPress={() => onSelect(tab)}
        >
          <Text style={[styles.tabText, { color: selectedTab === tab ? activeTextColor : inactiveTextColor }]}>
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
    backgroundColor: '#F5F5F5',
    borderRadius: 30,
    padding: 4,
    marginHorizontal: 16,
    alignItems: 'center',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default TicketTabs;
