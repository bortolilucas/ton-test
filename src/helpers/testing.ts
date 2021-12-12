import { render, RenderOptions } from '@testing-library/react-native';
import AllTestProviders from '../components/testing/AllTestProviders';

const customRender = (ui: React.ReactElement, options?: RenderOptions) => {
  return render(ui, { wrapper: AllTestProviders, ...options });
};

export * from '@testing-library/react-native';
export { customRender as render };
