
import { IASTNode } from '../../interfaces/AST-node.interface';
import * as babelTypes from '@babel/types';

export class AsyncifyConstructor {

  public static transform = (nodeRef: IASTNode): void => {

    const childNode: babelTypes.FunctionExpression = nodeRef.parentNode[nodeRef.key];
    const childBody: any = childNode.body;

    const asyncIIFENode: any = {
      type: 'CallExpression',
      callee: {
        type: 'FunctionExpression',
        id: null,
        generator: false,
        async: true,
        params: [],
        body: childBody
      },
      arguments: [],
      extra: {
        parenthesized: true
      }
    };

    nodeRef.parentNode[nodeRef.key].body.body = [];
    nodeRef.parentNode[nodeRef.key].body.body.push(asyncIIFENode);

  }

}
