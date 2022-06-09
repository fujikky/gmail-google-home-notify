import fs from "node:fs/promises";
import path from "node:path";

const TIMESTAMP_PATH = path.join(process.cwd(), ".timestamp");

export const createTimestamp = () => Math.floor(new Date().getTime() / 1000);

export const loadTimestamp = async () => {
  try {
    const file = await fs.readFile(TIMESTAMP_PATH, "utf-8");
    const ts = parseInt(file, 10);
    if (Number.isNaN(ts)) throw new Error(`${file} is not a number`);
    return ts;
  } catch (e) {
    const ts = createTimestamp();
    await saveTimestamp(ts);
    return ts;
  }
};

export const saveTimestamp = async (ts: number) => {
  await fs.writeFile(TIMESTAMP_PATH, String(ts));
};
