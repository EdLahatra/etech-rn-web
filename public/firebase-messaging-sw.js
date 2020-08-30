importScripts('https://www.gstatic.com/firebasejs/7.18.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.18.0/firebase-messaging.js');
firebase.initializeApp({
// Project Settings => Add Firebase to your web app
  apiKey: "AIzaSyB6YtFgsJvAs0--p-D3DS_DCdNc7aFchz0",
  authDomain: "projecttest-dc717.firebaseapp.com",
  databaseURL: "https://projecttest-dc717.firebaseio.com",
  projectId: "projecttest-dc717",
  storageBucket: "projecttest-dc717.appspot.com",
  messagingSenderId: "489900383908",
  appId: "1:489900383908:web:bc3511b2a63186f1331031",
  measurementId: "G-YZH9ZX3MEP",
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  console.log({ payload });
  const promiseChain = clients
    .matchAll({
      type: 'window',
      includeUncontrolled: true,
    })
    .then(windowClients => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        windowClient.postMessage(payload);
      }
    })
    .then(() => registration.showNotification('my notification title'));
  return promiseChain;
});

self.addEventListener('onmessage', function (onmessage) {
  // do what you want
  // ...
  console.log({ onmessage });
});


self.addEventListener('notificationclick', function (event) {
  // do what you want
  // ...
  console.log({ event });
});

self.addEventListener('push', function(event) {
  console.log('Received a push message', event.currentTarget);

  var title = 'Yay a message.';
  var body = 'We have received a push message.';

  event.currentTarget.registration.showNotification(title, {
    body: body,
    data: body
  })

});
