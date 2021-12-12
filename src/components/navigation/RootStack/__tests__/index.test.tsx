import { render } from '@testing-library/react-native';
import React from 'react';
import RootStack from '..';

describe('RootStack', () => {
  test('should match snapshot', () => {
    const tree = render(<RootStack />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
