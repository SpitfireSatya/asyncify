
import * as babelTypes from '@babel/types';
import { ASTNodeTypes } from '../constants/ast-node-types.constant';
import { Store } from '../plugins/store/store';
import { ASTNode } from '../models/AST-node.model';
import { DeepClone } from './deep-clone';

type SetASTNode = (astNode: any, key: string, fileName: string,
  parentFunction: babelTypes.FunctionDeclaration, ast: any) => void;

export class ASTUtils {

  private static _infoKeys: Array<string> = ['extras', 'loc', 'comments'];

  public static cacheASTNodes(ast: babelTypes.File, filePath: string, createCopy: boolean = true): void {

    const setSourceASTNode: SetASTNode = createCopy ? ASTUtils._setSourceASTNodeWithCopy : ASTUtils._setSourceASTNode;
    const setTargetASTNode: SetASTNode = createCopy ? ASTUtils._setTargetASTNodeWithCopy : ASTUtils._setTargetASTNode;

    function traverseAST(astNode: any, fileName: string, parentFunction: babelTypes.FunctionDeclaration): void {

      if (astNode !== null) {

        Object.keys(astNode).forEach((key: string): void => {

          if (astNode[key]) {

            if (ASTNodeTypes.functionCalls.includes(astNode[key].type)) {

              setSourceASTNode(astNode, key, fileName, parentFunction, ast);

            } else if (ASTNodeTypes.functionDeclarations.includes(astNode[key].type)) {

              setTargetASTNode(astNode, key, fileName, parentFunction, ast);

            }

            if (typeof astNode[key] === 'object' && !ASTUtils._infoKeys.includes(key)) {
              traverseAST(astNode[key], fileName,
                (ASTNodeTypes.functionDeclarations.indexOf(astNode.type) !== -1) ? astNode : parentFunction);
            }

          }

        });

      }

    }

    traverseAST(ast, filePath, null);

  }

  private static _setSourceASTNode: SetASTNode = (astNode, key, fileName, parentFunction, ast) => {
      const cacheKey: string = `Callee(${fileName}:<${astNode[key].loc.start.line},${astNode[key].loc.start.column}>--<${astNode[key].loc.end.line},${astNode[key].loc.end.column}>)`;
      Store.setASTNode(cacheKey, new ASTNode(astNode, key, fileName, parentFunction, ast));
  }

  private static _setSourceASTNodeWithCopy: SetASTNode = (astNode, key, fileName, parentFunction, ast) => {
      const cacheKey: string = `Callee(${fileName}:<${astNode[key].loc.start.line},${astNode[key].loc.start.column}>--<${astNode[key].loc.end.line},${astNode[key].loc.end.column}>)`;
      Store.setASTNode(cacheKey, new ASTNode(astNode, key, fileName, parentFunction, ast));
      Store.setASTNodeCopy(cacheKey, new ASTNode(DeepClone.clone(astNode), key, fileName,
        DeepClone.clone(parentFunction), ast));
  }

  private static _setTargetASTNode: SetASTNode = (astNode, key, fileName, parentFunction, ast) => {
      let cacheKey: string = `Fun(${fileName}:<${astNode[key].loc.start.line},${astNode[key].loc.start.column}>--<${astNode[key].loc.end.line},${astNode[key].loc.end.column}>)`;
      if (astNode[key].type === 'ObjectMethod' && astNode[key].method) {
        cacheKey = `Fun(${fileName}:<${astNode[key].key.loc.end.line},${astNode[key].key.loc.end.column}>--<${astNode[key].loc.end.line},${astNode[key].loc.end.column}>)`;
      }
      Store.setASTNode(cacheKey, new ASTNode(astNode, key, fileName, parentFunction, ast));
  }

  private static _setTargetASTNodeWithCopy: SetASTNode = (astNode, key, fileName, parentFunction, ast) => {
      let cacheKey: string = `Fun(${fileName}:<${astNode[key].loc.start.line},${astNode[key].loc.start.column}>--<${astNode[key].loc.end.line},${astNode[key].loc.end.column}>)`;
      if (astNode[key].type === 'ObjectMethod' && astNode[key].method) {
        cacheKey = `Fun(${fileName}:<${astNode[key].key.loc.end.line},${astNode[key].key.loc.end.column}>--<${astNode[key].loc.end.line},${astNode[key].loc.end.column}>)`;
      }
      Store.setASTNode(cacheKey, new ASTNode(astNode, key, fileName, parentFunction, ast));
      Store.setASTNodeCopy(cacheKey, new ASTNode(DeepClone.clone(astNode), key, fileName,
        DeepClone.clone(parentFunction), ast));
  }

}
