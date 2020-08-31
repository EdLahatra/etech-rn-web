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

// import messaging from '@react-native-firebase/messaging';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';
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
    const channel = new firebase.notifications.Android.Channel(
      'defaultId',
      'channelName',
      firebase.notifications.Android.Importance.Max
    ).setDescription('A natural description of the channel');
    firebase.notifications().android.createChannel(channel);

    this.checkPermission();
    this.createNotificationListeners();
    // messaging()
    //   .getToken()
    //   .then(async token => {
    //     console.log({ token });
    //     this.setState({ token });
    //   });

    // messaging().onMessage(msg => {
    //   // ... your code here
    //   console.log({ msg });
    //   this.localNotif(msg);
    // });

    // // Check whether an initial notification is available
    // messaging()
    //   .getInitialNotification()
    //   .then(remoteMessage => {
    //     if (remoteMessage) {
    //       console.log('Notification caused app to open from quit state:', remoteMessage.notification);
    //     }
    //   });
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      await this.getToken();
    } else {
        this.requestPermission();
    }
  }
  
  //2
  async requestPermission() {
    try {
        await firebase.messaging().requestPermission();
        // User has authorised
        this.getToken();
    } catch (error) {
        // User has rejected permissions
        console.log('permission rejected');
    }
  }
  
  //3
  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
        fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
            // user has a device token
            await AsyncStorage.setItem('fcmToken', fcmToken);
        }
    }
    console.log('fcmToken token token', fcmToken);
    this.setState({ token: fcmToken });
    console.log('fcmToken fcmToken', fcmToken);
  }

  showNotification(notification){
    console.log("notif",notification);
   // if (Platform.OS === 'android') {
      //console.log("notif",notification);
      const localNotification = new firebase.notifications.Notification({
          sound: 'default',
          show_in_foreground: true
        })
        .setNotificationId(notification.notificationId)
        .setTitle(notification.title)
        .setSubtitle(notification.subtitle)
        .setBody(notification.body)
        .setData(notification.data)
        .android.setChannelId('defaultId') // e.g. the id you chose above
        .android.setSmallIcon('ic_launcher')
        .android.setPriority(firebase.notifications.Android.Priority.High);
  
        //console.log("local", localNotification);
      firebase.notifications()
        .displayNotification(localNotification)
        .catch(err => console.error("error ",err));
    //}
  }
  
  async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      console.log("notification ", notification);
      this.showNotification(notification);
    });
  
    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
        const { title, body } = notificationOpen.notification;
        console.log({ title, body });
        // this.props.isOpening({isNotif: true, url: "notification"});
        //this.showAlert(title, body);
    });
  
    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
        const { title, body } = notificationOpen.notification;
        console.log({ title, body });
       // this.showAlert(title, body);
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      console.log(JSON.stringify(message));
    });
  }
  
  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
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
