import React from 'react';
import { StatusBar } from 'react-native';
import RootStack from './navigation/RootStack';

const App = () => {
  return (
    <>
      <StatusBar translucent />
      <RootStack />
    </>
  );
};

export default App;
