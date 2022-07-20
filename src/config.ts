import path from "node:path";

export type SpeechTextCondition = {
  readonly regex: RegExp;
  readonly speechText: (match: RegExpMatchArray) => string;
};

export type Config = {
  readonly googleClientId: string;
  readonly googleClientSecret: string;
  readonly googleHomeIp: string | readonly string[];
  readonly speechLanguage: string;
  readonly emails: readonly string[];
  readonly conditions: readonly SpeechTextCondition[];
};

const CONFIG_PATH = path.join(process.cwd(), "config.js");

export const loadConfig = async () =>
  (await import(CONFIG_PATH)).default as Config;
