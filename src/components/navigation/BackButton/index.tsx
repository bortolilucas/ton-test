import { useNavigation } from '@react-navigation/native';
import type { HeaderBackButtonProps } from '@react-navigation/elements';
import React from 'react';
import { Pressable } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../../../constants/colors';
import { withOpacityStyle } from '../../../helpers/ui';
import styles from './styles';

const BackButton = ({ canGoBack }: HeaderBackButtonProps) => {
  const { goBack } = useNavigation();

  if (!canGoBack) {
    return null;
  }

  return (
    <Pressable
      testID="back-button"
      onPress={goBack}
      style={withOpacityStyle(styles.container)}>
      <FontAwesome name="angle-left" color={Colors.TEXT} size={38} />
    </Pressable>
  );
};

export default BackButton;
