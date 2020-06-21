
import * as sinon from 'sinon';
import { ASTTransformations } from '.';
import { Node } from '../../models/node.model';
import { Store } from '../store/store';
import { SyncToAwaitedPromise } from './sync-to-awaited-promise';
import { AsyncAwaitMethodCalls } from './async-await-method-calls';
import { ASTNode } from '../../models/AST-node.model';
import { IASTNode } from '../../interfaces/AST-node.interface';
import { RequiredTransform } from '../../enums/required-transform.enum';
import { expect } from 'chai';
import { ExternsFuncDefinitions } from '../../constants/externs-func-definitions';


describe('plugins > ast-transformations', (): void => {
  describe('ASTTransformations', (): void => {

    describe('transform()', (): void => {

      it('should invoke _traverseAST() with each child node', (): void => {

        const rootNode: Node = new Node(null, null);
        const child1: Node = new Node('abc', 'abc');
        rootNode.addChild = child1;
        const child2: Node = new Node('def', 'def');
        rootNode.addChild = child2;
        const traverseASTStub: sinon.SinonStub = sinon.stub(<any>ASTTransformations, '_traverseAST');

        ASTTransformations.transform(rootNode);

        sinon.assert.calledWithExactly(traverseASTStub.firstCall, rootNode.children[0]);
        sinon.assert.calledWithExactly(traverseASTStub.secondCall, rootNode.children[1]);

        traverseASTStub.restore();

      });

    });

    describe('[private] _traverseAST', (): void => {

      let getRequiredTransformStub: sinon.SinonStub, getASTNodeStub: sinon.SinonStub;
      let syncToAwaitedPromiseStub: sinon.SinonStub, asyncAwaitMethodCallsStub: sinon.SinonStub;
      let node: Node, astNode: IASTNode;

      beforeEach((): void => {
        astNode = new ASTNode({}, '', '', <any>{}, <any>{});
        ASTTransformations['_visited'] = [];
        getRequiredTransformStub = sinon.stub(<any>ASTTransformations, '_getRequiredTransform');
        getASTNodeStub = sinon.stub(Store, 'getASTNode').returns(astNode);
        syncToAwaitedPromiseStub = sinon.stub(SyncToAwaitedPromise, 'transform');
        asyncAwaitMethodCallsStub = sinon.stub(AsyncAwaitMethodCalls, 'transform');
        node = new Node('source', 'target');
      });

      afterEach((): void => {
        ASTTransformations['_visited'] = [];
        getRequiredTransformStub.restore();
        getASTNodeStub.restore();
        syncToAwaitedPromiseStub.restore();
        asyncAwaitMethodCallsStub.restore();
        node = undefined;
        astNode = undefined;
      });

      it('should invoke _getRequiredTransform()', (): void => {

        ASTTransformations['_traverseAST'](node);

        sinon.assert.calledWithExactly(getRequiredTransformStub, node);

      });

      it('should invoke AsyncAwaitMethodCalls.transform() by default with astNode for node.source', (): void => {

        ASTTransformations['_traverseAST'](node);

        sinon.assert.calledWithExactly(getASTNodeStub, 'source');
        sinon.assert.calledWithExactly(asyncAwaitMethodCallsStub, astNode);

      });

      it('should invoke AsyncAwaitMethodCalls.transform() with astNode for node.source is required transform is ASYNC_AWAIT', (): void => {

        getRequiredTransformStub.returns(RequiredTransform.ASYNC_AWAIT);

        ASTTransformations['_traverseAST'](node);

        sinon.assert.calledWithExactly(getASTNodeStub, 'source');
        sinon.assert.calledWithExactly(asyncAwaitMethodCallsStub, astNode);

      });

      it('should invoke SyncToAwaitedPromise.transform() and AsyncAwaitMethodCalls.transform() with astNode for node.source is required transform is ASYNC_AWAIT', (): void => {

        getRequiredTransformStub.returns(RequiredTransform.SYNC_TO_ASYNC);

        ASTTransformations['_traverseAST'](node);

        sinon.assert.calledWithExactly(getASTNodeStub, 'source');
        sinon.assert.calledWithExactly(syncToAwaitedPromiseStub, astNode);
        sinon.assert.calledWithExactly(asyncAwaitMethodCallsStub, astNode);

      });

      it('should add node.source to _visited', (): void => {

        ASTTransformations['_traverseAST'](node);

        expect(ASTTransformations['_visited'][0]).to.equal('source');

      });

      it('should do nothing if node.source has already been visited', (): void => {

        ASTTransformations['_visited'].push('source');

        ASTTransformations['_traverseAST'](node);

        sinon.assert.notCalled(getRequiredTransformStub);
        sinon.assert.notCalled(getASTNodeStub);
        sinon.assert.notCalled(syncToAwaitedPromiseStub);
        sinon.assert.notCalled(asyncAwaitMethodCallsStub);

      });

      it('should recursively call the child nodes', (): void => {

        node.addChild = new Node('', '');

        ASTTransformations['_traverseAST'](node);

        sinon.assert.callCount(getRequiredTransformStub, 2);

      });

    });

    describe('[private] _getRequiredTransform()', (): void => {

      function testSyncToAsync(nodeTarget: string): void {

        it(`should return "SYNC_TO_ASYNC" if node target is "${nodeTarget}"`, (): void => {

          const result: RequiredTransform = ASTTransformations['_getRequiredTransform'](new Node('', nodeTarget));

          expect(result).to.equal(RequiredTransform.SYNC_TO_ASYNC);

        });

      }

      ExternsFuncDefinitions.syncFunctions.forEach((func: string): void => {
        testSyncToAsync(func);
      });

      it('should return "ASYNC_AWAIT" by default', (): void => {

        const result: RequiredTransform = ASTTransformations['_getRequiredTransform'](new Node(null, null));

        expect(result).to.equal(RequiredTransform.ASYNC_AWAIT);

      });

    });

  });
});
