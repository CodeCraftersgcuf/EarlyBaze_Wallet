import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

interface TicketDetailsProps {
  status: string;
  name: string;
  subject: string;
  priority: string;
  dateCreated: string;
}

const TicketDetails: React.FC<TicketDetailsProps> = ({ status, name, subject, priority, dateCreated }) => {
  const cardBackground = useThemeColor({ light: '#FFFFFF', dark: '#1A1A1A' }, 'card');
  const textColor = useThemeColor({ light: '#222222', dark: '#FFFFFF' }, 'text');
  const priorityColor = priority === 'High' ? 'red' : '#25AE7A';

  return (
    <View style={[styles.container, { backgroundColor: cardBackground }]}>
      <View style={styles.row}>
        <Text style={[styles.label, { color: textColor }]}>Status</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{status}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <Text style={[styles.label, { color: textColor }]}>Name</Text>
        <Text style={[styles.value, { color: textColor }]}>{name}</Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.label, { color: textColor }]}>Subject</Text>
        <Text style={[styles.value, { color: textColor }]}>{subject}</Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.label, { color: textColor }]}>Priority</Text>
        <Text style={[styles.value, { color: priorityColor }]}>{priority}</Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.label, { color: textColor }]}>Date Created</Text>
        <Text style={[styles.value, { color: textColor }]}>{dateCreated}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    margin: 16,
    borderWidth: 1,
    borderColor: '#25AE7A',
  },
  row: {
    flexDirection: 'row',
    gap: 45,
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 14,
  },
  statusBadge: {
    backgroundColor: '#25AE7A',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default TicketDetails;
