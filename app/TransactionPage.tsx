import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import Header from '@/components/Header';
import PrimaryButton from '@/components/Buy/PrimaryButton';
import TransactionStep from '@/components/Buy/TransactionStep';
import TransactionSuccess from '@/components/Buy/TransactionSuccess';
import TransactionSummaryModal from '@/components/Buy/TransactionSummaryModal';
import { useNavigation } from 'expo-router';
const TransactionPage: React.FC = () => {
  const backgroundColor = useThemeColor({ light: '#EFFEF9', dark: '#000000' }, 'background');
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor }]}>
      {/* Header */}
      <Header title="Transaction Page" />

      {/* Transaction Steps */}
      <View style={styles.progressContainer}>
        <View style={styles.progressLine} />

        <TransactionStep
          title="Transaction Submitted"
          description="Your transaction has been submitted successfully"
          date="27 Dec, 2024 - 05:22 PM"
          isCompleted
          hasButton
        />

        <TransactionStep
          title="Transaction Processed"
          description="Your transaction is being processed, your naira account will be credited soon."
          date="27 Dec, 2024 - 05:22 PM"
          isCompleted
          isProcessing
        />

        {/* Success Box */}
        <TransactionSuccess />
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <PrimaryButton title="Full Summary" onPress={() => setModalVisible(true)} />
        </View>
        <TouchableOpacity style={styles.closeButton}
        onPress={()=>{navigation.goBack()}}
        >
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <TransactionSummaryModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 3,
    paddingBottom: 20,
    paddingTop: 20,
  },
  progressContainer: {
    marginBottom: 20,
    position: 'relative',
    paddingHorizontal: 18,
  },
  progressLine: {
    position: 'absolute',
    left: -130,
    top: 170,
    width: 327,
    height: 0,
    borderWidth: 0.5,
    borderColor: '#9A9A9A',
    transform: [{ rotate: '90deg' }],
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 18,
  },
  buttonWrapper: {
    flex: 1,
    marginRight: 10,
  },
  closeButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#A0A0A0',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    height: 60,
    backgroundColor: 'white',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default TransactionPage;
