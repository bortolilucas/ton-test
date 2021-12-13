import React from 'react';
import CartProvider, {
  CartProviderProps,
} from '../../../contexts/CartContext/provider';
import TestSafeAreaProvider from '../TestSafeAreaProvider';

const AllTestProviders =
  (props: CartProviderProps = {}): React.FC =>
  ({ children }) => {
    return (
      <TestSafeAreaProvider>
        <CartProvider {...props}>{children}</CartProvider>
      </TestSafeAreaProvider>
    );
  };

export default AllTestProviders;
