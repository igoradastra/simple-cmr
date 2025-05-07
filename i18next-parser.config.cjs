module.exports = {
  locales: ['en', 'cz'],
  defaultNamespace: 'translation',
  output: 'src/locales/$LOCALE/translation.json',
  input: ['src/**/*.{ts,tsx}'],
  keySeparator: false,
  namespaceSeparator: false,
};
