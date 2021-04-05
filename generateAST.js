(function(){

  const babelParser = require('@babel/parser');

  // const sourceCode = `const readFilePromise = require('util').promisify(require('fs').readFile);`;
  // const sourceCode = `readFilePromise('');`;
  // const sourceCode = `function func() { return (async function(){}()) }`;
  const sourceCode = `export function something() {}`;

  config = {
    'sourceType': 'module',
    'strictMode': false,
    'plugins': [
      'jsx',
      'flow',
      'flowComments',
      'classProperties'
    ]
  };
  try {
    const ast = babelParser.parse(sourceCode, config);
    console.log(JSON.stringify(ast, null, 2));
  } catch (e) {
    throw new Error(e.message);
  }

}());