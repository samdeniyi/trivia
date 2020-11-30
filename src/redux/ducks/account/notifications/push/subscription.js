import { axios, currentAPI } from '../../../../../config';

const convertedVapidKey = urlBase64ToUint8Array(process.env.REACT_APP_PUBLIC_VAPID_KEY)

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4)
  // eslint-disable-next-line
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/")

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export default function subscribeUser() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(function(registration) {
      if (!registration.pushManager) {
        console.log('Push manager unavailable.')
        return
      }

      registration.pushManager.getSubscription().then(function(existedSubscription) {
        if (existedSubscription === null) {
          console.log('No subscription detected, make a request.')
          registration.pushManager.subscribe({
            applicationServerKey: convertedVapidKey,
            userVisibleOnly: true,
          }).then(function(newSubscription) {
            //console.log('New subscription added.', JSON.stringify(newSubscription))
            sendSubscription(newSubscription)
          }).catch(function(e) {
            if (Notification.permission !== 'granted') {
              console.log('Permission was not granted.')
            } else {
              console.error('An error ocurred during the subscription process.', e)
            }
          })
        } else {
          //console.log('Existed subscription detected.', JSON.stringify(existedSubscription))
          //sendSubscription(existedSubscription)
        }
      })
    })
    .catch(function(e) {
        console.error('An error ocurred during Service Worker registration.', e)
    })
  }
}

function payloadFromSubscription(subscription) {
  var key = subscription.getKey ? subscription.getKey('p256dh') : '';
  var auth = subscription.getKey ? subscription.getKey('auth') : '';
  // NOTE: p256dg and auth are encoded into std base64, NOT urlsafe base64
  return {
    "browser": {
       endpoint: subscription.endpoint,
       expirationTime: subscription.expirationTime,
       keys: {
        p256dh: key ? btoa(String.fromCharCode.apply(null, new Uint8Array(key))) : '',
        auth: auth ? btoa(String.fromCharCode.apply(null, new Uint8Array(auth))) : ''
       }
    },
  }
}

export async function sendSubscription(subscription) {
  try {
    const token    = JSON.parse(localStorage.getItem('token')).token;
    var payload = payloadFromSubscription(subscription)
    console.log("payload:", JSON.stringify(payload))

   const response = await axios.put(
      `${currentAPI}/api/users/deviceData`,
      null,
      {
        headers: {
            'Authorization': `Bearer ${token}` 
        },
        data: payload
      }
    )

    if(response.status === 200){
      //console.log('Server response:', response);
    } else {
      //console.error('Server error response:', response);
    }
  } catch (error) {
    console.error(error);
  }
}

  export function displayNotification() {
    if (Notification.permission === 'granted') {
      navigator.serviceWorker.getRegistration().then(function(reg) {
        if (reg) {
          console.log('navigator', navigator)
          console.log('navigator.serviceWorker', navigator.serviceWorker)
          console.log('reg', reg)
          reg.showNotification('Hello world!');
        } else {
          console.log('no reg', reg)
        }
      })
    }
  }