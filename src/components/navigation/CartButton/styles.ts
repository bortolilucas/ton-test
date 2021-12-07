import { StyleSheet } from 'react-native';
import { generateShadow } from 'react-native-shadow-generator';
import { Colors } from '../../../constants/colors';

export default StyleSheet.create({
  cartButton: {
    paddingHorizontal: 15,
  },
  qtdIndicator: {
    ...generateShadow(2),
    width: 18,
    height: 18,
    paddingHorizontal: 2,
    borderRadius: 18 / 2,
    position: 'absolute',
    top: -5,
    right: 7,
    backgroundColor: Colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtdIndicatorText: {
    color: Colors.TEXT,
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
