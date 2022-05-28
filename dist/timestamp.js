"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveTimestamp = exports.loadTimestamp = exports.createTimestamp = void 0;
const promises_1 = __importDefault(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const TIMESTAMP_PATH = node_path_1.default.join(process.cwd(), ".timestamp");
const createTimestamp = (beforeMinutes = 0) => {
    const d = new Date();
    d.setMinutes(d.getMinutes() - beforeMinutes);
    return Math.floor(d.getTime() / 1000);
};
exports.createTimestamp = createTimestamp;
const loadTimestamp = async () => {
    try {
        const file = await promises_1.default.readFile(TIMESTAMP_PATH, "utf-8");
        const ts = parseInt(file, 10);
        if (Number.isNaN(ts))
            throw new Error(`${file} is not a number`);
        return ts;
    }
    catch (e) {
        const ts = (0, exports.createTimestamp)(5);
        await (0, exports.saveTimestamp)(ts);
        return ts;
    }
};
exports.loadTimestamp = loadTimestamp;
const saveTimestamp = async (ts) => {
    await promises_1.default.writeFile(TIMESTAMP_PATH, String(ts));
};
exports.saveTimestamp = saveTimestamp;
