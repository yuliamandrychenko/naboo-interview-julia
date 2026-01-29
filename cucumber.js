module.exports = {
  default: {
    require: [
      'tests/steps/**/*.ts'
    ],
    requireModule: ['ts-node/register'],
    format: [
      'progress',
      'html:reports/cucumber-report.html'
    ],
    publishQuiet: true,
    paths: [
      'features/**/*.feature'
    ]
  }
};
