
import { SyncToAwaitedPromise } from './sync-to-awaited-promise';
import { IASTNode } from '../../interfaces/AST-node.interface';
import { ASTNode } from '../../models/AST-node.model';
import { expect } from 'chai';

describe('plugins > ast-transformations', (): void => {
  describe('SyncToAwaitedPromise', (): void => {

    describe('transform()', (): void => {

      it('should add a member expression to add promises and change readFileSync to readFile', (): void => {

        const parentNode: any = {
          key: {
            callee: {
              object: { },
              property: {
                name: 'readFileSync'
              }
            }
          }
        };
        const astNode: IASTNode = new ASTNode(parentNode, 'key', 'file', null, parentNode);

        SyncToAwaitedPromise.transform(astNode);

        expect(astNode.parentNode).to.eql({
          key: {
            callee: {
              object: {
                type: 'MemberExpression',
                object: { },
                property: {
                  type: 'Identifier',
                  name: 'promises'
                }
               },
              property: {
                name: 'readFile'
              }
            }
          }
        });

      });

      it('should add a member expression to add promises and change writeFileSync to writeFile', (): void => {

        const parentNode: any = {
          key: {
            callee: {
              object: { },
              property: {
                name: 'writeFileSync'
              }
            }
          }
        };
        const astNode: IASTNode = new ASTNode(parentNode, 'key', 'file', null, parentNode);

        SyncToAwaitedPromise.transform(astNode);

        expect(astNode.parentNode).to.eql({
          key: {
            callee: {
              object: {
                type: 'MemberExpression',
                object: { },
                property: {
                  type: 'Identifier',
                  name: 'promises'
                }
               },
              property: {
                name: 'writeFile'
              }
            }
          }
        });

      });

    });

  });
});
