import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductsList from '../../screens/products/ProductsList';

export type RootStackParamsList = {
  ProductsList: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamsList>();

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ProductsList" component={ProductsList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
