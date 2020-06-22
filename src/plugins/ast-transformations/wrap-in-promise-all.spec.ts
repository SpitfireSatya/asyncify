
import { IASTNode } from '../../interfaces/AST-node.interface';
import { ASTNode } from '../../models/AST-node.model';
import { WrapInPromiseAll } from './wrap-in-promise-all';
import { expect } from 'chai';

describe('plugins > ast-transformations', (): void => {
  describe('WrapInPromiseAll', (): void => {

    describe('transform()', (): void => {

      it('should wrap the input node in Promise.all()', (): void => {

        const astNode: IASTNode = new ASTNode({ key: {} }, 'key', '', <any>{}, <any>{});

        WrapInPromiseAll.transform(astNode);

        expect(astNode.parentNode).to.eql({
          key: {
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
              {}
            ],
            extra: {
              parenthesized: true
            }
          }
        });

      });

    });

  });
});
