import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Loader = ({ style = {} }) => (
    <View style={{ ...style }}>
      <ActivityIndicator size="large" />
    </View>
  );

export default Loader;
