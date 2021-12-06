import { StyleSheet } from 'react-native';
import { generateShadow } from 'react-native-shadow-generator';
import { Colors } from '../../../constants/colors';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    flex: 1,
    borderRadius: 20,
    margin: 12,
  },
  containerEmpty: {
    backgroundColor: Colors.TRANSPARENT,
  },
  containerImage: {
    width: '100%',
    height: 130,
    paddingTop: 15,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    color: Colors.LIGHT_TEXT,
    fontSize: 13.5,
    fontWeight: 'bold',
    paddingHorizontal: 14,
  },
  price: {
    flex: 1,
    color: Colors.TEXT,
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 6,
    paddingHorizontal: 14,
  },
  addButton: {
    ...generateShadow(10),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.TEXT,
    borderRadius: 20,
    marginTop: 13,
    marginHorizontal: 14,
    marginBottom: 15,
    height: 30,
  },
  circleButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  addButtonText: {
    flex: 1,
    color: Colors.WHITE,
    fontSize: 12.5,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
