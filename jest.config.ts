import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  testEnvironment: 'jsdom', // Use 'jsdom' for frontend projects
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'], // Look for test files
  coverageDirectory: 'coverage', // Output coverage reports here
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  collectCoverage: true, // Enable coverage reporting
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Use ts-jest to transform TypeScript files
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Adjust path based on your project structure
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  preset: 'ts-jest',
};

export default config;
