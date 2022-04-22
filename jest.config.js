module.exports = {
  preset: 'jest-expo',

  testPathIgnorePatterns: ['/node_modules', '/android', '/ios'],

  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    'jest-styled-components',
  ],

  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.tsx', '!src/__tests_/*.test.tsx'],
  coverageReporters: ['lcov'],
};




// const config = {
//   verbose: true,
// };

// module.exports = config;

// // Or async function
// module.exports = async () => {
//   return {
//     verbose: true,
//   };
// };

// module.exports = {
//   preset: 'jest-expo',
//   transform: {"\\.ts$": ['ts-jest']}
// };