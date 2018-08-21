const admin = require('firebase-admin');
const functions = require('firebase-functions');
const basicAuth = require('basic-auth');

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
  const notAuthorizedResponse = () => response.status(403).send('Not authorized.');

  let authorized = false;

  const auth = request.get('Authorization');

  if (auth) {
    const credentials = basicAuth.parse(auth);
    const user = functions.config().alarmapp.basic_auth_user;
    const password = functions.config().alarmapp.basic_auth_password;
    const validCredentials = credentials.name === user && credentials.pass === password;

    if (validCredentials) {
      authorized = true;
    }
  }

  if (authorized) {
    sdk.messaging().send(makeMessage())
      .then(makeResponse)
      .catch(makeFailedResponse);
  } else {
    notAuthorizedResponse();
  }
});

