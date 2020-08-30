/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { connect } from 'react-redux';
// import PushNotification from 'react-native-push-notification';

import messaging from '@react-native-firebase/messaging';
import DeviceInfo from 'react-native-device-info';

import { post } from '../services/technique/api';

import mapStateToProps from '../services/redux/mapStateToProps';
import mapDispatchToProps from '../services/redux/mapDispatchToProps';

import AppNavigation from './navigation';
import AuthStack from './Auth';

class AppMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      token: null,
    };
  }

  componentDidMount() {
    // store.dispatch && store.dispatch({
    //   type: constants.signinUSER,
    //   payload: res.data.data,
    // });
    messaging()
      .getToken()
      .then(async token => {
        console.log({ token });
        this.setState({ token });
      });

    messaging().onMessage(msg => {
      // ... your code here
      console.log({ msg });
      this.localNotif(msg);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('Notification caused app to open from quit state:', remoteMessage.notification);
        }
      });
  }

  sendToken = async () => {
    const { user } = this.props.users;
    if (user && user.token) {
      const uuid = DeviceInfo.getUniqueId();
      const deviseInfo = DeviceInfo.getModel();
      const data = {
        uuid,
        deviseInfo,
        token: this.state.token,
      };
      const tk = await post('device', data, user.token);
      console.log({ tk, data });
    }
  }

  render() {
    const { user } = this.props.users;

    if (user && user.token) {
      return <AppNavigation {...this.props} />;
    }
    return <AuthStack sendToken={this.sendToken} />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppMain);
