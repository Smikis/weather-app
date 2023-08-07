module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'no-unused-vars': 'off',
        'no-use-before-define': 'off',
        'react-hooks/exhaustive-deps': 'off',
        'react-native/no-inline-styles': 'off',
        'react-native/no-color-literals': 'off',
        'react-native/no-raw-text': 'off',
        'react-native/no-single-element-style-arrays': 'off',
        'react-native/no-unused-styles': 'off',
        'react-native/split-platform-components': 'off',
        'prettier/prettier': [
          'error',
          {
            endOfLine: 'auto',
          },
        ],
        'react/react-in-jsx-scope': 'off',
        'react/jsx-filename-extension': [
          'error',
          {extensions: ['.js', '.jsx', '.ts', '.tsx']},
        ],
      },
    },
  ],
};
