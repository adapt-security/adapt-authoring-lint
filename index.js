const chalk = require('chalk');
const CLIEngine = require("eslint").CLIEngine;
const glob = require('glob');
const path = require('path');

function init() {
  const options = {
    parserOptions: {
      ecmaVersion: 2017
    },
    env: {
      node: true,
      es6: true
    },
    rules: loadRules()
  };
  const files = getFiles();
  const report = new CLIEngine(options).executeOnFiles(files);

  console.log(`Linted ${files.length} files. ${colour(report.errorCount, 2)} errors, ${colour(report.warningCount, 1)} warnings\n`);
  report.results.forEach(r => {
    if(!r.messages.length) {
      return;
    }
    console.log(chalk.cyan(r.filePath));
    r.messages.forEach(m => {
      const loc = `[${m.line}:${m.column}]`;
      console.log(`  ${colour(loc, m.severity)} ${m.message}`);
    });
    console.log();
  });
}

function loadRules() {
  try {
    return require(path.join(process.cwd(), 'conf', 'core.eslint.js'))
  } catch(e) {
    console.log(e);
  }
}

function getFiles() {
  return glob.sync('/Users/tom/Projects/adapt_authoring_restructure/adapt-authoring-core/lib/*.js');;
}

function colour(message, severity) {
  switch(severity) {
    case 1: // warning
      return chalk.yellow(message);
    case 2: // error
      return chalk.red(message);
    default:
      return message;
  }
}

module.exports = init;
