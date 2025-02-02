import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import icons from '@/constants/icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRouter, router } from 'expo-router';

interface TransactionItemProps {
  type: string;
  amount: string;
  date: string;
  status: string;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ type, amount, date, status }) => {
  const backgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1A1A1A' }, 'background');
  const textColor = useThemeColor({ light: '#000000', dark: '#FFFFFF' }, 'text');

  // Define colors for different statuses
  const statusColors: Record<string, string> = {
    successful: '#139B15',
    pending: '#E0B711',
    failed: '#E51616',
  };

  const statusColor = statusColors[status.toLowerCase()] || '#888';

  // Get icon based on transaction type
  const iconSource = icons.share;

  return (
    <TouchableOpacity style={[styles.itemContainer, { backgroundColor }]} onPress={() => router.push('/TransactionSummary')} >
      <View style={styles.leftContainer}>
        {/* Transaction Type Icon */}
        <View style={[styles.iconWrapper, { backgroundColor: `${statusColor}30` }]}>
          <Image source={iconSource} style={styles.icon} />
        </View>

        {/* Transaction Details */}
        <View>
          <Text style={[styles.transactionType, { color: textColor }]}>USDT</Text>
          <View style={styles.statusContainer}>
            <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
            <Text style={[styles.transactionStatus, { color: statusColor }]}>{status}</Text>
          </View>
        </View>
      </View>

      {/* Amount & Date */}
      <View style={styles.rightContainer}>
        <Text style={[styles.amount, { color: textColor }]}>{amount}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>

      {/* Arrow Icon */}
      <Ionicons name="chevron-forward" size={20} color="#888" />
    </TouchableOpacity>
  );
};

export default TransactionItem;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 15,
    marginHorizontal: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  transactionType: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 5,
  },
  transactionStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
  rightContainer: {
    alignItems: 'flex-end',
    flexGrow: 1,
    marginRight: 10,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
});
