# Alarmapp functions

These are some cloud functions for the [Alarmapp](https://github.com/ramomar/alarmapp) project.

## List of functions

| Name                                               | Description        | Configuration |
|----------------------------------------------------|--------------------|---------------|
| Push notifications. | This function sends push notifications to iOS and Android, it gets invoked by the Particle Cloud when the `alarmSystemTriggered` event is published. | Set `alarmapp.basic_auth_user` and `alarmapp.basic_auth_password` with the Firebase CLI. |

## Environment variables

You can set environment variables with `firebase functions:config:set [values...]`

## Deploying

Use the Firebase CLI: `firebase deploy` 
