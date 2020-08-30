import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = {
  headList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'beige',
    padding: 10,
    margin: 8,
  },
  leftContainer: {
    width: width / 5,
  },
  centerContainer: {
    width: width / 6,
  },
  rigthContainer: {
    width: width / 7,
  },
  titleText: {
    fontWeight: 'bold',
  },
  leftAlignment: {
    textAlign: 'left',
  },
  rigthAlignment: {
    textAlign: 'left',
  },
  separate: {
    backgroundColor: 'white',
    padding: 10,
  },
};
