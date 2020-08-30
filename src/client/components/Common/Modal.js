import React, { Component } from 'react';
import { Text, View, Platform, Modal, StyleSheet, TouchableOpacity, Button } from 'react-native';
import ModalWeb from 'modal-react-native-web';

const ModalWebMobile = Platform.OS === 'web' ? ModalWeb : Modal;
const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: 'rgba(68, 75, 84, 0.9)',
    marginTop: 22,
  },
  modalContainer: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    paddingTop: 10,
    paddingBottom: 10,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flex: 1,
  },
  closeStyle: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
  },
  btnContainer: {
    padding: 10,
  },
});

export default class ModalComponent extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    const { modalVisible, setModalVisible, children } = this.props;
    return (
      <View style={styles.modal}>
        <ModalWebMobile
          animationType="slide"
          transparent
          visible={modalVisible}
          // eslint-disable-next-line no-undef
          appElement={Platform.OS === 'web' && document && document.getElementById('root')}
        >
          <View style={styles.modalContainer}>
            <View style={styles.closeStyle}>
              <View />
              <View>
                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                  <Text>x</Text>
                </TouchableOpacity>
              </View>
            </View>
            {children}
            <View style={styles.btnContainer}>
              <Button
                onPress={() => setModalVisible(!modalVisible)}
                title='OK'
              />
            </View>
          </View>
        </ModalWebMobile>
      </View>
    );
  }
}
