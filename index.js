const chalk = require('chalk');
const CLIEngine = require("eslint").CLIEngine;
const glob = require('glob');
const path = require('path');
const { Utils } = require('adapt-authoring-core');

const pkg = require(path.join(process.cwd(), 'package.json'));

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
  const files = [];
  Object.keys(pkg.dependencies).map(d => {
    const ddir = Utils.getModuleDir(d);
    try {
      const dpkg = require(path.join(ddir, 'package.json'));
    } catch(e) {}
    const globFiles = glob.sync('**/*.js', { cwd: ddir, ignore: ['node_modules/**/*', 'conf/*'] });
    files.push(...globFiles.map(f => path.join(ddir, f)));
  });
  return files;
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
