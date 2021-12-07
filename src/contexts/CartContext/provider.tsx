import React, { useMemo, useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { CartContext, CartContextType, CartItemType, RemoveItemType } from '.';

import type { ProductType } from '../../api';

const CartProvider: React.FC = ({ children }) => {
  const [items, setItems] = useState<{ [key: string]: CartItemType }>({});

  const addItem = useCallback((newItem: ProductType) => {
    setItems(values => ({
      ...values,
      [newItem.id]: {
        item: newItem,
        qtd: (values[newItem.id]?.qtd || 0) + 1,
      },
    }));
  }, []);

  const removeItem: RemoveItemType = useCallback(
    (id: number, { ignoreQtd = false } = {}) => {
      setItems(values => {
        const item = values[id];

        if (!item) {
          Alert.alert('Erro', 'Item não existe na lista');
          return values;
        }

        const newValues = { ...values };

        if (item.qtd > 1 && !ignoreQtd) {
          newValues[id] = { ...item, qtd: item.qtd - 1 };
        } else {
          delete newValues[id];
        }

        return newValues;
      });
    },
    [],
  );

  const value: CartContextType = useMemo(() => {
    const itemsArray = Object.values(items);

    return {
      items,
      itemsArray,
      setItems,
      addItem,
      removeItem,
      qtdTotal: itemsArray.reduce((acc, cur) => acc + cur.qtd, 0),
    };
  }, [addItem, items, removeItem]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
