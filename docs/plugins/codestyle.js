const fs = require('fs-extra');
const path = require('path');

class Plugin {
  onHandleConfig() {
    try {
      const config = require(path.join(process.cwd(), '.eslintrc.js'));
      const rules = Object.entries(config.rules).reduce((s,[rule, c]) => {
        return `${s}| [${rule}](https://eslint.org/docs/rules/${rule}) | ${this.getSeverity(c)} |\n`;
      }, '');
      const input = fs.readFileSync(path.join(__dirname, 'codestyle.md')).toString();
      const output = input.replace('{{{RULES}}}', rules);
      fs.writeFileSync(path.join(__dirname, '..', 'temp-codestyle.md'), output);
    } catch(e) {}
  }
  getSeverity(c) {
    switch(Array.isArray(c) ? c[0] : c) {
      case 0: return 'Off';
      case 1: return 'Warning';
      case 2: return 'Error';
    }
  }
}

module.exports = new Plugin();
