import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet, GestureResponderEvent } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import images from '../../constants/images';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/constants/RootStackParamList';

// Define the navigation prop type for this screen
type NavigationProp = StackNavigationProp<RootStackParamList>;

// Define the interface for ServiceButton props
interface ServiceButtonProps {
  icon: string;
  label: string;
  onPress: (event: GestureResponderEvent) => void;
}

const ServiceButton: React.FC<ServiceButtonProps> = ({ icon, label, onPress }) => {
  return (
    <TouchableOpacity style={styles.serviceButton} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Image source={icon} style={styles.iconImage} />
      </View>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const ServiceOptions: React.FC = () => {
  const navigation = useNavigation<NavigationProp>(); // Properly type the navigation prop

  return (
    <View style={styles.container}>
      <Image source={images.indexService} style={styles.backgroundImage} />

      <View style={styles.overlay}>
        <ServiceButton
          icon={images.cil_send}
          label="Send"
          onPress={() => {
            console.log('Navigating to SendReceive with type:', { type: 'send' });
            navigation.navigate('SendReceive', { type: 'send' });
          }}
        />
        <View style={styles.divider} />
        <ServiceButton
          icon={images.cil_receive}
          label="Receive"
          onPress={() => {
            console.log('Navigating to SendReceive with type:', { type: 'receive' });
            navigation.navigate('SendReceive', { type: 'receive' });
          }}
        />

        <View style={styles.divider} />
        <ServiceButton
          icon={images.buy_index}
          label="Buy"
          onPress={() => navigation.navigate('Buy')}
        />
        <View style={styles.divider} />
        <ServiceButton
          icon={images.swap_indexpng}
          label="Swap"
          onPress={() => navigation.navigate('Swap')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 0,
  },
  backgroundImage: {
    width: '90%',
    height: 100,
    resizeMode: 'stretch',
  },
  overlay: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '90%',
    height: 80,
  },
  serviceButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  iconContainer: {
    backgroundColor: '#fff',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  icon: {
    fontSize: 24,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  divider: {
    width: 1,
    height: '60%',
    backgroundColor: '#fff',
  },
});

export default ServiceOptions;
