import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import icons from '@/constants/icons';
import TransactionSummaryModal from '@/components/Buy/TransactionSummaryModal';

interface TransactionStepProps {
  title: string;
  description: string;
  date: string;
  isCompleted?: boolean;
  isProcessing?: boolean;
  hasButton?: boolean;
}

const TransactionStep: React.FC<TransactionStepProps> = ({
  title,
  description,
  date,
  isCompleted = false,
  isProcessing = false,
  hasButton = false,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  // Theme colors
  const backgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1A1A1A' }, 'background');
  const textColor = useThemeColor({ light: '#000000', dark: '#FFFFFF' }, 'text');
  const borderColor = useThemeColor({ light: '#EAEAEA', dark: '#333333' }, 'border');
  const buttonColor = useThemeColor({ light: '#22A45D', dark: '#157347' }, 'button');
  const labelColor = useThemeColor({ light: '#808080', dark: '#A0A0A0' }, 'label');

  return (
    <>
      <View style={styles.stepItem}>
        {/* Left Indicator (Checkmark or Number) */}
        <View style={isCompleted ? styles.stepCircle : styles.stepCircleNumber}>
          {isCompleted ? (
            <Image source={icons.check_circle} style={styles.checkIcon} />
          ) : (
            <Text style={styles.stepNumberText}>3</Text>
          )}
        </View>

        {/* Transaction Box */}
        <View style={[styles.transactionBox, { backgroundColor, borderColor }]}>
          <Text style={[styles.stepTitle, isProcessing && { color: '#E68A00' }, { color: textColor }]}>
            {title}
          </Text>
          <Text style={[styles.stepDescription, { color: labelColor }]}>{description}</Text>

          {hasButton && (
            <TouchableOpacity
              style={[styles.viewSummaryBtn, { backgroundColor: buttonColor }]}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.viewSummaryText}>View Summary</Text>
            </TouchableOpacity>
          )}

          <Text style={[styles.dateText, { color: labelColor }]}>{date}</Text>
        </View>
      </View>

      {/* Transaction Summary Modal */}
      <TransactionSummaryModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </>
  );
};

const styles = StyleSheet.create({
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#22A45D',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  stepCircleNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#22A45D',
    backgroundColor: '#EFFEF9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  stepNumberText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#22A45D',
  },
  checkIcon: {
    width: 16,
    height: 16,
  },
  transactionBox: {
    flex: 1,
    borderRadius: 10,
    padding: 15,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  stepDescription: {
    fontSize: 14,
    marginVertical: 5,
  },
  viewSummaryBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  viewSummaryText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  dateText: {
    fontSize: 12,
    marginTop: 5,
    alignSelf: 'flex-end',
  },
});

export default TransactionStep;
