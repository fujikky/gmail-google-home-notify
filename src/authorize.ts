import fs from "node:fs/promises";
import path from "node:path";
import readline from "node:readline";

import { google } from "googleapis";

import type { Config } from "./config";

const TOKEN_PATH = path.join(process.cwd(), ".credentials.json");

const prompt = (message: string) =>
  new Promise<string>((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question(message, (answer) => {
      resolve(answer.trim());
      rl.close();
    });
  });

export const authorize = async (config: Config) => {
  const client = new google.auth.OAuth2({
    clientId: config.googleClientId,
    clientSecret: config.googleClientSecret,
    redirectUri: "urn:ietf:wg:oauth:2.0:oob",
  });

  client.on("tokens", async (credentials) => {
    await fs.writeFile(TOKEN_PATH, JSON.stringify(credentials));
  });

  try {
    const token = JSON.parse(
      await fs.readFile(TOKEN_PATH, { encoding: "utf-8" })
    );
    client.credentials = token;
  } catch {
    const url = client.generateAuthUrl({
      access_type: "offline",
      scope: "https://www.googleapis.com/auth/gmail.readonly",
    });

    const code = await prompt(
      `${url}\n\n` +
        "Open the following URL in your browser, then paste the resulting authorization code below: "
    );

    const result = await client.getToken(code);
    client.credentials = result.tokens;
  }

  return client;
};
