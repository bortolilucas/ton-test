import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import RootStack from '..';

describe('RootStack', () => {
  test('Should render products list screen as initial route', async () => {
    const { getByTestId } = render(<RootStack />);

    await waitFor(() => {
      getByTestId('products-list-screen');
    });
  });
});
