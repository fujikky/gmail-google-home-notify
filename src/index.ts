import GoogleHomePlayer from "google-home-player";

import { loadConfig } from "./config";
import { createSpeechText } from "./createSpeechText";
import { fetchMessage } from "./fetchMessage";
import { createTimestamp, loadTimestamp, saveTimestamp } from "./timestamp";

(async () => {
  const config = await loadConfig();

  const nextTs = createTimestamp();
  const ts = await loadTimestamp();

  const message = await fetchMessage(ts, config);
  if (!message) return;

  const text = createSpeechText(message, config);
  if (!text) return;

  const ips =
    typeof config.googleHomeIp === "string"
      ? [config.googleHomeIp]
      : config.googleHomeIp;
  await Promise.all(
    ips.map(async (ip) => {
      try {
        const player = new GoogleHomePlayer(ip, config.speechLanguage);
        await player.say(text);
      } catch (e) {
        // Ignore failed broadcasts to Google Home
      }
    })
  );

  await saveTimestamp(nextTs);
})();
