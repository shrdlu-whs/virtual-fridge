const sonarqubeScanner = require("sonarqube-scanner");
require('dotenv').config()

const serverUrl = process.env.REACT_APP_SONAR_HOST_URL ? process.env.REACT_APP_SONAR_HOST_URL.trim() : process.env.SONAR_HOST_URL.trim();
const token = process.env.REACT_APP_SONAR_AUTH_TOKEN ? process.env.REACT_APP_SONAR_AUTH_TOKEN.trim() : process.env.SONAR_AUTH_TOKEN.trim();

sonarqubeScanner(
  {
    serverUrl,
    token,
    options: {
      "sonar.sources": "./src",
      "sonar.exclusions": "**/__tests__/**",
      "sonar.tests": "./src/__tests__",
      "sonar.test.inclusions": "./src/__tests__/**/*.test.tsx,./src/__tests__/**/*.test.ts",
      "sonar.typescript.lcov.reportPaths": "coverage/lcov.info",
      "sonar.testExecutionReportPaths": "reports/test-report.xml",
    },
  },
  () => {},
);