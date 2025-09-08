const config = {
  arrowParens: "always",
  bracketSameLine: false,
  bracketSpacing: true,
  importOrder: [
    "^@mui",
    "^@",
    "^[.]{2}./.*$(?<!.css)",
    "^./.*$(?<!.css)",
    "^[.]",
  ],
  importOrderCaseInsensitive: true,
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderGroupNamespaceSpecifiers: true,
  jsxSingleQuote: false,
  plugins: [require.resolve("@trivago/prettier-plugin-sort-imports")],
  printWidth: 100,
  quoteProps: "as-needed",
  semi: false,
  singleQuote: false,
  tabWidth: 4,
  trailingComma: "all",
};

module.exports = config;
