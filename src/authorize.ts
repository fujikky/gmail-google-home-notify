import fs from "node:fs/promises";
import path from "node:path";
import readline from "node:readline";

import type { Credentials } from "google-auth-library";
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

const loadTokens = async (): Promise<Credentials | null> => {
  try {
    return JSON.parse(await fs.readFile(TOKEN_PATH, "utf-8"));
  } catch {
    return null;
  }
};

export const authorize = async (config: Config) => {
  const client = new google.auth.OAuth2({
    clientId: config.googleClientId,
    clientSecret: config.googleClientSecret,
    redirectUri: "urn:ietf:wg:oauth:2.0:oob",
  });

  client.on("tokens", async (tokens) => {
    // merge tokens
    const oldTokens = (await loadTokens()) || {};
    await fs.writeFile(TOKEN_PATH, JSON.stringify({ ...oldTokens, ...tokens }));
  });

  let tokens = await loadTokens();

  if (!tokens) {
    const url = client.generateAuthUrl({
      access_type: "offline",
      scope: "https://www.googleapis.com/auth/gmail.readonly",
    });
    const code = await prompt(
      `${url}\n\n` +
        "Open the following URL in your browser, then paste the resulting authorization code below: "
    );
    const result = await client.getToken(code);
    tokens = result.tokens;
  }

  client.setCredentials(tokens);

  return client;
};
