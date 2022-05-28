"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSpeechText = void 0;
const createSpeechText = (message, config) => {
    const snippet = message.snippet;
    if (!snippet)
        return null;
    if (config.conditions.length === 0) {
        return snippet;
    }
    for (const condition of config.conditions) {
        const match = snippet.match(condition.regex);
        if (!match)
            continue;
        return condition.speechText(match);
    }
    return null;
};
exports.createSpeechText = createSpeechText;
