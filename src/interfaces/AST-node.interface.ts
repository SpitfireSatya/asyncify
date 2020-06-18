
import * as babelTypes from '@babel/types';

export interface IASTNode {
  parentNode: any;
  key: string;
  fileName: string;
  parentFunction: babelTypes.FunctionDeclaration;
  fileAST: babelTypes.File;
}
