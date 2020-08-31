/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { connect } from 'react-redux';

import * as firebase from 'firebase/app';
import 'firebase/messaging';

import mapStateToProps from '../services/redux/mapStateToProps';
import mapDispatchToProps from '../services/redux/mapDispatchToProps';

import AppNavigation from './navigation';
import AuthStack from './Auth';

// import { messaging } from './init-fcm';

const initializedFirebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyB6YtFgsJvAs0--p-D3DS_DCdNc7aFchz0',
  authDomain: 'projecttest-dc717.firebaseapp.com',
  databaseURL: 'https://projecttest-dc717.firebaseio.com',
  projectId: 'projecttest-dc717',
  storageBucket: 'projecttest-dc717.appspot.com',
  messagingSenderId: '489900383908',
  appId: '1:489900383908:web:bc3511b2a63186f1331031',
  measurementId: 'G-YZH9ZX3MEP',
});

// const messaging = initializedFirebaseApp.messaging();

class AppMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    if (Notification.permission === 'granted') {
      console.log({ token: Notification.permission });
      // If it's okay let's create a notification
      const messaging = await initializedFirebaseApp.messaging();

      messaging.usePublicVapidKey('BDzoEdSOqjLzceGNSkYZVQBJUbVUjTNpezT3S-ekT7qCsYXdvck6WaOHbIsvHKs2EdTjavDUz0__YF1hv-6FBK4');

      console.log({ messaging });

      messaging.requestPermission()
        .then(async function () {
          const token = await messaging.getToken();
          console.log({ token });
          alert(token.toString());
          const notification = new Notification(token);
          console.log({ notification });
        })
        .catch(function (err) {
          console.log('Unable to get permission to notify.', err);
        });
      if (navigator.serviceWorker) {
        navigator.serviceWorker.addEventListener('message', (msg) => {
          console.log({ msg });
          console.log({ msg1: navigator.serviceWorker });
        });
    
        navigator.serviceWorker.addEventListener('push', (push) => {
          console.log({ push });
          console.log({ msg1: navigator.serviceWorker });
        });
    
        navigator.serviceWorker.addEventListener('onmessage', (onmessage) => {
          console.log({ onmessage });
          console.log({ msg1: navigator.serviceWorker });
        });
      }
    }
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
