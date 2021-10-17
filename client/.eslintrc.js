module.exports = {
  extends: ["react", "prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  plugins: ["react", "prettier"],
  rules: {
    "prettier/prettier": "warn",
    "react/prop-types": "off",
    "import/no-anonymous-default-export": "off",
    "react/no-unescaped-entities": "off",
    "array-callback-return": "off",
    "react/display-name": "off",
  },
};
