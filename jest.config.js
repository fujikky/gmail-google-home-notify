module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  globals: {
    tsConfig: "./tsconfig.test.json",
  },
};
