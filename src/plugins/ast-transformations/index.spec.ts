
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
import { ForEachToForOf } from './forEach-to-forOf';
import { WrapInPromiseAll } from './wrap-in-promise-all';
import { CallgraphUtils } from '../../utils/callgraph-utils';
import { AsyncifyGetterAndSetter } from './asyncify-getter-and-setter';

describe('plugins > ast-transformations', (): void => {
  describe('ASTTransformations', (): void => {

    describe('transform()', (): void => {

      it('should invoke _traverseCallTree() with each child node', (): void => {

        const rootNode: Node = new Node(null, null);
        const child1: Node = new Node('abc', 'abc');
        rootNode.addChild = child1;
        const child2: Node = new Node('def', 'def');
        rootNode.addChild = child2;
        const traverseASTStub: sinon.SinonStub = sinon.stub(<any>ASTTransformations, '_traverseCallTree');

        ASTTransformations.transform(rootNode);

        sinon.assert.calledWithExactly(traverseASTStub.firstCall, rootNode.children[0]);
        sinon.assert.calledWithExactly(traverseASTStub.secondCall, rootNode.children[1]);

        traverseASTStub.restore();

      });

    });

    describe('[private] _traverseCallTree', (): void => {

      let getRequiredTransformStub: sinon.SinonStub, getASTNodeStub: sinon.SinonStub;
      let syncToAwaitedPromiseStub: sinon.SinonStub, asyncAwaitMethodCallsStub: sinon.SinonStub;
      let forEachToForOfStub: sinon.SinonStub, wrapInPromiseAllStub: sinon.SinonStub;
      let getFileNameStub: sinon.SinonStub, getFileListStub: sinon.SinonStub;
      let asyncifyGetterAndSetterStub: sinon.SinonStub;
      let node: Node, astNode: IASTNode;

      beforeEach((): void => {
        astNode = new ASTNode({}, '', '', <any>{}, <any>{});
        ASTTransformations['_visited'] = [];
        getRequiredTransformStub = sinon.stub(<any>ASTTransformations, '_getRequiredTransform');
        getASTNodeStub = sinon.stub(Store, 'getASTNode').returns(astNode);
        syncToAwaitedPromiseStub = sinon.stub(SyncToAwaitedPromise, 'transform');
        asyncAwaitMethodCallsStub = sinon.stub(AsyncAwaitMethodCalls, 'transform');
        forEachToForOfStub = sinon.stub(ForEachToForOf, 'transform');
        wrapInPromiseAllStub = sinon.stub(WrapInPromiseAll, 'transform');
        getFileNameStub = sinon.stub(CallgraphUtils, 'getFileName').returns('file');
        getFileListStub = sinon.stub(Store, 'getFileList').returns(['file']);
        asyncifyGetterAndSetterStub = sinon.stub(AsyncifyGetterAndSetter, 'transform');
        node = new Node('source', 'target');
      });

      afterEach((): void => {
        ASTTransformations['_visited'] = [];
        getRequiredTransformStub.restore();
        getASTNodeStub.restore();
        syncToAwaitedPromiseStub.restore();
        asyncAwaitMethodCallsStub.restore();
        forEachToForOfStub.restore();
        wrapInPromiseAllStub.restore();
        getFileNameStub.restore();
        getFileListStub.restore();
        asyncifyGetterAndSetterStub.restore();
        node = undefined;
        astNode = undefined;
      });

      it('should invoke _getRequiredTransform()', (): void => {

        ASTTransformations['_traverseCallTree'](node);

        sinon.assert.calledWithExactly(getRequiredTransformStub, node);

      });

      it('should do nothing if file is not present in fileList', (): void => {

        getFileNameStub.returns('externs');

        ASTTransformations['_traverseCallTree'](node);

        sinon.assert.notCalled(getRequiredTransformStub);

      });

      it('should invoke AsyncAwaitMethodCalls.transform() by default with astNode for node.source', (): void => {

        ASTTransformations['_traverseCallTree'](node);

        sinon.assert.calledWithExactly(getASTNodeStub, 'source');
        sinon.assert.calledWithExactly(asyncAwaitMethodCallsStub, astNode);

      });

      it('should invoke AsyncAwaitMethodCalls.transform() with astNode for node.source is required transform is ASYNC_AWAIT', (): void => {

        getRequiredTransformStub.returns(RequiredTransform.ASYNC_AWAIT);

        ASTTransformations['_traverseCallTree'](node);

        sinon.assert.calledWithExactly(getASTNodeStub, 'source');
        sinon.assert.calledWithExactly(asyncAwaitMethodCallsStub, astNode);

      });

      it('should invoke SyncToAwaitedPromise.transform() and AsyncAwaitMethodCalls.transform() with astNode for node.source is required transform is ASYNC_AWAIT', (): void => {

        getRequiredTransformStub.returns(RequiredTransform.SYNC_TO_ASYNC);

        ASTTransformations['_traverseCallTree'](node);

        sinon.assert.calledWithExactly(getASTNodeStub, 'source');
        sinon.assert.calledWithExactly(syncToAwaitedPromiseStub, astNode);
        sinon.assert.calledWithExactly(asyncAwaitMethodCallsStub, astNode);

        sinon.assert.callOrder(syncToAwaitedPromiseStub, asyncAwaitMethodCallsStub);

      });

      it('should invoke ForEachToForOf.transform() and AsyncAwaitMethodCalls.transform() with astNode for node.source is required transform is FOR_OF_LOOP', (): void => {

        getRequiredTransformStub.returns(RequiredTransform.FOR_OF_LOOP);

        ASTTransformations['_traverseCallTree'](node);

        sinon.assert.calledWithExactly(getASTNodeStub, 'source');
        sinon.assert.calledWithExactly(forEachToForOfStub, astNode);
        sinon.assert.calledWithExactly(asyncAwaitMethodCallsStub, astNode);

        sinon.assert.callOrder(forEachToForOfStub, asyncAwaitMethodCallsStub);

      });

      it('should invoke WrapInPromiseAll.transform() and AsyncAwaitMethodCalls.transform() with astNode for node.source is required transform is PROMISE_ALL', (): void => {

        getRequiredTransformStub.returns(RequiredTransform.PROMISE_ALL);

        ASTTransformations['_traverseCallTree'](node);

        sinon.assert.calledWithExactly(getASTNodeStub, 'source');
        sinon.assert.calledWithExactly(wrapInPromiseAllStub, astNode);
        sinon.assert.calledWithExactly(asyncAwaitMethodCallsStub, astNode);

        sinon.assert.callOrder(wrapInPromiseAllStub, asyncAwaitMethodCallsStub);

      });

      it('should invoke AsyncifyGetterAndSetter.transform() if target node is a getter', (): void => {

        astNode = new ASTNode({ key: {kind: 'get'}}, 'key', 'file', null, <any>{});
        getASTNodeStub.returns(astNode);

        ASTTransformations['_traverseCallTree'](node);

        sinon.assert.calledWithExactly(asyncifyGetterAndSetterStub, astNode);

      });

      it('should invoke AsyncifyGetterAndSetter.transform() if target node is a setter', (): void => {

        astNode = new ASTNode({ key: {kind: 'set'}}, 'key', 'file', null, <any>{});
        getASTNodeStub.returns(astNode);

        ASTTransformations['_traverseCallTree'](node);

        sinon.assert.calledWithExactly(asyncifyGetterAndSetterStub, astNode);

      });

      it('should not invoke AsyncifyGetterAndSetter.transform() if target node is of any other kind', (): void => {

        astNode = new ASTNode({ key: {kind: 'const'}}, 'key', 'file', null, <any>{});
        getASTNodeStub.returns(astNode);

        ASTTransformations['_traverseCallTree'](node);

        sinon.assert.notCalled(asyncifyGetterAndSetterStub);

      });

      it('should add node.source to _visited', (): void => {

        ASTTransformations['_traverseCallTree'](node);

        expect(ASTTransformations['_visited'][0]).to.equal('source');

      });

      it('should add node.target to _visited', (): void => {

        ASTTransformations['_traverseCallTree'](node);

        expect(ASTTransformations['_visited'][1]).to.equal('target');

      });

      it('should do nothing if node.source and node.target have already been visited', (): void => {

        ASTTransformations['_visited'].push('source');
        ASTTransformations['_visited'].push('target');

        ASTTransformations['_traverseCallTree'](node);

        sinon.assert.notCalled(getRequiredTransformStub);
        sinon.assert.notCalled(getASTNodeStub);
        sinon.assert.notCalled(syncToAwaitedPromiseStub);
        sinon.assert.notCalled(asyncAwaitMethodCallsStub);
        sinon.assert.notCalled(asyncifyGetterAndSetterStub);

      });

      it('should not call source transformations if node.source has already been visited', (): void => {

        ASTTransformations['_visited'].push('source');

        ASTTransformations['_traverseCallTree'](node);

        sinon.assert.notCalled(getRequiredTransformStub);
        sinon.assert.notCalled(syncToAwaitedPromiseStub);
        sinon.assert.notCalled(asyncAwaitMethodCallsStub);

      });

      it('should not call target transformations if node.target has already been visited', (): void => {

        ASTTransformations['_visited'].push('target');

        ASTTransformations['_traverseCallTree'](node);

        sinon.assert.notCalled(asyncifyGetterAndSetterStub);

      });

      it('should recursively call the child nodes', (): void => {

        node.addChild = new Node('', '');

        ASTTransformations['_traverseCallTree'](node);

        sinon.assert.callCount(getRequiredTransformStub, 2);

      });

    });

    describe('[private] _getRequiredTransform()', (): void => {

      function testTransforms(nodeSource: string, nodeTarget: string, requiredTransform: RequiredTransform): void {

        it(`should return ${requiredTransform} if node source is "${nodeSource}" and node target is "${nodeTarget}"`, (): void => {

          const result: RequiredTransform = ASTTransformations['_getRequiredTransform'](new Node(nodeSource, nodeTarget));

          expect(result).to.equal(requiredTransform);

        });

      }

      ExternsFuncDefinitions.syncFunctions.forEach((func: string): void => {
        testTransforms('', func, RequiredTransform.SYNC_TO_ASYNC);
      });

      ExternsFuncDefinitions.forEachFunctions.forEach((func: string): void => {
        testTransforms('', func, RequiredTransform.FOR_OF_LOOP);
      });

      ExternsFuncDefinitions.mapFunctions.forEach((func: string): void => {
        testTransforms('', func, RequiredTransform.PROMISE_ALL);
      });

      it('should return "ASYNC_AWAIT" by default', (): void => {

        const result: RequiredTransform = ASTTransformations['_getRequiredTransform'](new Node(null, null));

        expect(result).to.equal(RequiredTransform.ASYNC_AWAIT);

      });

    });

  });
});
