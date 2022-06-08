gmail-google-home-notify
-------
An application that reads out new Gmail messages on Google Home.<br>
Works on Raspberry Pi.

## Requirements

- Node.js v16
- Yarn

## Get started

1. Create a project in [Google Cloud Console](https://console.cloud.google.com) and set up OAuth authentication.
2. Enable the [Gmail API](https://console.cloud.google.com/apis/api/gmail.googleapis.com) in your project.
3. Clone repo.
4. Copy `home-notify.config.sample.js` to `home-notify.config.js` .
5. Edit `home-notify.config.js` .
6. Run `yarn --production` .
7. Run `yarn start` .

    First, will be prompted for Google authentication. After authenticating with your browser, paste the authentication code into the console.

## Cron configuration

Running this script will check mail only once. Use cron to run it periodically.

Edit cron configuration with `crontab -e`.

The following example will run the script once per minute.

```
*/1 * * * * '/path/to/repo/start.sh'
```
