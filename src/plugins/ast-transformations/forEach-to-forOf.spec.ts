
import { IASTNode } from '../../interfaces/AST-node.interface';
import { ASTNode } from '../../models/AST-node.model';
import { ForEachToForOf } from './forEach-to-forOf';
import { expect } from 'chai';

describe('plugins > ast-transformations', (): void => {
  describe('ForEachToForOf', (): void => {

    describe('transform()', (): void => {

      let astNode: IASTNode, childNode: any;

      beforeEach((): void => {
        childNode = {
          type: 'CallExpression',
          callee: {
            type: 'MemberExpression',
            object: {
              type: 'Identifier',
              name: 'arr'
            },
            property: {
              type: 'Identifier',
              name: 'forEach'
            },
            computed: false
          },
          arguments: [
            {
              type: 'ArrowFunctionExpression',
              id: null,
              generator: false,
              async: false,
              expression: false,
              params: [
                {
                  type: 'Identifier',
                  name: 'e'
                }
              ],
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'CallExpression',
                      callee: {
                        type: 'MemberExpression',
                        object: {
                          type: 'Identifier',
                          name: 'console'
                        },
                        property: {
                          type: 'Identifier',
                          name: 'log'
                        },
                        computed: false
                      },
                      arguments: [
                        {
                          type: 'Identifier',
                          name: 'e'
                        }
                      ]
                    }
                  }
                ]
              }
            }
          ]
        };
        astNode = new ASTNode({ key: childNode }, 'key', 'file', <any>{}, <any>{});
      });

      afterEach((): void => {
        childNode = undefined;
        astNode = undefined;
      });

      it('should change parentNode.type to "ForOfStatement"', (): void => {

        ForEachToForOf.transform(astNode);

        expect(astNode.parentNode.type).to.equal('ForOfStatement');

      });

      it('should set parentNode.argument to null', (): void => {

        ForEachToForOf.transform(astNode);

        expect(astNode.parentNode.argument).to.eql(null);

      });

      it('should set parentNode.extra to empty object', (): void => {

        ForEachToForOf.transform(astNode);

        expect(astNode.parentNode.extra).to.eql({});

      });

      it('should set parentNode.left to a variable declarator with Array Pattern', (): void => {

        ForEachToForOf.transform(astNode);

        expect(astNode.parentNode.left).to.eql({
          type: 'VariableDeclaration',
          declarations: [
            {
              type: 'VariableDeclarator',
              id: {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'Identifier',
                    name: 'arrayIteratorIndex'
                  },
                  {
                    type: 'Identifier',
                    name: 'e'
                  }
                ]
              },
              init: null
            }
          ],
          kind: 'const'
        });

      });

      it('should set parentNode.right to the forEach() call but replace "forEach" with "entries" and empty arguments', (): void => {

        ForEachToForOf.transform(astNode);

        expect(astNode.parentNode.right).to.eql({
          type: 'CallExpression',
          callee: {
            type: 'MemberExpression',
            object: {
              type: 'Identifier',
              name: 'arr'
            },
            property: {
              type: 'Identifier',
              name: 'entries'
            },
            computed: false
          },
          arguments: []
        });

      });

      it('should set the body as block statement and spread callback body into it when it is a block statement', (): void => {

        ForEachToForOf.transform(astNode);

        expect(astNode.parentNode.body).to.eql({
          type: 'BlockStatement',
          body: [
            {
              type: 'ExpressionStatement',
              expression: {
                type: 'CallExpression',
                callee: {
                  type: 'MemberExpression',
                  object: {
                    type: 'Identifier',
                    name: 'console'
                  },
                  property: {
                    type: 'Identifier',
                    name: 'log'
                  },
                  computed: false
                },
                arguments: [
                  {
                    type: 'Identifier',
                    name: 'e'
                  }
                ]
              }
            }
          ],
          directives: []
        });

      });

      it('should set the body as block statement and push callback body into it when it is not a block statement', (): void => {

        childNode = {
          type: 'CallExpression',
          callee: {
            type: 'MemberExpression',
            object: {
              type: 'Identifier',
              name: 'arr'
            },
            property: {
              type: 'Identifier',
              name: 'forEach'
            },
            computed: false
          },
          arguments: [
            {
              type: 'ArrowFunctionExpression',
              id: null,
              generator: false,
              async: false,
              expression: false,
              params: [
                {
                  type: 'Identifier',
                  name: 'e'
                }
              ],
              body: {
                type: 'ExpressionStatement',
                expression: {
                  type: 'CallExpression',
                  callee: {
                    type: 'MemberExpression',
                    object: {
                      type: 'Identifier',
                      name: 'console'
                    },
                    property: {
                      type: 'Identifier',
                      name: 'log'
                    },
                    computed: false
                  },
                  arguments: [
                    {
                      type: 'Identifier',
                      name: 'e'
                    }
                  ]
                }
              }
            }
          ]
        };
        astNode = new ASTNode({ key: childNode }, 'key', 'file', <any>{}, <any>{});

        ForEachToForOf.transform(astNode);

        expect(astNode.parentNode.body).to.eql({
          type: 'BlockStatement',
          body: [
            {
              type: 'ExpressionStatement',
              expression: {
                type: 'CallExpression',
                callee: {
                  type: 'MemberExpression',
                  object: {
                    type: 'Identifier',
                    name: 'console'
                  },
                  property: {
                    type: 'Identifier',
                    name: 'log'
                  },
                  computed: false
                },
                arguments: [
                  {
                    type: 'Identifier',
                    name: 'e'
                  }
                ]
              }
            }
          ],
          directives: []
        });

      });

      it('should handle 2 parameters to callback function', (): void => {

        childNode = {
          type: 'CallExpression',
          callee: {
            type: 'MemberExpression',
            object: {
              type: 'Identifier',
              name: 'arr'
            },
            property: {
              type: 'Identifier',
              name: 'forEach'
            },
            computed: false
          },
          arguments: [
            {
              type: 'ArrowFunctionExpression',
              id: null,
              generator: false,
              async: false,
              expression: false,
              params: [
                {
                  type: 'Identifier',
                  name: 'e'
                },
                {
                  type: 'Identifier',
                  name: 'i'
                }
              ],
              body: {
                type: 'ExpressionStatement',
                expression: {
                  type: 'CallExpression',
                  callee: {
                    type: 'MemberExpression',
                    object: {
                      type: 'Identifier',
                      name: 'console'
                    },
                    property: {
                      type: 'Identifier',
                      name: 'log'
                    },
                    computed: false
                  },
                  arguments: [
                    {
                      type: 'Identifier',
                      name: 'e'
                    }
                  ]
                }
              }
            }
          ]
        };
        astNode = new ASTNode({ key: childNode }, 'key', 'file', <any>{}, <any>{});

        ForEachToForOf.transform(astNode);

        expect(astNode.parentNode.left).to.eql({
          type: 'VariableDeclaration',
          declarations: [
            {
              type: 'VariableDeclarator',
              id: {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'Identifier',
                    name: 'i'
                  },
                  {
                    type: 'Identifier',
                    name: 'e'
                  }
                ]
              },
              init: null
            }
          ],
          kind: 'const'
        });

      });

      it('should handle 0 parameters to callback function', (): void => {

        childNode = {
          type: 'CallExpression',
          callee: {
            type: 'MemberExpression',
            object: {
              type: 'Identifier',
              name: 'arr'
            },
            property: {
              type: 'Identifier',
              name: 'forEach'
            },
            computed: false
          },
          arguments: [
            {
              type: 'ArrowFunctionExpression',
              id: null,
              generator: false,
              async: false,
              expression: false,
              params: [],
              body: {
                type: 'ExpressionStatement',
                expression: {
                  type: 'CallExpression',
                  callee: {
                    type: 'MemberExpression',
                    object: {
                      type: 'Identifier',
                      name: 'console'
                    },
                    property: {
                      type: 'Identifier',
                      name: 'log'
                    },
                    computed: false
                  },
                  arguments: [
                    {
                      type: 'Identifier',
                      name: 'e'
                    }
                  ]
                }
              }
            }
          ]
        };
        astNode = new ASTNode({ key: childNode }, 'key', 'file', <any>{}, <any>{});

        ForEachToForOf.transform(astNode);

        expect(astNode.parentNode.left).to.eql({
          type: 'VariableDeclaration',
          declarations: [
            {
              type: 'VariableDeclarator',
              id: {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'Identifier',
                    name: 'arrayIteratorIndex'
                  }
                ]
              },
              init: null
            }
          ],
          kind: 'const'
        });

      });

    });

  });
}); // tslint:disable-line: max-file-line-count
