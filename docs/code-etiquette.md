# Code Etiquette

## Key drivers
When it comes to writing code for the authoring tool, there are three main concerns you should keep in mind:

**Stability**: the best practices in this guide aim to minimise bugs, or at least make them more easy to track down.

**Readability**: many developers will look through your code long after you've written it, so it's vital that your code plainly expresses your intentions.

**Consistency**: being consistent helps new programmers adjust quickly, and is a major player in readability. You may not agree with all of them, but please adhere to them nonetheless.

## The Rules
We ask that you strictly adhere to the following code style 'rules'.

### Whitespace
- Indentation: 2 spaces
- No trailing whitespace on lines
- No more than one line break at a time
- Keep line breaks to a minimum
- No whitespace before (if, switch, for), single space after before brace (e.g. `switch(variable) {`)
- Open curly braces go on the same line (e.g. `if(condition) {`)
- Multiline lists and function signatures should be split onto separate lines
- No spaces inside brackets or parentheses (e.g. do `func(a, b) arr[1, 2, 3]`)
- End files with a single newline character
- Use indentation with leading dots if chaining function calls
- Leave a blank line after blocks before the next statement
- Place 1 space before the opening parenthesis in control statements (if, while etc.), but no space between the argument list and the function name in function calls and declarations.
- No multiline ternary statements. If a ternary exceeds ~80 chars, refactor.
- Place 1 space before comment text (e.g. `// I am a comment`)
- For multiline `if`/`else` statements, place the `else` on the same line as the closing `if` curly bracket
- Try to keep to 80 characters per line (or as close as possible...no exceeding 100 chars)
- Single-line statements are fine if they fit into 80 chars, but **don't** combine more than block on one line (e.g. `for(...) if(condition) // do something`).
- Only one variable declaration per statement (e.g. no `const a = 1, b = 2;`)

### Naming conventions
- Use **UPPER_CASE** for constants, **UpperCamelCase** for classes and **lowerCamelCase** for functions and variables
- Variable/function/class names should be descriptive _and_ succinct
- Always name closures (it helps with debugging)
- Error variables should _always_ be named `error`
- Event variables should _always_ be named `event`
- Prefix variables that point to jQuery elements with `$`
- Use 'has' and 'is' for objects or functions which return a Boolean (e.g. `isAllowed`)
- Do not use trailing or leading underscores. Nothing is private.

### Misc
- Use semi-colons
- Use [strict equality](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)
- File headers should only include a link to the license (no list of authors/maintainers please)
- Use dot notation when accessing properties (e.g. `obj.title`) eslint: dot-notation jscs: requireDotNotation
- Never use `var`
- Wrap immediately invoked function expressions in parentheses (e.g. `(function iife() { // do stuff })()`). This helps readability.
- Always use template strings over concatenation
- Use back-ticks `` ` `` for strings
- Use `//` for single line comments
- Use `/** ... */` for multiline comments
- Don't save references to `this`, use bind utilities.
- **TODO** look into [trailing commas](https://github.com/airbnb/javascript/blob/es5-deprecated/es5/README.md#commas)

## Best practice guidelines
- Prioritise readable code over condensed code (although tick both boxes if you can!)
- Always return early (this also helps with nesting)
- Functions should be single purpose
- Use as few comments as possible, and absolutely NO commented-out code; code _should_ be self-documenting (although we all know this isn't possible all of the time)
- Limit the logic in if statement conditions. Store these in a variable for readability.
- Limit the use of scope aliases (i.e. that, self). Try to use a bind function instead (e.g. [built-in](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind) or [Underscore](http://underscorejs.org/#bind))
- Avoid deep nesting; refactor into separate functions (and/or use [async](https://github.com/caolan/async) if coding the back-end)
- Write unit tests! Whenever you fix a bug, write a regression test; a bug fixed without a regression test is likely to break again in the future.
