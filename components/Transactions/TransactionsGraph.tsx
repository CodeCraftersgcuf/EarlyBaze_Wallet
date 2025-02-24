import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { useThemeColor } from '@/hooks/useThemeColor';
import transactionsData from '@/constants/transactionsData.json';

const screenWidth = Dimensions.get('window').width * 0.9;

const TransactionsGraph: React.FC = () => {
  const backgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1A1A1A' }, 'background') || '#FFFFFF';
  const borderColor = useThemeColor({ light: '#22A45D', dark: '#157347' }, 'border') || '#22A45D';
  const textColor = useThemeColor({ light: '#000000', dark: '#FFFFFF' }, 'text') || '#000000';

  // Group transactions by type and count occurrences
  const transactionCounts = {
    send: transactionsData.filter(tx => tx.type === 'send').length || 0,
    receive: transactionsData.filter(tx => tx.type === 'receive').length || 0,
    buy: transactionsData.filter(tx => tx.type === 'buy').length || 0,
    swap: transactionsData.filter(tx => tx.type === 'swap').length || 0,
    withdraw: transactionsData.filter(tx => tx.type === 'withdraw').length || 0,
  };

  // Chart Data
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [
          transactionCounts.send,
          transactionCounts.buy,
          transactionCounts.withdraw,
          transactionCounts.receive,
          transactionCounts.swap,
          transactionCounts.buy,
        ],
      },
    ],
  };

  return (
    <View style={[styles.container, { backgroundColor, borderColor }]}>
      <BarChart
        data={data}
        width={screenWidth}
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        fromZero
        chartConfig={{
          backgroundGradientFrom: backgroundColor,
          backgroundGradientTo: backgroundColor,
          color: () => textColor,
          barPercentage: 0.6,
          decimalPlaces: 0,
        }}
        style={styles.chart}
      />

      {/* Graph Legend */}
      <View style={styles.legendContainer}>
        <View style={styles.legendRow}>
          <View style={[styles.legendDot, { backgroundColor: '#22A45D' }]} />
          <Text style={[styles.legendText, { color: textColor }]}>Send Transactions</Text>
        </View>
        <View style={styles.legendRow}>
          <View style={[styles.legendDot, { backgroundColor: '#5D3FD3' }]} />
          <Text style={[styles.legendText, { color: textColor }]}>Buy Transactions</Text>
        </View>
        <View style={styles.legendRow}>
          <View style={[styles.legendDot, { backgroundColor: '#000000' }]} />
          <Text style={[styles.legendText, { color: textColor }]}>Withdrawals</Text>
        </View>
        <View style={styles.legendRow}>
          <View style={[styles.legendDot, { backgroundColor: '#800000' }]} />
          <Text style={[styles.legendText, { color: textColor }]}>Receive Transactions</Text>
        </View>
        <View style={styles.legendRow}>
          <View style={[styles.legendDot, { backgroundColor: '#8A2BE2' }]} />
          <Text style={[styles.legendText, { color: textColor }]}>Swap Transactions</Text>
        </View>
      </View>
    </View>
  );
};

export default TransactionsGraph;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 16,
    borderWidth: 1,
    padding: 12,
  },
  chart: {
    borderRadius: 10,
  },
  legendContainer: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
    marginBottom: 5,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
  },
});
