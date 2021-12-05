import { StyleSheet } from 'react-native';
import { generateShadow } from 'react-native-shadow-generator';
import { Colors } from '../../../constants/colors';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    flex: 1,
    borderRadius: 20,
    margin: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  containerEmpty: {
    backgroundColor: Colors.TRANSPARENT,
  },
  containerImage: {
    width: '100%',
    height: 140,
    padding: 6,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    color: Colors.LIGHT_TEXT,
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  rowPrice: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  price: {
    flex: 1,
    color: Colors.TEXT,
    fontWeight: 'bold',
    fontSize: 15,
  },
  addButton: {
    ...generateShadow(3),
    width: 26,
    height: 26,
    borderRadius: 26 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.TEXT,
    marginRight: -2,
  },
});
