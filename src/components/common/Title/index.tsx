import React from 'react';
import { Text, TextProps } from 'react-native';
import styles from './styles';

const Title: React.FC<TextProps> = ({ style, ...rest }) => {
  return <Text {...rest} style={[styles.title, style]} />;
};

export default Title;
