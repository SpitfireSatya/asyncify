
import * as babelParser from '@babel/parser';
import * as babelTypes from '@babel/types';
import { Store } from '../store/store';
import { ASTNode } from '../../models/AST-node.model';
import { ASTNodeTypes } from '../../constants/ast-node-types.constant';

export class BabelParser {

  private static _infoKeys: Array<string> = ['extras', 'loc', 'comments'];

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
      BabelParser._cacheASTNodes(ast, filePath);
      return ast;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  private static _cacheASTNodes(ast: babelTypes.File, filePath: string): void {

    function traverseAST(astNode: any, fileName: string, parentFunction: babelTypes.FunctionDeclaration): void {

      if (astNode !== null) {

        Object.keys(astNode).forEach((key: string): void => {

          if (astNode[key]) {

            if (ASTNodeTypes.functionCalls.includes(astNode[key].type)) {
              const cacheKey: string = `Callee(${fileName}:<${astNode[key].loc.start.line},${astNode[key].loc.start.column}>--<${astNode[key].loc.end.line},${astNode[key].loc.end.column}>)`;
              Store.setASTNode(cacheKey, new ASTNode(astNode, key, fileName, parentFunction, ast));
            } else if (ASTNodeTypes.functionDeclarations.includes(astNode[key].type)) {
              let cacheKey: string = `Fun(${fileName}:<${astNode[key].loc.start.line},${astNode[key].loc.start.column}>--<${astNode[key].loc.end.line},${astNode[key].loc.end.column}>)`;
              if (astNode[key].type === 'ObjectMethod') {
                cacheKey = `Fun(${fileName}:<${astNode[key].key.loc.end.line},${astNode[key].key.loc.end.column}>--<${astNode[key].loc.end.line},${astNode[key].loc.end.column}>)`;
              }
              Store.setASTNode(cacheKey, new ASTNode(astNode, key, fileName, parentFunction, ast));
            }

            if (typeof astNode[key] === 'object' && !BabelParser._infoKeys.includes(key)) {
              traverseAST(astNode[key], fileName,
                (ASTNodeTypes.functionDeclarations.indexOf(astNode.type) !== -1) ? astNode : parentFunction);
            }

          }

        });

      }

    }

    traverseAST(ast, filePath, null);

  }

}
