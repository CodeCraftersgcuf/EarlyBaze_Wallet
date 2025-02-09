import React from 'react';
import { View, StyleSheet } from 'react-native';
import SettingsOption from './SettingsOption';

interface SettingsListProps {
  options: { title: string; image: any; onPress: () => void }[];
}

const SettingsList: React.FC<SettingsListProps> = ({ options }) => {
  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <SettingsOption key={index} {...option} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default SettingsList;
