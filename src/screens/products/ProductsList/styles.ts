import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/colors';

export default StyleSheet.create({
  flatListContent: {
    flexGrow: 1,
    paddingHorizontal: 25,
  },
  columnWrapper: {
    marginHorizontal: -12,
  },
  title: {
    color: Colors.TEXT,
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 5,
    letterSpacing: 0.5,
  },
  activityIndicatorPage: {
    marginTop: 10,
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 25,
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
