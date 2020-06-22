
import { IASTNode } from '../../interfaces/AST-node.interface';
import { DeepClone } from '../../utils/deep-clone';
import * as babelTypes from '@babel/types';

export class AsyncifyGetterAndSetter {

  public static transform = (nodeRef: IASTNode): void => {

    const childNode: babelTypes.FunctionExpression = DeepClone.clone(nodeRef.parentNode[nodeRef.key]);
    const childBody: any = childNode.body;

    const asyncIIFENode: any = {
      type: 'ReturnStatement',
      argument: {
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
      },
      extra: {
        parenthesized: true
      }
    };

    nodeRef.parentNode[nodeRef.key].body.body = [];
    nodeRef.parentNode[nodeRef.key].body.body.push(asyncIIFENode);

  }

}
