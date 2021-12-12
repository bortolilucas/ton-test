import { render, RenderOptions } from '@testing-library/react-native';
import CartProvider from '../contexts/CartContext/provider';

const customRender = (ui: React.ReactElement, options?: RenderOptions) => {
  return render(ui, { wrapper: CartProvider, ...options });
};

export * from '@testing-library/react-native';

export { customRender as render };
