import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { Header } from '@/components/Index/Header';
import { useThemeColor } from '@/hooks/useThemeColor';
import WalletCard from '@/components/Index/WalletCard';
import ServiceOptions from '@/components/Index/ServiceOptions';
import ImageSlider from '@/components/Index/ImageSlider';
import AssetsTab from '@/components/Index/AssetsTab';
import { useQuery } from '@tanstack/react-query';

import { getFromStorage } from "@/utils/storage";
import { getUserDetails } from "@/utils/queries/appQueries";

export default function HomeScreen() {
  const [token, setToken] = useState<string | null>(null); // State to hold the token
  const [isCrypto, setIsCrypto] = useState(true);
  const backgroundColor = useThemeColor({ light: '#EFFEF9', dark: '#000000' }, 'background');

  const toggleWallet = () => setIsCrypto(!isCrypto);

  // Fetch the token and user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      const fetchedToken = await getFromStorage("authToken");
      setToken(fetchedToken);
      console.log("🔹 Retrieved Token:", fetchedToken);
    };

    fetchUserData();
  }, []);

  const { data: userDetails, error: userError, isLoading: userLoading } = useQuery(
    {
      queryKey: ["userDetails"],
      queryFn: () => getUserDetails({ token }),
      enabled: !!token, // Only run the query when the token is available
    }
  );

  console.log("🔹 User Details:", userDetails);

  return (
    <ScrollView style={[styles.container, { backgroundColor }]} showsVerticalScrollIndicator={false}>
      <Header username={userDetails?.data.name} greeting="Good Morning" />
      <WalletCard isCrypto={isCrypto} onToggle={toggleWallet} />
      <ServiceOptions />
      <ImageSlider />
      <AssetsTab />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});
