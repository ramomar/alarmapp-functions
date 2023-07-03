const functions = require('firebase-functions');
const basicAuth = require('basic-auth');

exports.alarmSystemTriggered = functions.https.onRequest((request, response) => {
  const makeResponse = (msg) => response.status(200).send(msg);
  const makeFailedResponse = (msg) => response.status(500).send(msg);
  const notAuthorizedResponse = () => response.status(403).send('Not authorized.');

  let authorized = false;

  const auth = request.get('Authorization');
  const functionsConfig = functions.config();

  const {
    basic_auth_user: basicAuthUser,
    basic_auth_password: basicAuthPassword,
    slack_host: slackHost,
    slack_token: slackToken,
    slack_channel_id: slackChannelId,
  } = functionsConfig.alarmapp;

  if (auth) {
    const credentials = basicAuth.parse(auth);
    const validCredentials = credentials.name === basicAuthUser && credentials.pass === basicAuthPassword;

    if (validCredentials) {
      authorized = true;
    }
  }

  if (authorized) {
    fetch(slackHost, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${slackToken}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: new URLSearchParams({
        'text': '<!channel> ¡El sistema se ha activado!\nParece que hay un intruso. Toma las medidas necesarias.',
        'channel': slackChannelId,
      })
    }).then(makeResponse)
    .catch(makeFailedResponse);
  } else {
    notAuthorizedResponse();
  }
});

