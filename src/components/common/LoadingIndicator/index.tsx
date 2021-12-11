import { useHeaderHeight } from '@react-navigation/elements';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Colors } from '../../../constants/colors';
import styles from './styles';

const LoadingIndicator = () => {
  const headerHeight = useHeaderHeight();

  return (
    <View
      testID="loading-indicator"
      style={[styles.container, { top: -headerHeight }]}>
      <ActivityIndicator size="large" color={Colors.TEXT} />
    </View>
  );
};

export default LoadingIndicator;
