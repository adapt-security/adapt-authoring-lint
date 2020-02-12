const chalk = require('chalk');
const CLIEngine = require("eslint").CLIEngine;
const glob = require('glob');
const { App } = require('adapt-authoring-core');

const WARN = 1, ERROR = 2;

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
    r.messages.sort(a => (a.severity === ERROR) ? -1 : 1).forEach(m => {
      if(!m.line) m.line = 'X';
      if(!m.column) m.column = 'X';
      const loc = `[${m.line}:${m.column}]`;
      const debug = isDebug ? ` (${m.ruleId})` : '';
      console.log(`  ${colour(loc, m.severity)} ${m.message}${debug}`);
    });
    console.log();
  });
  console.log(`${'-'.repeat(100)}\n`);
  console.log(`  Linted ${files.length} files. ${colour(report.errorCount, ERROR)} errors, ${colour(report.warningCount, WARN)} warnings\n`);
  console.log(`${'-'.repeat(100)}\n`);
  process.exit();
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
    case WARN: // warning
      return chalk.yellow(message);
    case ERROR: // error
      return chalk.red(message);
    default:
      return message;
  }
}

module.exports = init;
