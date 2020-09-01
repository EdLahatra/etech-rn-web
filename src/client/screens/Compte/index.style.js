import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  body: {
    justifyContent: 'center',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
    margin: 10,
  },
  datesContainer: {
    flex: 0.3,
    marginBottom: 30,
  },
  titleLabel: {
    alignItems: 'center',
  },
  textLabel: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  periodLabel: {
    paddingBottom: 5,
  },
  pickerDateContainer: {
    marginBottom: 40,
  },
  simpleDPcontainer: {
    flex: 1,
    flexDirection: 'row',
  },
  yearStyle: {
    flex: 1,
    marginRight: 5,
  },
  monthStyle: {
    flex: 1,
    marginRight: 5,
  },
  dayStyle: {
    flex: 1,
  },
  textStyle: {
    fontSize: 16,
  },
  ribListStyle: {
    flex: 1,
  },
});

export default styles;
