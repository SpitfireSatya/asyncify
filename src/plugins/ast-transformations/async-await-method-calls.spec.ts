
import * as sinon from 'sinon';
import { AsyncAwaitMethodCalls } from './async-await-method-calls';
import { IASTNode } from '../../interfaces/AST-node.interface';
import { ASTNode } from '../../models/AST-node.model';
import { expect } from 'chai';


describe('plugins > ast-transformations', (): void => {
  describe('AsyncAwaitMethodCalls()', (): void => {

    describe('transform()', (): void => {

      let awaitMethodCallStub: sinon.SinonStub, wrapAwaitInAsyncStub: sinon.SinonStub;
      let astNode: IASTNode;

      beforeEach((): void => {
        astNode = new ASTNode({}, '', '', <any>{}, <any>{});
        awaitMethodCallStub = sinon.stub(<any>AsyncAwaitMethodCalls, '_awaitMethodCall');
        wrapAwaitInAsyncStub = sinon.stub(<any>AsyncAwaitMethodCalls, '_wrapAwaitInAsync');
      });

      afterEach((): void => {
        astNode = undefined;
        awaitMethodCallStub.restore();
        wrapAwaitInAsyncStub.restore();
      });

      it('should invoke _awaitMethodCall() with input node', (): void => {

        AsyncAwaitMethodCalls.transform(astNode);

        sinon.assert.calledWithExactly(awaitMethodCallStub, astNode);

      });

      it('should invoke _wrapAwaitInAsync() with input node', (): void => {

        AsyncAwaitMethodCalls.transform(astNode);

        sinon.assert.calledWithExactly(wrapAwaitInAsyncStub, astNode);

      });

    });

    describe('[private] _awaitMethodCall()', (): void => {

      it('should add an await expression to parent node', (): void => {

        const astNode: IASTNode = new ASTNode({ key: {}}, 'key', 'file', <any>{}, <any>{});

        AsyncAwaitMethodCalls['_awaitMethodCall'](astNode);

        expect(astNode.parentNode).to.eql({
          key: {
            type: 'AwaitExpression',
            argument: {},
            extra: {
              parenthesized: true
            }
          }
        });

      });

      it('should do nothing if parent node is an await expression', (): void => {

        const astNode: IASTNode = new ASTNode({ type: 'AwaitExpression', key: {}}, 'key', 'file', <any>{}, <any>{});

        AsyncAwaitMethodCalls['_awaitMethodCall'](astNode);

        expect(astNode.parentNode).to.eql({
          type: 'AwaitExpression',
          key: { }
        });

      });

    });

    describe('[private] _wrapAwaitInAsync()', (): void => {

      let addIIFEStub: sinon.SinonStub;

      beforeEach((): void => {
        AsyncAwaitMethodCalls['_asyncifiedFiles'] = [];
        addIIFEStub = sinon.stub(<any>AsyncAwaitMethodCalls, '_addIIFE');
      });

      afterEach((): void => {
        AsyncAwaitMethodCalls['_asyncifiedFiles'] = [];
        addIIFEStub.restore();
      });

      it('should set parentFunction.async to true', (): void => {

        const astNode: IASTNode = new ASTNode({ }, '', '', <any>{ async: false }, <any>{ });

        AsyncAwaitMethodCalls['_wrapAwaitInAsync'](astNode);

        expect(astNode.parentFunction.async).to.equal(true);

      });

      it('should invoke _addIIFE() if parentFunction is null and file hasnt been asyncified', (): void => {

        const astNode: IASTNode = new ASTNode({ }, '', 'file', null, <any>{ });

        AsyncAwaitMethodCalls['_wrapAwaitInAsync'](astNode);

        sinon.assert.calledWithExactly(addIIFEStub, astNode);

      });

      it('should add fileName to _asyncifiedFiles if parentFunction is null and file hasnt been asyncified', (): void => {

        const astNode: IASTNode = new ASTNode({ }, '', 'file', null, <any>{ });

        AsyncAwaitMethodCalls['_wrapAwaitInAsync'](astNode);

        expect(AsyncAwaitMethodCalls['_asyncifiedFiles'][0]).to.equal('file');

      });

      it('should do nothing if parent function is a getter', (): void => {

        const astNode: IASTNode = new ASTNode({key: {}}, 'key', 'file', <any>{ kind: 'get'}, <any>{});

        AsyncAwaitMethodCalls['_wrapAwaitInAsync'](astNode);

        expect(astNode.parentNode).to.eql({
          key: { }
        });

      });

      it('should do nothing if parent function is a setter', (): void => {

        const astNode: IASTNode = new ASTNode({key: {}}, 'key', 'file', <any>{ kind: 'set'}, <any>{});

        AsyncAwaitMethodCalls['_wrapAwaitInAsync'](astNode);

        expect(astNode.parentNode).to.eql({
          key: { }
        });

      });

      it('should do nothing if file has already been asyncified', (): void => {

        AsyncAwaitMethodCalls['_asyncifiedFiles'].push('file');
        const astNode: IASTNode = new ASTNode({ }, '', 'file', null, <any>{ });

        AsyncAwaitMethodCalls['_wrapAwaitInAsync'](astNode);

        sinon.assert.notCalled(addIIFEStub);

      });

    });

    describe('[private] _addIIFE()', (): void => {

      it('should add an IIFE at the root of the file AST', (): void => {

        const program: any = {
          program: {
            body: { },
            directives: []
          }
        };
        const astNode: IASTNode = new ASTNode({}, '', '', null, program);

        AsyncAwaitMethodCalls['_addIIFE'](astNode);

        expect(astNode.fileAST).to.eql({
          program: {
            body: [{
              type: 'ExpressionStatement',
              expression: {
                type: 'CallExpression',
                callee: {
                  type: 'FunctionExpression',
                  id: null,
                  generator: false,
                  async: true,
                  params: [],
                  body: <any>{
                    type: 'BlockStatement',
                    body: {},
                    directives: []
                  }
                },
                arguments: [],
                extra: {
                  parenthesized: true
                }
              }
            }],
            directives: []
          }
        });

      });

    });

  });
});
