importScripts("https://www.gstatic.com/firebasejs/7.19.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.19.0/firebase-messaging.js");

const CONFIG = {
  // TODO: Paste firebase config options here
  apiKey: "AIzaSyB6YtFgsJvAs0--p-D3DS_DCdNc7aFchz0",
  authDomain: "projecttest-dc717.firebaseapp.com",
  databaseURL: "https://projecttest-dc717.firebaseio.com",
  projectId: "projecttest-dc717",
  storageBucket: "projecttest-dc717.appspot.com",
  messagingSenderId: "489900383908",
  appId: "1:489900383908:web:bc3511b2a63186f1331031",
  measurementId: "G-YZH9ZX3MEP"
};

firebase.initializeApp(CONFIG);

const messaging = firebase.messaging();

const matchDomain = (domain, url) => {
  const regex = new RegExp(`^${domain}`, "i");
  return regex.test(url);
};

// Add the public key generated from the console here.
// messaging.usePublicVapidKey("BDzoEdSOqjLzceGNSkYZVQBJUbVUjTNpezT3S-ekT7qCsYXdvck6WaOHbIsvHKs2EdTjavDUz0__YF1hv-6FBK4");

// notification click event
// self.onnotificationclick = (event) => {
//   event.notification.close();
//   const { click_action } = event.notification.data;
//   // Checking if the current client is already open or not.
//   event.waitUntil(clients.matchAll({
//     type: "window"
//   }).then((clientList) => {
//     for (let i = 0; i < clientList.length; i++) {
//       const client = clientList[i];
//       // Checking domain is matched then focus the same window
//       if (matchDomain(click_action, client.url) && 'focus' in client) {
//         return client.focus();
//       }
//     }
//     // No clients opened and so open new window
//     if (clients.openWindow) {
//       return clients.openWindow('/');
//     }
//   }));
// };

console.log('dddddddd <===============================================================> ');

// Get Instance ID token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
messaging.getToken().then((currentToken) => {
  console.log('=========================================================> ', currentToken);
  console.log({ currentToken });
  // if (currentToken) {
  //   sendTokenToServer(currentToken);
  //   updateUIForPushEnabled(currentToken);
  // } else {
  //   // Show permission request.
  //   console.log('No Instance ID token available. Request permission to generate one.');
  //   // Show permission UI.
  //   updateUIForPushPermissionRequired();
  //   setTokenSentToServer(false);
  // }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // showToken('Error retrieving Instance ID token. ', err);
  // setTokenSentToServer(false);
});

// // Callback fired if Instance ID token is updated.
// messaging.onTokenRefresh(() => {
//   messaging.getToken().then((refreshedToken) => {
//     console.log({ refreshedToken });
//     console.log('Token refreshed.');
//     // Indicate that the new Instance ID token has not yet been sent to the
//     // app server.
//     // setTokenSentToServer(false);
//     // // Send Instance ID token to app server.
//     // sendTokenToServer(refreshedToken);
//     // ...
//   }).catch((err) => {
//     console.log('Unable to retrieve refreshed token ', err);
//     // showToken('Unable to retrieve refreshed token ', err);
//   });
// });

messaging.setBackgroundMessageHandler((payload) => {
  console.log("Received background message --- ==============================================>", payload);

  if (payload && payload.data && payload.data.message) {
    const message = JSON.parse(payload.data.message);
    let title = null;
    let options = null;
    if (message && message.title && message.body) {
      title = message.title;
      options = {};
      options.body = message.body;
      options.requireInteraction = true;
      if (message.icon) { options.icon = message.icon; }
      if (message.click_action) {
        options.data = { click_action: message.click_action };
      }
    }

    return self.registration.showNotification(title, options);
  }
});

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker
//   `messaging.setBackgroundMessageHandler` handler.
// messaging.onMessage((payload) => {
//   console.log('Message received. ', payload);
// });
