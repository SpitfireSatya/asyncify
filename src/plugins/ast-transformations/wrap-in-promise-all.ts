
import { IASTNode } from '../../interfaces/AST-node.interface';
import * as babelTypes from '@babel/types';

export class WrapInPromiseAll {

  public static transform = (nodeRef: IASTNode): void => {

    const childNode: babelTypes.CallExpression = nodeRef.parentNode[nodeRef.key];

    const promiseAllNode: any = {
      type: 'CallExpression',
      callee: {
        type: 'MemberExpression',
        object: {
          type: 'Identifier',
          name: 'Promise'
        },
        property: {
          type: 'Identifier',
          name: 'all'
        },
        computed: false
      },
      arguments: [
        childNode
      ],
      extra: {
        parenthesized: true
      }
    };

    nodeRef.parentNode[nodeRef.key] = promiseAllNode;

  }

}
