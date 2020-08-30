import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

import Image from '../../ressources/image';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

const Background = (props) => (
  <ImageBackground source={Image.background} style={styles.container}>
    {props.children}
  </ImageBackground>
);

export default Background;
