import React from 'react';
import CartProvider from '../../../contexts/CartContext/provider';
import TestSafeAreaProvider from '../TestSafeAreaProvider';

const AllTestProviders: React.FC = ({ children }) => {
  return (
    <TestSafeAreaProvider>
      <CartProvider>{children}</CartProvider>
    </TestSafeAreaProvider>
  );
};

export default AllTestProviders;
