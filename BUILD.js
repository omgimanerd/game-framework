/**
 * This file contains compilation and build rules for the project. This file
 * is imported by the gulpfile during compilation and build.
 */

module.exports = {
  GULPFILE_VERSION: '3.2.1',
  DEFAULT_TASKS: ['js-lint'],
  JS_LINT_RULES: [
    {
      name: 'client side javascript',
      sourceFiles: [
        './public/js/**/*.js'
      ]
    },
    {
      name: 'server side javascript',
      sourceFiles: [
        './lib/**/*.js'
      ]
    }
  ]
};
