import { StyleSheet } from 'react-native';
import { generateShadow } from 'react-native-shadow-generator';
import { Colors } from '../../../constants/colors';

export default StyleSheet.create({
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 25,
    ...generateShadow(4),
  },
  input: {
    flex: 1,
    color: Colors.TEXT,
    fontWeight: 'bold',
    fontSize: 13.5,
  },
  searchButton: {
    paddingLeft: 15,
    paddingRight: 13,
  },
  clearButton: {
    height: '100%',
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
