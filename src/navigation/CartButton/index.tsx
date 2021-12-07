import React from 'react';
import { Pressable, Text, View } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors } from '../../constants/colors';
import { withOpacityStyle } from '../../helpers/ui';
import useCart from '../../hooks/useCart';
import styles from './styles';

const CartButton = () => {
  const { qtdTotal } = useCart();

  return (
    <Pressable style={withOpacityStyle(styles.cartButton)}>
      <FontAwesome5Icon name="shopping-cart" color={Colors.TEXT} size={24} />
      {!!qtdTotal && (
        <View style={styles.qtdIndicator}>
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style={styles.qtdIndicatorText}>
            {qtdTotal}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

export default CartButton;
