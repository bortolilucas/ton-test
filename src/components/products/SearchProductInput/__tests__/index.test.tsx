import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import type { TextInputProps } from 'react-native';
import SearchProductInput from '..';

describe('SearchProductInput', () => {
  test('should call on submit with correct value when fire onSubmitEditing', () => {
    const onSubmitMock = jest.fn();
    const searchText = 'Mock value';

    const wrapper = render(<SearchProductInput onSubmit={onSubmitMock} />);

    const input = wrapper.getByPlaceholderText('Pesquisar...');

    fireEvent.changeText(input, searchText);

    fireEvent(input, 'onSubmitEditing');

    expect(onSubmitMock).toHaveBeenCalledWith(searchText);
  });

  test('should call on submit with correct value when search button is pressed', () => {
    const onSubmitMock = jest.fn();
    const searchText = 'Mock value';

    const wrapper = render(<SearchProductInput onSubmit={onSubmitMock} />);

    const button = wrapper.getByTestId('search-button');
    const input = wrapper.getByPlaceholderText('Pesquisar...');

    fireEvent.changeText(input, searchText);

    fireEvent.press(button);

    expect(onSubmitMock).toHaveBeenCalledWith(searchText);
  });

  test('should clear input', () => {
    const wrapper = render(<SearchProductInput onSubmit={jest.fn()} />);

    const input = wrapper.getByPlaceholderText('Pesquisar...');
    fireEvent.changeText(input, 'Mock Value');

    const button = wrapper.getByTestId('clear-button');
    fireEvent.press(button);

    expect((input.props as TextInputProps).value).toBe('');
  });

  test('should call submit when change text value is empty', () => {
    const onSubmitMock = jest.fn();

    const wrapper = render(<SearchProductInput onSubmit={onSubmitMock} />);

    const input = wrapper.getByPlaceholderText('Pesquisar...');

    fireEvent.changeText(input, 'Mock Value');
    fireEvent.changeText(input, '');

    expect(onSubmitMock).toHaveBeenCalledTimes(1);
  });
});
