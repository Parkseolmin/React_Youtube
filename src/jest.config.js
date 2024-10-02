module.exports = {
  transformIgnorePatterns: [
    '/node_modules/(?!axios/)', // axios 모듈을 변환 대상에 포함
  ],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1', // ESM 경로 문제 해결
  },
  transform: {
    '^.+\\.jsx?$': [
      'babel-jest', // JavaScript 파일에 대한 변환
      {
        presets: ['@babel/preset-env', '@babel/preset-react'], // Babel 프리셋 설정
      },
    ],
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
};
