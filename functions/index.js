const admin = require('firebase-admin');
const functions = require('firebase-functions');

const sdk = admin.initializeApp();

const TOPIC = 'alarmSystem';

function makeMessage() {
  const notification = {
    title: '¡El sistema se ha activado!',
    body: 'Parece que hay un intruso. Toma las medidas necesarias.'
  };

  const androidPayload = {
    ttl: 3600 * 1000,
    priority: 'high',
    notification: {
      sound: 'default'
    }
  };

  const apnsPayload = {
    payload: {
      aps: {
        alert: notification
      }
    }
  };

  return {
    notification: notification,
    android: androidPayload,
    apns: apnsPayload,
    data: {},
    topic: TOPIC
  };
}

exports.alarmSystemTriggered = functions.https.onRequest((request, response) => {
  const makeResponse = (msg) => response.status(200).send(msg);
  const makeFailedResponse = (msg) => response.status(500).send(msg);

  sdk.messaging().send(makeMessage())
    .then(makeResponse)
    .catch(makeFailedResponse);
});

