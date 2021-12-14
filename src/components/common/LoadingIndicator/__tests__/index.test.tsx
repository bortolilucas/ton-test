import { useHeaderHeight } from '@react-navigation/elements';
import React from 'react';
import LoadingIndicator from '..';
import { render } from '../../../../helpers/testing';

describe('Loading indicator', () => {
  test('should render with proper style', () => {
    (useHeaderHeight as jest.Mock).mockReturnValueOnce(20);

    const wrapper = render(<LoadingIndicator />);

    const container = wrapper.queryByTestId('loading-indicator');

    expect(container).toHaveStyle({ top: -20 });
  });
});
