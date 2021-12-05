import { createContext } from 'react';

export type LoadingContextType = {
  setLoading: (value: boolean) => void;
};

export const LoadingContext = createContext<LoadingContextType>({
  setLoading: () => {},
});
