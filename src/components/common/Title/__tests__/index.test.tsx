import React from 'react';
import { render } from '../../../../helpers/testing';
import Title from '..';

describe('Title', () => {
  test('should render properly', () => {
    const wrapper = render(<Title>Mock test</Title>);

    wrapper.getByText('Mock test');
  });
});
