/** @type {import('ts-jest').JestConfigWithTsJest} */

import type { Config } from '@jest/types'

 const config: Config.InitialOptions = {
     roots: [
         "<rootDir>/test",
         "<rootDir>/src"
     ],
     transform: {
         "^.+\\.tsx?$": "ts-jest"
     },
     setupFilesAfterEnv: [
         "@testing-library/jest-dom/extend-expect"
     ],
     testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
     moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
     testEnvironment: "jsdom",
     collectCoverage: true,
     collectCoverageFrom: [
         'src/**/*.{ts,tsx}'
     ]
 }

 export default config;
 
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};

