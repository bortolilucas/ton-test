import React from 'react';
import AppStatusBar from './components/common/AppStatusBar';
import RootStack from './components/navigation/RootStack';
import { Colors } from './constants/colors';
import CartProvider from './contexts/CartContext/provider';

const App = () => {
  return (
    <CartProvider>
      <AppStatusBar
        translucent
        backgroundColor={Colors.TRANSPARENT}
        barStyle="dark-content"
      />
      <RootStack />
    </CartProvider>
  );
};

export default App;
