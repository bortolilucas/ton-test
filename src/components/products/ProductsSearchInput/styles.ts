import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/colors';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 25,
    paddingLeft: 15,
  },
  input: {
    flex: 1,
    color: Colors.TEXT,
    fontWeight: 'bold',
    fontSize: 13.5,
    marginLeft: 13,
  },
});
