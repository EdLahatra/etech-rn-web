/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { connect } from 'react-redux';

import mapStateToProps from '../services/redux/mapStateToProps';
import mapDispatchToProps from '../services/redux/mapDispatchToProps';

import AppNavigation from './navigation';
import AuthStack from './Auth';

import { messaging } from './init-fcm';

class AppMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    console.log({ messaging: navigator.serviceWorker });
    messaging.requestPermission()
      .then(async function () {
        const token = await messaging.getToken();
        console.log({ token });
      })
      .catch(function (err) {
        console.log('Unable to get permission to notify.', err);
      });
    // const test = messaging.firebaseDependencies;

    navigator.serviceWorker.addEventListener('message', (msg) => {
      console.log({ msg });
      console.log({ msg1: navigator.serviceWorker });
    });

    navigator.serviceWorker.addEventListener('push', (push) => {
      console.log({ push });
      console.log({ msg1: navigator.serviceWorker });
    });
  }

  render() {
    const { user } = this.props.users;

    if (user && user.token) {
      return <AppNavigation {...this.props} />;
    }
    return <AuthStack />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppMain);
