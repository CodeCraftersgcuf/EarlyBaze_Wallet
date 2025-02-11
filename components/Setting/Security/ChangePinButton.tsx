import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ChangePinButtonProps {
  onPress: () => void;
}

const ChangePinButton: React.FC<ChangePinButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>Change Pin</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#22A45D',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChangePinButton;
