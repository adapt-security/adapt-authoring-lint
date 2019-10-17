module.exports = {
  definition: {
    extends: {
      type: 'String',
      default: 'eslint:recommended',
      description: 'A string that specifies an ESLint configuration (either a path to a config file or the name of a shareable config)'
    },
    rules: {
      type: 'object',
      description: 'Defines or extends the set of rules used by the linter'
    }
  }
};
