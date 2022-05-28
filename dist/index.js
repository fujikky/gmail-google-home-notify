"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const google_home_player_1 = __importDefault(require("google-home-player"));
const config_1 = require("./config");
const createSpeechText_1 = require("./createSpeechText");
const fetchMessage_1 = require("./fetchMessage");
const timestamp_1 = require("./timestamp");
(async () => {
    const config = await (0, config_1.loadConfig)();
    const nextTs = (0, timestamp_1.createTimestamp)();
    const ts = await (0, timestamp_1.loadTimestamp)();
    const message = await (0, fetchMessage_1.fetchMessage)(ts, config);
    if (!message)
        return;
    const text = (0, createSpeechText_1.createSpeechText)(message, config);
    if (!text)
        return;
    const googleHome = new google_home_player_1.default(config.googleHomeIp, config.speechLanguage);
    await googleHome.say(text);
    await (0, timestamp_1.saveTimestamp)(nextTs);
})();
