"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchMessage = void 0;
const googleapis_1 = require("googleapis");
const authorize_1 = require("./authorize");
const fetchMessage = async (after, config) => {
    const client = await (0, authorize_1.authorize)(config);
    const gmail = googleapis_1.google.gmail({ version: "v1", auth: client });
    const mutableQuery = [];
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
    if (!messageId)
        return null;
    const message = await gmail.users.messages.get({
        userId: "me",
        id: messageId,
    });
    return message.data;
};
exports.fetchMessage = fetchMessage;
