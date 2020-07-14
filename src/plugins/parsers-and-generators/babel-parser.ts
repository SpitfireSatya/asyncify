
import * as babelParser from '@babel/parser';
import * as babelTypes from '@babel/types';

export class BabelParser {

  public static generateAST(sourceCode: string, config: babelParser.ParserOptions, filePath: string): babelTypes.File {
    config = {
      'sourceType': 'module',
      'plugins': [
        'jsx',
        'flow',
        'flowComments',
        'classProperties'
      ]
    };
    try {
      const ast: babelTypes.File = babelParser.parse(sourceCode, config);
      return ast;
    } catch (e) {
      throw new Error(e.message);
    }
  }

}
