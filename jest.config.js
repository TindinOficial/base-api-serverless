const { compilerOptions } = require('./tsconfig.json')
const { pathsToModuleNameMapper } = require('ts-jest/utils')

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./jest.setup.js'],
  globals: {
    'ts-jest': {
      isolatedModules: true
    }
  },
  clearMocks: true,
  coverageProvider: 'v8',
  coverageThreshold: {
    './src/handlers/': {
      lines: 80, // verifica se 80% das linhas foram cobertas
      functions: 90, // verifica se 90% das funções foram chamadas
      branches: 90, // verifica se passou em 90% dos condicionais (ifs)
      /**
       * verifica se 80% do código total handlers foi executado
       * diferente da cobertura das linhas, pois uma linha pode
       * ter mais de uma instrução
       */
      statements: 80
    }
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>' }),
  coveragePathIgnorePatterns: [
    '/node_modules/'
  ],
  roots: [
    '<rootDir>/src'
  ],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  setupFiles: ['./jest.env.js']
}
