const chalk = require('chalk');
const CLIEngine = require("eslint").CLIEngine;
const glob = require('glob');
const path = require('path');
const { App, Utils } = require('adapt-authoring-core');

const app = App.instance;

async function init() {
  await app.onReady();

  const isDebug = getConfig('debug');
  const rootPath = app.getConfig('root_dir');
  const files = getFiles();
  const report = new CLIEngine({ configFile: `${rootPath}/.eslintrc.js` }).executeOnFiles(files);

  report.results.forEach(r => {
    if(!r.messages.length) {
      return;
    }
    console.log(chalk.cyan(r.filePath.replace(rootPath, '')));
    r.messages.sort((a,b) => (a.severity === 2) ? -1 : 1).forEach(m => {
      if(!m.line) m.line = 'X';
      if(!m.column) m.column = 'X';
      const loc = `[${m.line}:${m.column}]`;
      const debug = isDebug ? ` (${m.ruleId})` : '';
      console.log(`  ${colour(loc, m.severity)} ${m.message}${debug}`);
    });
    console.log();
  });
  console.log(`${'-'.repeat(100)}\n`);
  console.log(`  Linted ${files.length} files. ${colour(report.errorCount, 2)} errors, ${colour(report.warningCount, 1)} warnings\n`);
  console.log(`${'-'.repeat(100)}\n`);
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
