import React from 'react';
import AppStatusBar from './components/common/AppStatusBar';
import RootStack from './components/navigation/RootStack';
import CartProvider from './contexts/CartContext/provider';

const App = () => {
  return (
    <CartProvider>
      <AppStatusBar />
      <RootStack />
    </CartProvider>
  );
};

export default App;
