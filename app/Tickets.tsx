import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import Header from '@/components/Header';
import TicketTabs from '@/components/Setting/Support/TicketTabs';
import TicketItem from '@/components/Setting/Support/TicketItem';
import { useQuery } from '@tanstack/react-query';
import { getFromStorage } from '@/utils/storage';
import { getTickets } from '@/utils/queries/accountQueries';

const Tickets: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const backgroundColor = useThemeColor({ light: '#EFFEF9', dark: '#000000' }, 'background');
  const [selectedTab, setSelectedTab] = useState<'All' | 'unanswered' | 'answered'>('All');

  // Fetch the token when the component mounts
  useEffect(() => {
    const fetchToken = async () => {
      const fetchedToken = await getFromStorage("authToken");
      setToken(fetchedToken);
      console.log("🔹 Retrieved Token:", fetchedToken);
    };
    fetchToken();
  }, []);

  // Query to fetch tickets
  const { data: tickets, error: ticketsError, isLoading: ticketsLoading } = useQuery({
    queryKey: ["tickets"],
    queryFn: () => getTickets(token),
    enabled: !!token,
  });

  console.log("🔹 Tickets:", tickets);

  // Use API response; if no data, use empty array
  const apiTickets = tickets?.data || [];

  // Filter tickets based on selected tab:
  // - If 'All', return all tickets.
  // - Otherwise, filter by the 'answered' field.
  const filteredTickets = selectedTab === 'All'
    ? apiTickets
    : apiTickets.filter(ticket => ticket.answered.toLowerCase() === selectedTab.toLowerCase());

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Header */}
      <Header title="Tickets" />

      {/* Ticket Tabs */}
      <TicketTabs selectedTab={selectedTab} onSelect={setSelectedTab} />

      {/* Ticket List */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {filteredTickets.map((ticket: any) => (
          <TicketItem
            key={ticket.id.toString()}
            id={ticket.id.toString()}
            title={`Ticket ${ticket.id} - ${ticket.subject}`}
            date={new Date(ticket.created_at).toLocaleString()}
            status={ticket.answered} // "answered" or "unanswered"
            hasNotification={ticket.status === "open"}
            notificationCount={ticket.status === "open" ? 1 : 0}
          />
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
