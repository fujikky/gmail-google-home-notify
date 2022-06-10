"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const promises_1 = __importDefault(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const node_readline_1 = __importDefault(require("node:readline"));
const googleapis_1 = require("googleapis");
const TOKEN_PATH = node_path_1.default.join(process.cwd(), ".credentials.json");
const prompt = (message) => new Promise((resolve) => {
    const rl = node_readline_1.default.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question(message, (answer) => {
        resolve(answer.trim());
        rl.close();
    });
});
const loadTokens = async () => {
    try {
        return JSON.parse(await promises_1.default.readFile(TOKEN_PATH, "utf-8"));
    }
    catch {
        return null;
    }
};
const authorize = async (config) => {
    const client = new googleapis_1.google.auth.OAuth2({
        clientId: config.googleClientId,
        clientSecret: config.googleClientSecret,
        redirectUri: "urn:ietf:wg:oauth:2.0:oob",
    });
    client.on("tokens", async (tokens) => {
        // merge tokens
        const oldTokens = (await loadTokens()) || {};
        await promises_1.default.writeFile(TOKEN_PATH, JSON.stringify({ ...oldTokens, ...tokens }));
    });
    let tokens = await loadTokens();
    if (!tokens) {
        const url = client.generateAuthUrl({
            access_type: "offline",
            scope: "https://www.googleapis.com/auth/gmail.readonly",
        });
        const code = await prompt(`${url}\n\n` +
            "Open the following URL in your browser, then paste the resulting authorization code below: ");
        const result = await client.getToken(code);
        tokens = result.tokens;
    }
    client.setCredentials(tokens);
    return client;
};
exports.authorize = authorize;
