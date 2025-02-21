import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  testEnvironment: 'node', // Use 'jsdom' for frontend projects
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'], // Look for test files
  coverageDirectory: 'coverage', // Output coverage reports here
  collectCoverage: true, // Enable coverage reporting
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Use ts-jest to transform TypeScript files
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};

export default config;
