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

import { post } from '../services/technique/api';

import mapStateToProps from '../services/redux/mapStateToProps';
import mapDispatchToProps from '../services/redux/mapDispatchToProps';

import AppNavigation from './navigation';
import AuthStack from './Auth';

const { detect } = require('detect-browser');

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
      token: null,
    };
  }

  async componentDidMount() {
    if (Notification.permission === 'granted') {
      console.log({ token: Notification.permission });
      console.log({ isSupported: firebase.messaging.isSupported() });
      if (firebase.messaging.isSupported()){
        // If it's okay let's create a notification
        const messaging = await initializedFirebaseApp.messaging();

        messaging.usePublicVapidKey('BDzoEdSOqjLzceGNSkYZVQBJUbVUjTNpezT3S-ekT7qCsYXdvck6WaOHbIsvHKs2EdTjavDUz0__YF1hv-6FBK4');

        console.log({ messaging });

        messaging.requestPermission()
          .then(async() => {
            const token = await messaging.getToken();
            this.setState({ token });
            console.log({ token });
            this.sendToken(token);
            const notification = new Notification(token);
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
  }

  sendToken = async (token) => {
    let uuid = navigator.buildID;
    let deviseInfo = navigator.appCodeName + navigator.appName;
    if (detect && typeof detect === 'function') {
      const browser = detect();
      uuid = browser.version + browser.os;
      deviseInfo = browser.os + browser.name;
    }
    console.log({ uuid, deviseInfo });
    const { user } = this.props.users;
    if (user && user.token) {
      const data = {
        uuid,
        deviseInfo,
        token: token || this.state.token,
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
