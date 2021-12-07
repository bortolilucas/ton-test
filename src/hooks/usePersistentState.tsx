import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

export default function <T>(
  persistKey: string,
  initialValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    const retrieveState = async () => {
      try {
        const persisted = await AsyncStorage.getItem(persistKey);

        persisted && setState(JSON.parse(persisted));
      } catch (error: any) {
        Alert.alert('Erro', error.message);
      }
    };

    retrieveState();
  }, [persistKey]);

  useEffect(() => {
    const saveState = async () => {
      try {
        await AsyncStorage.setItem(persistKey, JSON.stringify(state));
      } catch (error: any) {
        Alert.alert('Erro', error.message);
      }
    };

    saveState();
  }, [persistKey, state]);

  return [state, setState];
}
