
import * as babelGenerator from '@babel/generator';
import * as babelTypes from '@babel/types';

export class BabelGenerator {

  public static generateCode(ast: babelTypes.File, config: babelGenerator.GeneratorOptions): string {
    try {
      const code: string = babelGenerator.default(ast, config).code;
      return code;
    } catch (e) {
      throw new Error('Error generating Code from AST');
    }
  }

}
