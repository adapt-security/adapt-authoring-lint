const chalk = require('chalk');
const CLIEngine = require("eslint").CLIEngine;
const glob = require('glob');
const path = require('path');
const { App, Utils } = require('adapt-authoring-core');

const app = App.instance;

async function init() {
  await app.onReady();

  const options = {
    baseConfig: {
      env: {
        es2020: true,
        node: true,
        mocha: true
      },
      extends: getConfig('extends')
    },
    rules: getConfig('rules'),
    ignorePattern: '!node_modules/*'
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
      if(!m.line) m.line = 'X';
      if(!m.column) m.column = 'X';
      const loc = `[${m.line}:${m.column}]`;
      console.log(`  ${colour(loc, m.severity)} ${m.message}`);
    });
    console.log();
  });
}

function getConfig(key) {
  return app.config.get(`adapt-authoring-lint.${key}`);
}

function getFiles() {
  return Object.values(app.dependencies).reduce((files, d) => {
    try {
      files.push(...glob.sync('lib/**/*.js', { cwd: d.rootDir, realpath: true }));
    } catch(e) {}
    return files;
  }, []);
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
