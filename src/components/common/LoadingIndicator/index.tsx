import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Colors } from '../../../constants/colors';
import styles from './styles';

const LoadingIndicator = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.TEXT} />
    </View>
  );
};

export default LoadingIndicator;
