import { render, RenderOptions } from '@testing-library/react-native';
import AllTestProviders from '../components/testing/AllTestProviders';
import type { CartProviderProps } from '../contexts/CartContext/provider';

const customRender = (
  ui: React.ReactElement,
  {
    cartProviderProps,
    ...rest
  }: RenderOptions & { cartProviderProps?: CartProviderProps } = {},
) => {
  return render(ui, { wrapper: AllTestProviders(cartProviderProps), ...rest });
};

export * from '@testing-library/react-native';
export { customRender as render };
