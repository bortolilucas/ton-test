import React, { useMemo, useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { CartContext, CartItemType } from '.';

import type { ProductType } from '../../api';

type RemoveItemConfig = {
  ignoreQtd?: boolean;
};

const CartProvider: React.FC = ({ children }) => {
  const [items, setItems] = useState<Map<number, CartItemType>>(
    () => new Map(),
  );

  const addItem = useCallback((newItem: ProductType) => {
    setItems(
      map =>
        new Map(
          map.set(newItem.id, {
            item: newItem,
            qtd: (map.get(newItem.id)?.qtd || 0) + 1,
          }),
        ),
    );
  }, []);

  const removeItem = useCallback(
    (id: number, { ignoreQtd = false }: RemoveItemConfig = {}) => {
      setItems(map => {
        const item = map.get(id);

        if (item) {
          if (item.qtd > 1 && !ignoreQtd) {
            map.set(id, { ...item, qtd: item.qtd - 1 });
          } else {
            map.delete(id);
          }
        } else {
          Alert.alert('Erro', 'Item não existe na lista');
        }

        return new Map(map);
      });
    },
    [],
  );

  const value = useMemo(
    () => ({
      items,
      setItems,
      addItem,
      removeItem,
    }),
    [addItem, items, removeItem],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
