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

  const googleHome = new GoogleHomePlayer(
    config.googleHomeIp,
    config.speechLanguage
  );
  await googleHome.say(text);

  await saveTimestamp(nextTs);
})();
