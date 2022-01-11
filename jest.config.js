module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/app/src/$1',
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
};
