import React from 'react';
import {
  SafeAreaProvider,
  SafeAreaViewProps,
} from 'react-native-safe-area-context';

const TestSafeAreaProvider: React.FC<SafeAreaViewProps> = props => (
  <SafeAreaProvider
    initialMetrics={{
      frame: { x: 0, y: 0, width: 0, height: 0 },
      insets: { top: 0, left: 0, right: 0, bottom: 0 },
    }}
    {...props}
  />
);

export default TestSafeAreaProvider;
