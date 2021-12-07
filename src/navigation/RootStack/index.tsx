import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Colors } from '../../constants/colors';
import CartProvider from '../../contexts/CartContext/provider';
import ProductsList from '../../screens/products/ProductsList';
import CartButton from '../CartButton';

export type RootStackParamsList = {
  ProductsList: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamsList>();

const RootStack = () => {
  return (
    <NavigationContainer
      theme={{
        colors: {
          background: Colors.BACKGROUND,
          text: Colors.TEXT,
          card: Colors.BACKGROUND,
          notification: Colors.TEXT,
          border: Colors.TEXT,
          primary: Colors.TEXT,
        },
        dark: false,
      }}>
      <CartProvider>
        <Stack.Navigator
          screenOptions={{
            headerShadowVisible: false,
          }}>
          <Stack.Screen
            name="ProductsList"
            component={ProductsList}
            options={{
              title: 'Produtos',
              headerRight: () => <CartButton />,
            }}
          />
        </Stack.Navigator>
      </CartProvider>
    </NavigationContainer>
  );
};

export default RootStack;
