import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
