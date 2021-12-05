import React from 'react';
import { TextInput, View } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../../constants/colors';
import styles from './styles';

const ProductsSearchInput = () => {
  return (
    <View style={styles.container}>
      <FeatherIcon name="search" color={Colors.LIGHT_ICON} size={20} />
      <TextInput
        style={styles.input}
        placeholder="Pesquisar..."
        placeholderTextColor={Colors.TEXT}
      />
    </View>
  );
};

export default ProductsSearchInput;
