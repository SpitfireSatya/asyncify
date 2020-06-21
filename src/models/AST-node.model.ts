
/* istanbul ignore file */

import { IASTNode } from '../interfaces/AST-node.interface';
import * as babelTypes from '@babel/types';

export class ASTNode implements IASTNode {

  public parentNode: any;
  public key: string;
  public fileName: string;
  public parentFunction: babelTypes.FunctionDeclaration;
  public fileAST: babelTypes.File;

  constructor(parentNode: any, key: string, fileName: string, parentFunction: babelTypes.FunctionDeclaration, fileAST: babelTypes.File) {
    this.parentNode = parentNode;
    this.key = key;
    this.fileName = fileName;
    this.parentFunction = parentFunction;
    this.fileAST = fileAST;
  }

}
