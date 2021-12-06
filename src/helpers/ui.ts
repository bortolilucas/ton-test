import type {
  PressableStateCallbackType,
  StyleProp,
  ViewStyle,
} from 'react-native';

export const withOpacityStyle =
  (style: StyleProp<ViewStyle>) =>
  ({ pressed }: PressableStateCallbackType): StyleProp<ViewStyle> =>
    [style, { opacity: pressed ? 0.5 : 1 }];
