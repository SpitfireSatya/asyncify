
import { IASTNode } from '../../interfaces/AST-node.interface';
import { DeepClone } from '../../utils/deep-clone';
import * as babelTypes from '@babel/types';

export class ForEachToForOf {

  public static transform(astNode: IASTNode): void {

    const childNode: babelTypes.CallExpression = DeepClone.clone(astNode.parentNode[astNode.key]);

    const callbackBody: Array<babelTypes.Statement> | babelTypes.BlockStatement = (<any>childNode.arguments[0]).body;
    const callbackParams: Array<babelTypes.Identifier> = (<any>childNode.arguments[0]).params;

    astNode.parentNode.type = 'ForOfStatement';
    astNode.parentNode.argument = null;
    astNode.parentNode.extra = {};
    astNode.parentNode.left = {
      type: 'VariableDeclaration',
      declarations: [
        {
          type: 'VariableDeclarator',
          id: {
            type: 'ArrayPattern',
            elements: [
            ]
          },
          init: null
        }
      ],
      kind: 'const'
    };

    if (callbackParams.length <= 1) {
      astNode.parentNode.left.declarations[0].id.elements.push({
        type: 'Identifier',
        name: 'arrayIteratorIndex'
      });
      if (callbackParams.length === 1) {
        astNode.parentNode.left.declarations[0].id.elements.push(callbackParams[0]);
      }
    } else {
      astNode.parentNode.left.declarations[0].id.elements.push(callbackParams[1]);
      astNode.parentNode.left.declarations[0].id.elements.push(callbackParams[0]);
    }

    astNode.parentNode.right = childNode;
    astNode.parentNode.right.callee.property.name = 'entries';
    astNode.parentNode.right.arguments = [];

    astNode.parentNode.body = {
      type: 'BlockStatement',
      body: [
      ],
      directives: []
    };

    ((<babelTypes.BlockStatement>callbackBody).type === 'BlockStatement') ?
      astNode.parentNode.body.body.push(...(<babelTypes.BlockStatement>callbackBody).body) :
      astNode.parentNode.body.body.push(callbackBody);

  }

}
