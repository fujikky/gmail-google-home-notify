import { google } from "googleapis";

import { authorize } from "./authorize";
import type { Config } from "./config";

export const fetchMessage = async (after: number, config: Config) => {
  const client = await authorize(config);
  const gmail = google.gmail({ version: "v1", auth: client });

  const mutableQuery: string[] = [];
  if (config.emails.length > 0) {
    const fromQuery = config.emails.map((mail) => `from:${mail}`).join(" ");
    mutableQuery.push(`{${fromQuery}}`);
  }
  mutableQuery.push(`after:${after}`);

  const result = await gmail.users.messages.list({
    userId: "me",
    maxResults: 1,
    q: mutableQuery.join(" "),
  });

  const messageId = result.data.messages?.[0]?.id;
  if (!messageId) return null;

  const message = await gmail.users.messages.get({
    userId: "me",
    id: messageId,
  });

  return message.data;
};
