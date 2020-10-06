# Code Etiquette

When it comes to writing code for the authoring tool, there are three main concerns you should keep in mind:

**Stability**: the best practices in this guide aim to minimise bugs, or at least make them more easy to track down.

**Readability**: many developers will look through your code long after you've written it, so it's vital that your code plainly expresses your intentions.

**Consistency**: being consistent helps new programmers adjust quickly, and is a major player in readability. You may not agree with all of them, but please adhere to them nonetheless.

## Best practice guidelines
- Prioritise readable code over condensed code (although tick both boxes if you can!)
- Always return early (this also helps with nesting)
- Functions should be single purpose
- Use as few comments as possible, and absolutely NO commented-out code; code _should_ be self-documenting (although we all know this isn't possible all of the time)
- Limit the logic in if statement conditions. Store these in a variable for readability.
- Limit the use of scope aliases (i.e. that, self). Try to use a bind function instead (e.g. [built-in](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind) or [Underscore](http://underscorejs.org/#bind))
- Avoid deep nesting; refactor into separate functions (and/or use [async](https://github.com/caolan/async) if coding the back-end)
- Write unit tests! Whenever you fix a bug, write a regression test; a bug fixed without a regression test is likely to break again in the future.

### Naming conventions
- Variable/function/class names should be descriptive _and_ succinct
- Always name closures (it helps with debugging)
- Error variables should _always_ be named `error` or `e`
- Event variables should _always_ be named `event`
- Prefix variables that point to jQuery elements with `$`
- Use 'has' and 'is' for objects or functions which return a Boolean (e.g. `isAllowed`)
- Do not use trailing or leading underscores. Nothing is private.

## The Rules

[ESLint](https://eslint.org/) is used to check/enforce rules by the project maintainers. See below for the list of rules used.

_**Note:** some rules use extra configuration. For the full config, see the [.eslintrc.js](https://github.com/adaptlearning/adapt-authoring/blob/master/.eslintrc.js) included in the [adapt-authoring](https://github.com/adaptlearning/adapt-authoring) repository._

| Rule name | Severity | 
| :-------- | :------: |
{{{RULES}}}