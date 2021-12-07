import React, { memo } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors } from '../../../constants/colors';
import type {
  AddItemType,
  CartItemType,
  RemoveItemType,
} from '../../../contexts/CartContext';
import { formatCurrency } from '../../../helpers/currency';
import { withOpacityStyle } from '../../../helpers/ui';
import styles from './styles';

type Props = {
  item: CartItemType;
  addItem: AddItemType;
  removeItem: RemoveItemType;
};

const CartItem = ({ item: { item, qtd }, addItem, removeItem }: Props) => {
  const handleAddItem = () => addItem(item);

  const handleRemoveOne = () => removeItem(item.id);

  const handleRemoveItem = () => removeItem(item.id, { ignoreQtd: true });

  return (
    <View style={styles.container}>
      <View style={styles.containerImage}>
        <Image
          style={styles.image}
          source={{ uri: item.image }}
          resizeMode="contain"
        />
      </View>
      <View style={styles.right}>
        <View style={styles.containerTexts}>
          <Text numberOfLines={3} style={styles.title}>
            {item.title}
          </Text>
          <Text style={styles.price}>{formatCurrency(item.price)}</Text>
        </View>
        <View style={styles.containerButtons}>
          <Pressable
            onPress={handleRemoveItem}
            style={withOpacityStyle(styles.circleButton)}>
            <FontAwesome5Icon name="times" color={Colors.TEXT} size={13} />
          </Pressable>
          <View style={styles.addButton}>
            <Pressable
              onPress={handleRemoveOne}
              style={withOpacityStyle(styles.circleButton)}>
              <FontAwesome5Icon name="minus" color={Colors.WHITE} size={11} />
            </Pressable>
            <Text style={styles.addButtonText}>{qtd}</Text>
            <Pressable
              onPress={handleAddItem}
              style={withOpacityStyle(styles.circleButton)}>
              <FontAwesome5Icon name="plus" color={Colors.WHITE} size={10} />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default memo(CartItem);
