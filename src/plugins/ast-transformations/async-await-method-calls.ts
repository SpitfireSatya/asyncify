
import { DeepClone } from '../../utils/deep-clone';
import { IASTNode } from '../../interfaces/AST-node.interface';
import * as babelTypes from '@babel/types';

export class AsyncAwaitMethodCalls {

  private static asyncifiedFiles: Array<string> = [];

  public static transform = (nodeRef: IASTNode): void => {
    AsyncAwaitMethodCalls.awaitMethodCall(nodeRef);
    AsyncAwaitMethodCalls.wrapAsyncInAwait(nodeRef);
  }

  private static awaitMethodCall = (nodeRef: IASTNode): void => {
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

  private static wrapAsyncInAwait = (nodeRef: IASTNode): void => {
    if (nodeRef.parentFunction === null) {
      if (!AsyncAwaitMethodCalls.asyncifiedFiles.includes(nodeRef.fileName)) {
        AsyncAwaitMethodCalls.addIIFE(nodeRef);
        AsyncAwaitMethodCalls.asyncifiedFiles.push(nodeRef.fileName);
      }
    } else {
      nodeRef.parentFunction.async = true;
    }
  }

  private static addIIFE = (nodeRef: IASTNode): void => {
    const programBody: Array<babelTypes.Statement> = nodeRef.fileAST.program.body;
    const programDirectives: Array<babelTypes.Directive> = nodeRef.fileAST.program.directives;
    nodeRef.fileAST.program.body = [];
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
