import { useNavigation } from '@react-navigation/native';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import BackButton from '..';

describe('Back Button', () => {
  test('should not be visible if there is no route to go back', () => {
    const wrapper = render(<BackButton />);

    expect(wrapper.queryByTestId('back-button')).toBeNull();
  });

  test('should go back when pressed', () => {
    const goBackMock = jest.fn();

    (useNavigation as jest.Mock).mockReturnValueOnce({ goBack: goBackMock });

    const wrapper = render(<BackButton canGoBack />);

    const button = wrapper.getByTestId('back-button');

    fireEvent.press(button);

    expect(goBackMock).toHaveBeenCalled();
  });
});
