import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import styles from './styles';
import { formatCurrency } from '../../../helpers/currency';
import EntypoIcon from 'react-native-vector-icons/Entypo';

import type { ProductType } from '../../../api';
import { Colors } from '../../../constants/colors';

type Props = {
  item: ProductType;
};

const ProductListItem = ({ item }: Props) => {
  if (item.empty) {
    return <View style={[styles.container, styles.containerEmpty]} />;
  }

  return (
    <Pressable style={styles.container}>
      <View style={styles.containerImage}>
        {!!item.image && (
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="contain"
          />
        )}
      </View>
      <Text numberOfLines={2} style={styles.title}>
        {item.title}
      </Text>
      <Text style={styles.price}>{formatCurrency(item.price)}</Text>
      <View style={styles.addButton}>
        <Text style={styles.addButtonText}>Adicionar</Text>
      </View>
    </Pressable>
  );
};

export default ProductListItem;
