import React from 'react';
import { StatusBar, StatusBarProps } from 'react-native';
import { Colors } from '../../../constants/colors';

const AppStatusBar = (props: StatusBarProps) => {
  return (
    <StatusBar
      translucent
      backgroundColor={Colors.TRANSPARENT}
      barStyle="dark-content"
      {...props}
    />
  );
};

export default AppStatusBar;
