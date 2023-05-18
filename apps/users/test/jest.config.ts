const { pathsToModuleNameMapper } = require('ts-jest');
import { compilerOptions } from '../../../tsconfig.json';

module.exports = {
  displayName: 'E2E test',
  roots: ['<rootDir>'],
  moduleDirectories: ['node_modules', __dirname],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: { '^@app/common(|/.*)$': '<rootDir>/libs/common/src/$1' },
  // moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  transform: {
    "^.+\\.(t|j)s$": ["ts-jest", { "useESM": true }]
  },
  testRegex: '\\.e2e-spec\\.ts$',
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"]
};
// {
//   "moduleFileExtensions": [
//     "js",
//     "json",
//     "ts"
//   ],
//     "rootDir": ".",
//       "testEnvironment": "node",
//         "testRegex": ".e2e-spec.ts$",
//           "transform": {
//     "^.+\\.(t|j)s$": [
//       "ts-jest",
//       {
//         "useESM": true
//       }
//     ]
//   },
//   "moduleNameMapper": {
//     "^@app/common(|/.*)$": "<rootDir>/libs/common/src/$1"
//   },
//   "extensionsToTreatAsEsm": [
//     ".ts"
//   ]
// }
// export default {
//   projects: [
//     {
//       displayName: 'Unit test',
//       preset: 'ts-jest',
//       testEnvironment: 'node',
//       rootDir: 'src',
//       testRegex: '\\.spec\\.ts$',
//       moduleDirectories: ['node_modules', __dirname],
//       moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
//       setupFilesAfterEnv: ['dotenv/config'],
//     },
//     {
//       displayName: 'E2E test',
//       preset: 'ts-jest',
//       testEnvironment: 'node',
//       rootDir: 'test',
//       testRegex: '\\.e2e-spec\\.ts$',
//       moduleDirectories: ['node_modules', __dirname],
//       moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
//       setupFilesAfterEnv: ['dotenv/config'],
//     },
//   ],
// };