module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parser: '@babel/eslint-parser',
  parser: 'babel-eslint',
  extends: '@react-native-community',
  extends: ['@salesforce/eslint-config-lwc/recommended'],
  extends: ['prettier'],
  plugins: ['react'],
  plugins: ['prettier'],
  plugins: ['prettier/recommended'],
  rules: {'prettier/prettier': ['error', {endOfLine: 'auto'}]},
  
  rules: {
    quotes: [1, 'single'],
  },
  parserOptions: { 
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
            jsx: true,
            modules: true,
            experimentalObjectRestSpread: true
        } 
  },
  
};
