import { StyleSheet } from 'react-native';
import { generateShadow } from 'react-native-shadow-generator';
import { Colors } from '../../../constants/colors';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 10,
    backgroundColor: Colors.WHITE,
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderRadius: 20,
    ...generateShadow(4),
  },
  containerImage: {
    width: 75,
    height: 75,
    paddingVertical: 3,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: Colors.WHITE,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    color: Colors.LIGHT_TEXT,
    fontSize: 14.5,
    fontWeight: 'bold',
  },
  price: {
    color: Colors.TEXT,
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 6,
  },
  right: {
    flexDirection: 'row',
    flex: 1,
    paddingLeft: 15,
  },
  containerTexts: {
    flex: 1,
    paddingRight: 15,
    justifyContent: 'center',
  },
  containerButtons: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  addButton: {
    ...generateShadow(10),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.TEXT,
    borderRadius: 20,
    height: 28,
    marginBottom: -1,
  },
  circleButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  addButtonText: {
    paddingHorizontal: 5,
    color: Colors.WHITE,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
