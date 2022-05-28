module.exports = {
  extends: ["timetree/base"],
  parserOptions: {
    project: ["./tsconfig.json", "./tsconfig.tsc.json"],
  },
  rules: {
    "functional/no-loop-statement": "off",
    "functional/immutable-data": "off",
  },
};
