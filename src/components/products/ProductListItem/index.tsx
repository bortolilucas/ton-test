import React, { memo } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import type { ProductType } from '../../../api';
import type {
  AddItemType,
  RemoveItemType,
} from '../../../contexts/CartContext';
import { formatCurrency } from '../../../helpers/currency';
import { withOpacityStyle } from '../../../helpers/ui';
import styles from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Colors } from '../../../constants/colors';

type Props = {
  item: ProductType;
  addItem: AddItemType;
  removeItem: RemoveItemType;
  qtd?: number;
};

const ProductListItem = ({ item, qtd, addItem, removeItem }: Props) => {
  if (item.empty) {
    return (
      <View
        testID="empty-view"
        style={[styles.container, styles.containerEmpty]}
      />
    );
  }

  const handleAddItem = () => addItem(item);

  const handleRemoveItem = () => removeItem(item.id);

  return (
    <View style={styles.container}>
      <View style={styles.containerImage}>
        {!!item.image && (
          <Image
            testID="product-image"
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
      {qtd ? (
        <View style={styles.addButton}>
          <Pressable
            testID="minus-button"
            onPress={handleRemoveItem}
            style={withOpacityStyle(styles.circleButton)}>
            <FontAwesome5 name="minus" color={Colors.WHITE} size={13} />
          </Pressable>
          <Text style={styles.addButtonText}>{qtd}</Text>
          <Pressable
            testID="plus-button"
            onPress={handleAddItem}
            style={withOpacityStyle(styles.circleButton)}>
            <FontAwesome5 name="plus" color={Colors.WHITE} size={12} />
          </Pressable>
        </View>
      ) : (
        <Pressable
          testID="add-button"
          onPress={handleAddItem}
          style={withOpacityStyle(styles.addButton)}>
          <Text style={styles.addButtonText}>Adicionar</Text>
        </Pressable>
      )}
    </View>
  );
};

export default memo(ProductListItem);
