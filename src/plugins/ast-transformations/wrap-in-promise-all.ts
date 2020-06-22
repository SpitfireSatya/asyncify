
import { IASTNode } from '../../interfaces/AST-node.interface';
import { DeepClone } from '../../utils/deep-clone';
import * as babelTypes from '@babel/types';

export class WrapInPromiseAll {

  public static transform = (nodeRef: IASTNode): void => {

    const childNode: babelTypes.CallExpression = DeepClone.clone(nodeRef.parentNode[nodeRef.key]);

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
