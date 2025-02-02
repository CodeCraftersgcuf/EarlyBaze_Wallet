import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

interface TransactionTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const tabs = ['All', 'Send', 'Receive', 'Buy', 'Swap', 'Withdraw'];

const TransactionTabs: React.FC<TransactionTabsProps> = ({ activeTab, setActiveTab }) => {
  const backgroundColor = useThemeColor({ light: '#F0F0F0', dark: '#1A1A1A' }, 'tabBackground');
  const activeColor = useThemeColor({ light: '#22A45D', dark: '#157347' }, 'activeTab');
  const textColor = useThemeColor({ light: '#8A8A8A', dark: '#FFFFFF' }, 'text');

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab}
          style={[
            styles.tab,
            activeTab === tab && {
              backgroundColor: activeColor,
              shadowColor: 'rgba(162, 162, 162, 0.25)',
              shadowOffset: { width: 2, height: 2 },
              shadowOpacity: 1,
              shadowRadius: 5,
              elevation: 3,
            },
          ]}
          onPress={() => setActiveTab(tab)}
        >
          <Text style={[styles.tabText, activeTab === tab && styles.activeTabText, { color: activeTab === tab ? '#FFFFFF' : textColor }]}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TransactionTabs;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginTop: 12,
    borderRadius: 10,
    paddingVertical: 6,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  tabText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  activeTabText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
