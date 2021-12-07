import React from 'react';
import { FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CartItem from '../../../components/cart/CartItem';
import Title from '../../../components/common/Title';
import type { CartItemType } from '../../../contexts/CartContext';
import useCart from '../../../hooks/useCart';
import styles from './styles';

const CartScreen = () => {
  const { itemsArray, addItem, removeItem, qtdTotal } = useCart();
  const { bottom } = useSafeAreaInsets();

  return (
    <FlatList
      keyExtractor={keyExtractor}
      data={itemsArray}
      contentContainerStyle={[
        styles.flatListContent,
        { paddingBottom: bottom },
      ]}
      ListHeaderComponent={
        <Title style={styles.title}>
          {qtdTotal > 0
            ? `${qtdTotal} produtos adicionados`
            : 'Nenhum produto adicionado'}
        </Title>
      }
      renderItem={({ item }) => (
        <CartItem item={item} addItem={addItem} removeItem={removeItem} />
      )}
    />
  );
};

const keyExtractor = (e: CartItemType) => e.item.id.toString();

export default CartScreen;
