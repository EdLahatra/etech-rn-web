import * as React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import styles from './styles';
import Modal from '../../components/Common/Modal';
import validator from '../../../validator/users';
import { auth } from '../../../config/constants';

const { validatorUsers } = validator;

const signTitle = auth.signUp;

const DisplyErrorComponet = ({ errors, name }) => {
  if (!errors || !name) {
    return <View />;
  }
  return (
    <View style={styles.inputVew}>
      <Text style={styles.errorShow}>{errors}</Text>
    </View>
  );
};

const roles = (r) => (r === 1 ? auth.user_usr : auth.user_adm);

const ModalRole = ({ setRole, role }) => (
  <View>
    <Text style={styles.modalRoleTitle}>{auth.role}</Text>
    <View style={styles.modalRoleContaint}>
      <TouchableOpacity onPress={() => setRole(1)}>
        <Text style={[styles.modalRoleText, { backgroundColor: role === 1 ? 'beige' : 'white' }]}>{roles(1)}</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.modalRoleContaint}>
      <TouchableOpacity onPress={() => setRole(2)}>
        <Text style={[styles.modalRoleText, { backgroundColor: role === 2 ? 'beige' : 'white' }]}>{roles(2)}</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const SignInScreen = (props) => {
  const { signUp, user } = props;
  const [email, setEmail] = React.useState(user ? user.email : '');
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState(user ? user.username : '');
  const [role, setRole] = React.useState(1);
  const [messageall, setMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [, setRoleModal] = React.useState(false);

  const callBack = (res) => {
    setRole(1);
    setLoading(false);
    if (res && res.error && res.error.message) {
      setMessage(res.error.message);
      return;
    }
    if (res && res.errors) {
      const toObjectErrors = res.errors.reduce((acc, { name, message }) => ({ ...acc, [name]: message }), {});
      setErrors(toObjectErrors);
      return;
    }
    if (res && res.data) {
      setMessage(auth.succes);
    }

  };

  const createCompte = async () => {
    setMessage('');
    const data = { email, password, role, username };
    const validators = validatorUsers(data);
    if (validators && validators.length > 0) {
      const toObjectErrors = validators.reduce((acc, { name, message }) => ({ ...acc, [name]: message }), {});
      setErrors(toObjectErrors);
    }
    await signUp(data, (res) => callBack(res));
  };

  const isAdmin = user && user.role === 2;

  const title = isAdmin ? signTitle : auth.profil;

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
      >
        <View style={styles.body}>
          <View style={styles.titleContainer}>
            <Text style={styles.textPage}>{title}</Text>
          </View>
          <View>
            {isAdmin && <View style={styles.inputVew}>
              <Text style={styles.labelInput}>{auth.account_type}</Text>
              <View style={styles.modalInput}>
                <Text style={[styles.mgnText, styles.textEditColor]}>{roles(role)}</Text>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    setRoleModal(true);
                  }}>
                  <Text style={styles.mgnText}>{auth.edit}</Text>
                </TouchableOpacity>
              </View>
            </View>}
            <DisplyErrorComponet
              errors={errors.role}
              name='role'
            />
            <View style={styles.inputVew}>
            <Text style={styles.labelInput}>{auth.username}</Text>
              <TextInput
                placeholder={auth.username}
                value={username}
                onChangeText={setUsername}
                style={styles.TextInput}
              />
            </View>
            <DisplyErrorComponet
              errors={errors.username}
              name={auth.username}
            />
            <View style={styles.inputVew}>
              <Text style={styles.labelInput}>{auth.identification}</Text>
              <TextInput
                placeholder={auth.identification}
                value={email}
                onChangeText={setEmail}
                style={styles.TextInput}
              />
            </View>
            <DisplyErrorComponet
              errors={errors.email}
              name='email'
            />
            {isAdmin && <View style={styles.inputVew}>
              <Text style={styles.labelInput}>{auth.password}</Text>
              <TextInput
                placeholder={auth.password}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.TextInput}
                // autoCompleteType={auth.password}
              />
            </View>}
            <DisplyErrorComponet
              errors={errors.password}
              name={auth.password}
            />
            <Text style={styles.messageShow}>{messageall}</Text>
          </View>
          {isAdmin && <View>
            {!loading ? <Button
              // disabled={isInvalidate}
              onPress={async () => await createCompte()}
              title={signTitle}
              color={'blue'}
              style={styles.btn}
            /> :
              <ActivityIndicator size={'large'} />}
          </View>}
        </View>
      </ScrollView>
      <Modal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        >
          <ModalRole setRole={setRole} role={role} />
        </Modal>
    </View>
  );
};

export default SignInScreen;
