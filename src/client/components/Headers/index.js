import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
} from 'react-native';

import { styles } from './styles';

export default class ViewIcon extends Component {
  render() {
    const { title, logout } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.textPage}>{title}</Text>
        <View style={styles.separation} />
        <Button title='Déconnexion' onPress={() => logout()} />
      </View>
    );
  }
}
