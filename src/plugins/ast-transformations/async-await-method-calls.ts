
import { DeepClone } from '../../utils/deep-clone';
import { IASTNode } from '../../interfaces/AST-node.interface';
import * as babelTypes from '@babel/types';
import { ASTNodeKinds } from '../../constants/ast-node-kinds.constant';

export class AsyncAwaitMethodCalls {

  private static _asyncifiedFiles: Array<string> = [];

  public static transform = (nodeRef: IASTNode): void => {
    AsyncAwaitMethodCalls._awaitMethodCall(nodeRef);
    AsyncAwaitMethodCalls._wrapAwaitInAsync(nodeRef);
  }

  private static _awaitMethodCall = (nodeRef: IASTNode): void => {
    const childNode: babelTypes.CallExpression = DeepClone.clone(nodeRef.parentNode[nodeRef.key]);

    if (!nodeRef.parentNode.type || nodeRef.parentNode.type !== 'AwaitExpression') {
      nodeRef.parentNode[nodeRef.key] = {
        type: 'AwaitExpression',
        argument: childNode,
        extra: {
          parenthesized: true
        }
      };
    }
  }

  private static _wrapAwaitInAsync = (nodeRef: IASTNode): void => {
    if (nodeRef.parentFunction === null) {
      if (!AsyncAwaitMethodCalls._asyncifiedFiles.includes(nodeRef.fileName)) {
        AsyncAwaitMethodCalls._addIIFE(nodeRef);
        AsyncAwaitMethodCalls._asyncifiedFiles.push(nodeRef.fileName);
      }
    } else {
      if (!ASTNodeKinds.getterAndSetter().includes((<any>nodeRef.parentFunction).kind)) {
        nodeRef.parentFunction.async = true;
      }
    }
  }

  private static _addIIFE = (nodeRef: IASTNode): void => {
    const programBody: Array<babelTypes.Statement> = nodeRef.fileAST.program.body;
    const programDirectives: Array<babelTypes.Directive> = nodeRef.fileAST.program.directives;
    nodeRef.fileAST.program.body = [];
    nodeRef.fileAST.program.directives = [];
    nodeRef.fileAST.program.body.push(<any> {
      type: 'ExpressionStatement',
      expression: {
        type: 'CallExpression',
        callee: {
          type: 'FunctionExpression',
          id: null,
          generator: false,
          async: true,
          params: [],
          body: <babelTypes.BlockStatement>{
            type: 'BlockStatement',
            body: programBody,
            directives: programDirectives
          }
        },
        arguments: [],
        extra: {
          parenthesized: true
        }
      }
    });
  }

}
