
// eslint-disable-next-line no-restricted-globals
self.addEventListener('push', event => {
    console.log('[Service Worker] Push Received.');
    const data = event.data.json()
    console.log('New notification', data)
    const options = {
      data: data.data,  
      body: data.body,
      icon: data.icon,
      vibrate: [200, 100, 200],
      tag: data.tag,
      image: data.image,
      badge: data.badge
      //actions: [{ action: "Detail", title: "View", icon: "https://via.placeholder.com/128/ff0000" }]
    }

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  })
  
// eslint-disable-next-line no-restricted-globals
self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data)
    //clients.openWindow('https://developers.google.com/web/')
  );
});