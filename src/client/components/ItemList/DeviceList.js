import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import { post } from '../../services/technique/api';

import { styles } from './RibList.styles';

const postPush = async (registration_ids, user) => {
  const data = {
    registration_ids,
  };
  const send = await post('device/send/push', data, user.token);
  console.log({ send });
};

export const DeviceList = ({ uuid, deviseInfo, token, user = {} }) => (
    <View>
      <TouchableOpacity onPress={async () => await postPush(token, user)}>
        <View style={styles.headList}>
          <View style={styles.centerContainer}>
            <Text numberOfLines={1} style={[styles.titleText, styles.rigthAlignment]}>{uuid}</Text>
          </View>
          <View style={styles.centerContainer}>
            <Text numberOfLines={1} style={[styles.titleText, styles.rigthAlignment]}>{deviseInfo}</Text>
          </View>
          <View style={styles.rigthContainer}>
            <Text numberOfLines={1} style={[styles.titleText, styles.rigthAlignment]}>{token}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.separate} />
    </View>
  );
