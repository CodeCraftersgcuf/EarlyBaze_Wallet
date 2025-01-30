import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Header from '@/components/Header';
import BuyHead from '@/components/BuyHead';
import { useThemeColor } from '@/hooks/useThemeColor';
import BuyCard from '@/components/BuyCard';
import NoteBox from '@/components/Buy/NoteBox';
import PrimaryButton from '@/components/Buy/PrimaryButton';
import { useNavigation } from '@react-navigation/native';

const Buy: React.FC = () => {
  const backgroundColor = useThemeColor({ light: '#EFFEF9', dark: '#000000' }, 'background');
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor }]}>
      <View style={styles.horPadding}>
        <Header />
      </View>
      <View style={styles.content}>
        <BuyHead />
        <BuyCard />
        <NoteBox />
      </View>

      {/* Navigate to Payment Summary on Click */}
      <View style={styles.buttonContainer}>
        <PrimaryButton title="Proceed" onPress={() => navigation.navigate('PaymentSummary')} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 16,
  },
  horPadding: {
    marginTop: 10,
    paddingHorizontal: 16,
  },
  content: {
    paddingBottom: 16,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
});

export default Buy;
