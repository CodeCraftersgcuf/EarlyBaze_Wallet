import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

interface NotificationTabProps {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

const NotificationTab: React.FC<NotificationTabProps> = ({ selectedTab, setSelectedTab }) => {
  const textColor = useThemeColor({ light: '#222222', dark: '#FFFFFF' }, 'text');
  const activeColor = useThemeColor({ light: '#25AE7A', dark: '#25AE7A' }, 'active');

  const tabs = ['All', 'System Notification', 'Announcement'];

  return (
    <View style={styles.tabContainer}>
      {tabs.map((tab) => (
        <TouchableOpacity key={tab} onPress={() => setSelectedTab(tab)} style={styles.tab}>
          <Text style={[styles.tabText, { color: textColor }, selectedTab === tab && { color: activeColor }]}>
            {tab}
          </Text>
          {selectedTab === tab && <View style={[styles.activeIndicator, { backgroundColor: activeColor }]} />}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  tab: {
    alignItems: 'center',
  },
  tabText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  activeIndicator: {
    height: 3,
    width: '80%',
    marginTop: 4,
    borderRadius: 2,
  },
});

export default NotificationTab;
