// @ts-check

/**
 * @type {import("./src/config").Config}
 */
const config = {
  // OAuth client info that created in Google Cloud Console.
  googleClientId: "xxxxxxx",
  googleClientSecret: "xxxxxxx",
  // IP address of Google Home.
  // Can be found in Device Info in the Home app.
  googleHomeIp: "192.168.x.x",
  // Language of text to be read.
  speechLanguage: "ja",
  // From email address to be filtered.
  // If empty, will not be filtered.
  emails: ["user1@example.com", "user2@example.com"],
  // List of regular expressions for mail body matching
  // and functions to create read out loud text.
  // If empty, the entire body of the email will read out loud.
  conditions: [
    {
      regex: /\d\d?月\d\d?日 (\d\d:\d\d):\d\d に◯◯学童に到着しました。/,
      speechText: (match) => `${match[1]}に学童に到着しました。`,
    },
    {
      regex: /\d\d?月\d\d?日 (\d\d:\d\d):\d\d に◯◯学童を出発しました。/,
      speechText: (match) => `${match[1]}に学童を出発しました。`,
    },
  ],
};

module.exports = config;
