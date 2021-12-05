import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Colors } from '../../constants/colors';
import LoadingProvider from '../../contexts/LoadingContext/provider';
import ProductsList from '../../screens/products/ProductsList';

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
      <LoadingProvider>
        <Stack.Navigator
          screenOptions={{
            headerShadowVisible: false,
          }}>
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
