import * as firebase from 'firebase/app';
import 'firebase/messaging';

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

const messaging = initializedFirebaseApp.messaging();
messaging.usePublicVapidKey('BDzoEdSOqjLzceGNSkYZVQBJUbVUjTNpezT3S-ekT7qCsYXdvck6WaOHbIsvHKs2EdTjavDUz0__YF1hv-6FBK4');

export { messaging };
