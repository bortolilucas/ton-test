import React from 'react';
import { StatusBar } from 'react-native';
import RootStack from './components/navigation/RootStack';
import { Colors } from './constants/colors';

const App = () => {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor={Colors.TRANSPARENT}
        barStyle="dark-content"
      />
      <RootStack />
    </>
  );
};

export default App;
