importScripts('https://www.gstatic.com/firebasejs/7.1.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.1.0/firebase-messaging.js');
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

// const showLocalNotification = (title, body, swRegistration) => {
//   var icon = './logo192.png';
//   const options = {
//     body,
//     // here you can add more properties like icon, image, vibrate, etc.
//     vibrate: [200, 100, 200],
//     icon,
//   };
//   console.log({ title, body, swRegistration })
//   swRegistration.showNotification(title, options);
// };

function showLocalNotification() {
  const img = "/logo192.jpg";
  const text = "Take a look at this brand new t-shirt!";
  const title = "New Product Available";
  const options = {
    body: text,
    icon: "/logo192.jpg",
    vibrate: [200, 100, 200],
    tag: "new-product",
    image: img,
    badge: "https://spyna.it/icons/android-icon-192x192.png",
    actions: [{ action: "Detail", title: "View", icon: "https://via.placeholder.com/128/ff0000" }]
  };
  navigator.serviceWorker.ready.then(function(serviceWorker) {
    serviceWorker.showNotification(title, options);
  });
}

self.addEventListener('push', function(event) {
  console.log('Received a push message', event.currentTarget);

  var title = 'Yay a message.';
  var body = 'We have received a push message.';

  // event.currentTarget.registration.showNotification(title, {
  //   body: body,
  //   icon: icon,
  //   tag: tag,
  //   data: data
  // })
  showLocalNotification(title, body, self.registration)
});
