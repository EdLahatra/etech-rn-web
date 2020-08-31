import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = {
  sectionStyle: {
    flexDirection: 'row',
    backgroundColor: 'grey',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
  },
  theadStyle: {
    justifyContent: 'space-between',
    padding: 10,
  },
  showTotal: {
    flex: 0.5,
  },
  titleView: {
    flex: 0.2,
  },
  titleEnd: {
    flex: 0.02,
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
  empty_operation: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 30,
  },
  empty_text: {
    backgroundColor: 'white',
    fontWeight: 'bold',
    fontStyle: 'italic',
    padding: 4,
  },
};
