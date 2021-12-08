import React from 'react';
import { StatusBar } from 'react-native';
import RootStack from './components/navigation/RootStack';
import { Colors } from './constants/colors';
import CartProvider from './contexts/CartContext/provider';

const App = () => {
  return (
    <CartProvider>
      <StatusBar
        translucent
        backgroundColor={Colors.TRANSPARENT}
        barStyle="dark-content"
      />
      <RootStack />
    </CartProvider>
  );
};

export default App;
