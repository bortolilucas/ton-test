import AsyncStorage from '@react-native-async-storage/async-storage';
import { act, cleanup, renderHook } from '@testing-library/react-hooks';
import usePersistentState from '../usePersistentState';

const initialValue = { title: 'Mock Data' };
const newValue = { title: 'Mock Data 2' };

const clearHook = async () => {
  cleanup();
  await AsyncStorage.clear();
};

describe('usePersistanteState', () => {
  test('should have correct initial values', async () => {
    const { result } = renderHook(() =>
      usePersistentState('test', initialValue),
    );

    expect(result.current[0]).toEqual(initialValue);

    await clearHook();
  });

  test('should save items correctly', async () => {
    const { result } = renderHook(() => usePersistentState('test', {}));

    act(() => {
      result.current[1](newValue);
    });

    expect(result.current[0]).toEqual(newValue);
  });

  test('should retrive last saved data', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      usePersistentState('test', {}),
    );

    await waitForNextUpdate();

    expect(result.current[0]).toEqual(newValue);
  });
});
