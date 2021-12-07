import React, { useState } from 'react';
import { Pressable, TextInput, TextInputProps, View } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../../constants/colors';
import { withOpacityStyle } from '../../../helpers/ui';
import styles from './styles';

type Props = TextInputProps & {
  onSubmit: (text: string) => void;
};

const SearchProductInput = ({ onSubmit, ...rest }: Props) => {
  const [value, setValue] = useState('');

  const onChangeText = (text: string) => {
    setValue(text);

    !text && onSubmit(text);
  };

  const handleSubmit = () => onSubmit(value);

  const onClearPress = () => onChangeText('');

  return (
    <View style={styles.containerInput}>
      <Pressable
        onPress={handleSubmit}
        style={withOpacityStyle(styles.searchButton)}>
        <FeatherIcon name="search" color={Colors.LIGHT_ICON} size={20} />
      </Pressable>
      <TextInput
        style={styles.input}
        placeholder="Pesquisar..."
        placeholderTextColor={Colors.TEXT}
        onChangeText={onChangeText}
        onSubmitEditing={handleSubmit}
        returnKeyType="search"
        value={value}
        {...rest}
      />
      <Pressable
        onPress={onClearPress}
        style={withOpacityStyle(styles.clearButton)}>
        <FeatherIcon name="close" color={Colors.LIGHT_ICON} size={23} />
      </Pressable>
    </View>
  );
};

export default SearchProductInput;
