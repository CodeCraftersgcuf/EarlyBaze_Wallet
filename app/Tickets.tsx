import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import Header from '@/components/Header';
import TicketTabs from '@/components/Setting/Support/TicketTabs';
import TicketItem from '@/components/Setting/Support/TicketItem';

const ticketData = [
  { id: '1', title: 'Ticket 1234 - Swap', date: '01 - 01 - 25 / 11:45 AM', status: 'Unanswered', hasNotification: false },
  { id: '2', title: 'Ticket 1234 - Send', date: '01 - 01 - 25 / 11:45 AM', status: 'Answered', hasNotification: true, notificationCount: 2 },
  { id: '3', title: 'Ticket 1234 - Send', date: '01 - 01 - 25 / 11:45 AM', status: 'Answered', hasNotification: false },
  { id: '4', title: 'Ticket 1234 - Send', date: '01 - 01 - 25 / 11:45 AM', status: 'Answered', hasNotification: false },
];

const Tickets: React.FC = () => {
  const backgroundColor = useThemeColor({ light: '#EFFEF9', dark: '#000000' }, 'background');
  const [selectedTab, setSelectedTab] = useState<string>('All');

  // Filter tickets based on selected tab
  const filteredTickets = selectedTab === 'All' 
    ? ticketData 
    : ticketData.filter(ticket => ticket.status === selectedTab);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Header */}
      <Header title="Tickets" />

      {/* Ticket Tabs */}
      <TicketTabs selectedTab={selectedTab} onSelect={setSelectedTab} />

      {/* Ticket List */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {filteredTickets.map((ticket) => (
          <TicketItem key={ticket.id} {...ticket} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
});

export default Tickets;
