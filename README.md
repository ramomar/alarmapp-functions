# Alarmapp functions

These are some cloud functions for the [Alarmapp](https://github.com/ramomar/alarmapp) project.

## List of functions

| Name                                               | Description        | Configuration |
|----------------------------------------------------|--------------------|---------------|
| Push notifications. | This function sends push notifications to iOS and Android, it gets invoked by the Particle Cloud when the `alarmSystemTriggered` event is published. It uses basic access authentication. | Set `alarmapp.basic_auth_user` and `alarmapp.basic_auth_password` with the Firebase CLI. |

In the past it used to send real push notifications using FCM but now it sends a message to a Slack channel.

## Environment variables

You can set environment variables with `firebase functions:config:set [values...]`

## Deploying

Use the Firebase CLI: `firebase deploy` 
