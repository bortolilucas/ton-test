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
});
