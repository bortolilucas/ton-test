import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LoadingProvider from '../../contexts/LoadingContext/provider';
import ProductsList from '../../screens/products/ProductsList';

export type RootStackParamsList = {
  ProductsList: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamsList>();

const RootStack = () => {
  return (
    <NavigationContainer>
      <LoadingProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="ProductsList"
            component={ProductsList}
            options={{ title: 'Produtos' }}
          />
        </Stack.Navigator>
      </LoadingProvider>
    </NavigationContainer>
  );
};

export default RootStack;
