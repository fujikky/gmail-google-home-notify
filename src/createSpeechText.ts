import type { gmail_v1 } from "googleapis";

import type { Config } from "./config";

export const createSpeechText = (
  message: gmail_v1.Schema$Message,
  config: Config
) => {
  const snippet = message.snippet;
  if (!snippet) return null;

  if (config.conditions.length === 0) {
    return snippet;
  }

  for (const condition of config.conditions) {
    const match = snippet.match(condition.regex);
    if (!match) continue;

    return condition.speechText(match);
  }
  return null;
};
