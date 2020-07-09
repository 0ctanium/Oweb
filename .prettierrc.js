module.exports = {
  useTabs: false,
  printWidth: 80,
  singleQuote: true,
  trailingComma: 'es5',
  jsxBracketSameLine: true,
  noSemi: false,
  overrides: [
    {
      files: "src/locales/**/*.ts",
      options: {
        singleQuote: false,
      }
    }
  ]
};
