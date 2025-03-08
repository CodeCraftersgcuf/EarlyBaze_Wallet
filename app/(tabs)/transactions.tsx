import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Image, Text } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import Header from '@/components/Header';
import TransactionTabs from '@/components/Transactions/TransactionTabs';
import TransactionsGraph from '@/components/Transactions/TransactionsGraph';
import TransactionList from '@/components/Transactions/TransactionList';
import FilterModal from '@/components/Transactions/FilterModal';
import transactionsData from '@/constants/transactionsData.json';
import { useThemeColor } from '@/hooks/useThemeColor';
import icons from '@/constants/icons';


//Code related to the integration:
import LoadingIndicator from '@/components/LoadingIndicator';
import { useQuery } from '@tanstack/react-query';
import { getFromStorage } from "@/utils/storage";
import {
  getTransactionAll
} from "@/utils/queries/appQueries";


const Transactions: React.FC = () => {
  const [token, setToken] = useState<string | null>(null); // State to hold the token
  const backgroundColor = useThemeColor({ light: '#EFFEF9', dark: '#000000' }, 'background');
  const subBackgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1A1A1A' }, 'background');
  const [activeTab, setActiveTab] = useState<string>('All');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const textColor = useThemeColor({ light: '#000000', dark: '#FFFFFF' }, 'text');
  const filterBackgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1A1A1A' }, 'background');
  // Convert "Processing" to check for "Pending" transactions
  const filterKey = selectedFilter === 'Processing' ? 'Pending' : selectedFilter;

  const bar = useThemeColor({ light: icons.bar, dark: icons.bar_black }, 'icon');
  const arrow = useThemeColor({ light: icons.arrow, dark: icons.arrow_black }, 'icon');

  const { data: transactionsResponse, error: transactionsError, isLoading: transactionsLoading } = useQuery<TransactionsResponse>(
    {
      queryKey: ["transactions"],
      queryFn: () => getTransactionAll({ token }),
      enabled: !!token, // Only run the query when the token is available
    }
  );

  // Ensure transactions data is set from the response
  const transactions = transactionsResponse?.data || [];

  console.log("🔹 Transactions:", transactions);
  // Ensure transactions data is available before filtering
  const filteredTransactions = transactions.length > 0
    ? transactions.filter(tx => {
      const tabMatch = activeTab === 'All' || tx.type.toLowerCase() === activeTab.toLowerCase();
      const statusMatch = filterKey === 'All' || tx.status.toLowerCase() === filterKey.toLowerCase();
      return tabMatch && statusMatch;
    })
    : [];


  // Fetch the token and user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      const fetchedToken = await getFromStorage("authToken");
      setToken(fetchedToken);
      console.log("🔹 Retrieved Token:", fetchedToken);
    };

    fetchUserData();
  }, []);





  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <Header title="Transactions" />

      {/* Transactions Tabs */}
      <View style={[styles.subContainer, { backgroundColor: subBackgroundColor }]}>
        <TransactionTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Show Filter Button When NOT on "All" Tab */}
        {activeTab !== 'All' && (
          <TouchableOpacity
            style={[styles.filterButton, { backgroundColor: filterBackgroundColor }, { width: 60 + selectedFilter.length * 7 }]} // Dynamic Width Based on Text Length
            onPress={() => setFilterModalVisible(true)}
          >
            <Image source={bar} style={styles.filterIcon} />
            <Text style={[styles.filterText, { color: textColor }]}>{selectedFilter}</Text>
            <Image source={arrow} style={styles.filterArrow} />
          </TouchableOpacity>
        )}

        <ScrollView contentContainerStyle={styles.contentContainer}>
          {/* Show Graph ONLY when "All" Tab is Active */}
          {/* {activeTab === 'All' ? <TransactionsGraph /> : null} */}

          {/* Transaction List */}
          {transactionsLoading ? (
            <LoadingIndicator message="Fetching transactions..." />
          ) : filteredTransactions.length === 0 ? (
            <Text style={{ textAlign: 'center', marginTop: 20, color: textColor }}>No Transaction found...</Text>
          ) : (
            <TransactionList transactions={filteredTransactions} />
          )}


        </ScrollView>
      </View>

      {/* Filter Modal */}
      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
    </ThemedView>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,

  },
  subContainer: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 10,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#B0B0B0',
    height: 40,
    marginTop: 10,
  },
  filterIcon: {
    width: 18,
    height: 18,
    marginRight: 5,
  },
  filterText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
    marginRight: 5,
  },
  filterArrow: {
    width: 12,
    height: 12,
    marginTop: 2,
    marginRight: 10,
  },
});
