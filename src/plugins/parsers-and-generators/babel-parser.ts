
import * as babelParser from '@babel/parser';
import * as babelTypes from '@babel/types';
import { Store } from '../store/store';
import { ASTNode } from '../../models/AST-node.model';

const functionTypes: Array<string> = ['FunctionDeclaration', 'FunctionExpression', 'ArrowFunctionExpression', 'ArrowFunctionDeclaration', 'ClassMethod'];
const infoKeys: Array<string> = ['extras', 'loc', 'comments'];

export class BabelParser {

  public static generateAST(sourceCode: string, config: babelParser.ParserOptions, filePath: string): babelTypes.File {
    try {
      const ast: babelTypes.File = babelParser.parse(sourceCode, config);
      BabelParser.cacheASTNodes(ast, filePath);
      return ast;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  private static cacheASTNodes(ast: babelTypes.File, filePath: string): void {

    function traverseAST(astNode: any, fileName: string, parentFunction: babelTypes.FunctionDeclaration): void {

      if (astNode !== null) {

        Object.keys(astNode).forEach((key: string): void => {

          if (astNode[key]) {

            if (astNode[key].type === 'CallExpression') {
              const cacheKey: string = `Callee(${fileName}:<${astNode[key].loc.start.line},${astNode[key].loc.start.column}>--<${astNode[key].loc.end.line},${astNode[key].loc.end.column}>)`;
              Store.setASTNode(cacheKey, new ASTNode(astNode, key, fileName, parentFunction, ast));
            } else if (functionTypes.includes(astNode[key].type)) {
              const cacheKey: string = `Fun(${fileName}:<${astNode[key].loc.start.line},${astNode[key].loc.start.column}>--<${astNode[key].loc.end.line},${astNode[key].loc.end.column}>)`;
              Store.setASTNode(cacheKey, new ASTNode(astNode, key, fileName, parentFunction, ast));
            }

            if (typeof astNode[key] === 'object' && !infoKeys.includes(key)) {
              traverseAST(astNode[key], fileName, (functionTypes.indexOf(astNode.type) !== -1) ? astNode : parentFunction);
            }

          }

        });

      }

    }

    traverseAST(ast, filePath, null);

  }

}
