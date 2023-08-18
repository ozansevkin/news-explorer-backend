module.exports = {
  extends: ["eslint:recommended", "airbnb-base", "prettier"],
  rules: {
    "import/extensions": ["error", { js: "ignorePackages" }],
    "no-console": "off",
    "no-underscore-dangle": ["error", { allow: ["_id"] }],
    "no-unused-vars": ["error", { argsIgnorePattern: "next" }],
  },
};
