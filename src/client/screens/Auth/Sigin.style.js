import { StyleSheet, Dimensions } from 'react-native';

const x = Dimensions.get('window').width;
const y = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
    margin: 10,
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20,
    width: x,
    height: y - 100,
  },
  titleContainer: {
    paddingTop: 20,
  },
  inputVew: {
    margin: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  labelInput: {
    paddingRight: 10,
    width: x / 4,
    color: 'red',
    fontWeight: 'bold',
  },
  TextInput: {
    padding: 10,
    borderWidth: 1,
    width: x / 2,
    borderRadius: 15,
    borderColor: 'red',
    color: 'red',
    fontWeight: 'bold',
  },
  messageShow: {
    textAlign: 'center',
    padding: 5,
    margin: 5,
    color: 'red',
  },
  errorShow: {
    textAlign: 'center',
    margin: 5,
    color: 'blue',
  },
  option: {
    paddingBottom: 5,
  },
  optionSeparatorStr: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  signinContainer: {
    flex: 1,
    margin: 7,
    padding: 10,
  },
  textPage: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  btn: {
    paddingLeft: 30,
    paddingRight: 30,
  },
  contentContainerStyle: {
    width: x,
    height: y - 10,
  },
  containerStyle: {
    padding: 10,
    height: 45,
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: 'white',
  },
});

export default styles;
