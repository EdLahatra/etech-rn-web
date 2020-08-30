import React from 'react';
import {
  View,
  Text,
} from 'react-native';

import { styles } from './RibList.styles';

export const RibList = ({ attribut, attribut1, attribut2 }) => (
    <View>
      <View>
        <View style={styles.headList}>
          <View style={styles.centerContainer}>
            <Text style={[styles.titleText, styles.rigthAlignment]}>{attribut}</Text>
          </View>
          <View style={styles.centerContainer}>
            <Text style={[styles.titleText, styles.rigthAlignment]}>{attribut1}</Text>
          </View>
          <View style={styles.rigthContainer}>
            <Text style={[styles.titleText, styles.rigthAlignment]}>{attribut2}</Text>
          </View>
        </View>
      </View>
      <View style={styles.separate} />
    </View>
  );
