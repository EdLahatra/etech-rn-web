import * as React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import styles from './styles';
import { entity } from '../../../config/constants';

import state from '../../services/redux/constants/state';

const signTitle = 'Create Entity';

const SignInScreen = (props) => {
  const { createEntity, getComptes } = props;
  const [email, setEmail] = React.useState('test');
  const [password, setPassword] = React.useState('test1');
  const [username, setUsername] = React.useState('test2');
  const [messageall, setMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const callBack = (res) => {
    setLoading(false);

    if (res && res.data) {
      setMessage(entity.succes);
      getComptes();
    }

  };

  const createCompte = async () => {
    setMessage('');
    const data = { attribut: email, attribut1: password, attribut2: username, state: state.created };
    await createEntity(data, (res) => callBack(res));
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
      >
        <View style={styles.body}>
          <View style={styles.titleContainer}>
            <Text style={styles.textPage}>Add Entity</Text>
          </View>
          <View>
            <View style={styles.inputVew}>
            <Text style={styles.labelInput}>{entity.username}</Text>
              <TextInput
                placeholder={entity.username}
                value={username}
                onChangeText={setUsername}
                style={styles.TextInput}
              />
            </View>
            <View style={styles.inputVew}>
              <Text style={styles.labelInput}>{entity.identification}</Text>
              <TextInput
                placeholder={entity.identification}
                value={email}
                onChangeText={setEmail}
                style={styles.TextInput}
              />
            </View>
            <View style={styles.inputVew}>
              <Text style={styles.labelInput}>{entity.password}</Text>
              <TextInput
                placeholder={entity.password}
                value={password}
                onChangeText={setPassword}
                style={styles.TextInput}
                // autoCompleteType={entity.password}
              />
            </View>
            <Text style={styles.messageShow}>{messageall}</Text>
          </View>
          <View>
            {!loading ? <Button
              // disabled={isInvalidate}
              onPress={async () => await createCompte()}
              title={signTitle}
              color={'blue'}
              style={styles.btn}
            /> :
              <ActivityIndicator size={'large'} />}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignInScreen;
