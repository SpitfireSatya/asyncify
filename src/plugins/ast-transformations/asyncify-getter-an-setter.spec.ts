
import { IASTNode } from '../../interfaces/AST-node.interface';
import { ASTNode } from '../../models/AST-node.model';
import { AsyncifyGetterAndSetter } from './asyncify-getter-and-setter';
import { expect } from 'chai';

describe('plugins > ast-transformations', (): void => {
  describe('AsyncifyGetterAndSetter', (): void => {

    it('should wrap the getter body in an async IIFE and return it', (): void => {

      const astNode: IASTNode = new ASTNode({ key: { body: { body: [{}]}} }, 'key', '', null, <any>{});

      AsyncifyGetterAndSetter.transform(astNode);

      expect(astNode.parentNode).to.eql({
        key: {
          body: {
            body: [
              {
                type: 'ReturnStatement',
                argument: {
                  type: 'CallExpression',
                  callee: {
                    type: 'FunctionExpression',
                    id: null,
                    generator: false,
                    async: true,
                    params: [],
                    body: {
                      body: [{}]
                    }
                  },
                  arguments: [],
                  extra: {
                    parenthesized: true
                  }
                },
                extra: {
                  parenthesized: true
                }
              }
            ]
          }
        }
      });

    });

  });
});
