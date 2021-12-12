import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Colors } from '../../../constants/colors';
import CartScreen from '../../../screens/cart/CartScreen';
import ProductsListScreen from '../../../screens/products/ProductsListScreen';
import BackButton from '../BackButton';
import CartButton from '../CartButton';

export type RootStackParamsList = {
  ProductsList: undefined;
  Cart: undefined;
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
      <Stack.Navigator
        screenOptions={{
          headerShadowVisible: false,
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
          headerLeft: props => <BackButton {...props} />,
          headerRight: () => <CartButton />,
        }}>
        <Stack.Screen
          name="ProductsList"
          component={ProductsListScreen}
          options={{
            title: 'Produtos',
          }}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{
            title: 'Carrinho',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
