import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import CryptoList from '@/components/Assests/CryptoList';
import { useThemeColor } from '@/hooks/useThemeColor';
import marketData from '@/constants/marketData.json'


//Code realted to the integration
import { useQuery } from '@tanstack/react-query';
import { getMarketData } from '@/utils/queries/appQueries';
import { getFromStorage } from "@/utils/storage";
import LoadingIndicator from '@/components/LoadingIndicator';
import { useRouter, router } from 'expo-router';


const Market: React.FC = () => {
  const [token, setToken] = useState<string | null>(null); // State to hold the token
  const [showUsdPrice, setShowUsdPrice] = useState(true); // Toggle state
  const backgroundColor = useThemeColor({ light: '#EFFEF9', dark: '#000000' }, 'background');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch the token and user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      const fetchedToken = await getFromStorage("authToken");
      setToken(fetchedToken);
      console.log("🔹 Retrieved Token:", fetchedToken);
    };

    fetchUserData();
  }, []);

  const { data: marketDetail, error: userError, isLoading: userLoading } = useQuery(
    {
      queryKey: ["marketData"],
      queryFn: () => getMarketData({ token }),
      enabled: !!token, // Only run the query when the token is available
    }
  );

  console.log("🔹 marketData Details:", marketDetail);

  const formattedData =
    marketDetail?.map((item: any) => ({
      id: item.id,
      name: item.name,
      symbol: item.symbol.toUpperCase(),
      price: `$${item.current_price}`,
      usdPrice: showUsdPrice ? `$${item.ath}` : '*****', // Toggle visibility
      change: item.price_change_percentage_24h.toFixed(2), // Add `%` later in UI if needed
      marketCap: `$${(item.market_cap / 1e9).toFixed(2)}B`, // e.g., 1.23B
      icon: item.image,
    })) || [];

  if (userLoading) {
    return <LoadingIndicator message="Fetching market data..." />;
  }

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <Header
        title="Market"
        onFilterPress={() => router.push({
          pathname: '/SendReceive',
          params: { fromMarket: "market" },
        })
        } // Toggle USD Price on button press
      />

      {/* Search Bar */}
      <View style={styles.horPadding}>
        <SearchBar placeholder="Search Crypto" value={searchQuery} onChangeText={setSearchQuery} />
      </View>

      {/* Crypto List */}
      <CryptoList
        data={formattedData.filter(item =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )}
      />
    </ThemedView>
  );
};


export default Market;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  horPadding: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
});
