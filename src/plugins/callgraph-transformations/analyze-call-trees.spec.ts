
import { AnalyzeCallTrees } from './analyze-call-trees';
import * as sinon from 'sinon';
import { expect } from 'chai';
import { Node } from '../../models/node.model';
import { Store } from '../store/store';
import { ExternsCallDefinitions } from '../../constants/externs-call-definitions.constant';
import { ASTNode } from '../../models/AST-node.model';


describe('plugins > callgraph-transformations', (): void => {
  describe('AnalyzeCallTrees', (): void => {

    describe('analyze()', (): void => {

      let isCallToExternsStub: sinon.SinonStub, isCallbackFromExterns: sinon.SinonStub;
      let isValidExternsCallStub: sinon.SinonStub/*, isCallToGetterOrSetterStub: sinon.SinonStub */;
      let isNewPromiseStub: sinon.SinonStub;

      let rootNode: Node;
      let childNode: Node;

      beforeEach((): void => {
        isCallToExternsStub = sinon.stub(<any>AnalyzeCallTrees, '_isCallToExterns');
        isCallbackFromExterns = sinon.stub(<any>AnalyzeCallTrees, '_isCallbackFromExterns');
        isValidExternsCallStub = sinon.stub(<any>AnalyzeCallTrees, '_isValidExternsCall');
        // isCallToGetterOrSetterStub = sinon.stub(<any>AnalyzeCallTrees, '_isCallToGetterOrSetter');
        isNewPromiseStub = sinon.stub(<any>AnalyzeCallTrees, '_isNewPromise');

        rootNode = new Node(null, null);
        childNode = new Node('abc', 'abc');
        childNode.addChild = new Node('def', 'def');
        rootNode.addChild = childNode;

      });

      afterEach((): void => {
        isCallToExternsStub.restore();
        isCallbackFromExterns.restore();
        isValidExternsCallStub.restore();
        // isCallToGetterOrSetterStub.restore();
        isNewPromiseStub.restore();

        rootNode = undefined;
        childNode = undefined;

      });

      it('should recursively check all nodes until it finds an invalid node', (): void => {

        AnalyzeCallTrees.analyze(rootNode);

        sinon.assert.callCount(isCallbackFromExterns, 2);
        sinon.assert.callCount(isCallbackFromExterns, 2);
        sinon.assert.callCount(isNewPromiseStub, 2);

        sinon.assert.calledWithExactly(isNewPromiseStub.firstCall, rootNode.children[0]);
        sinon.assert.calledWithExactly(isNewPromiseStub.secondCall, rootNode.children[0].children[0]);

      });

      it('should remove the branch from rootNode if it contains an invalid callback from externs', (): void => {

        rootNode.children[0].addChild = new Node('xyz', 'xyz');
        isCallbackFromExterns.onSecondCall().returns(true);
        isValidExternsCallStub.onSecondCall().returns(false);

        AnalyzeCallTrees.analyze(rootNode);

        sinon.assert.callCount(isCallbackFromExterns, 2);
        expect(rootNode.children.length).to.equal(0);

      });

      /* it('should remove the branch from rootNode if it contains a call to getter or setter', (): void => {

        rootNode.children[0].addChild = new Node('xyz', 'xyz');
        isCallToExternsStub.onSecondCall().returns(false);
        isCallToGetterOrSetterStub.onSecondCall().returns(true);

        AnalyzeCallTrees.analyze(rootNode);

        sinon.assert.callCount(isCallToExternsStub, 2);
        expect(rootNode.children.length).to.equal(0);

      }); */

      it('should remove the children of current node if it contains a call to new Promise', (): void => {

        isNewPromiseStub.returns(true);

        AnalyzeCallTrees.analyze(rootNode);

        expect(rootNode.children[0].children.length).to.equal(0);

      });

    });

    describe('[private] _isNewPromise()', (): void => {

      it('should return true if node.source contains a call to new promise', (): void => {

        const result: boolean = AnalyzeCallTrees['_isNewPromise'](new Node(ExternsCallDefinitions.NEW_PROMISE, ''));

        expect(result).to.equal(true);

      });

      it('should return false if node.source is not a call to new promise', (): void => {

        const result: boolean = AnalyzeCallTrees['_isNewPromise'](new Node('', ''));

        expect(result).to.equal(false);

      });

    });

    describe('[private] _isCallToExterns()', (): void => {

      let getFileListStub: sinon.SinonStub;

      beforeEach((): void => {
        getFileListStub = sinon.stub(Store, 'getFileList').returns(['file']);
      });

      afterEach((): void => {
        getFileListStub.restore();
      });

      it('should return false if node.target is a file present in the file list', (): void => {

        const result: boolean = AnalyzeCallTrees['_isCallToExterns'](new Node('', 'file:<1,1>--<1,1>'));

        expect(result).to.equal(false);

      });

      it('should return true if node.target is not present in the file list', (): void => {

        const result: boolean = AnalyzeCallTrees['_isCallToExterns'](new Node('', 'file2:<1,1>--<1,1>'));

        expect(result).to.equal(true);

      });

    });

    describe('[private] _isCallbackFromExterns()', (): void => {

      let getFileListStub: sinon.SinonStub;

      beforeEach((): void => {
        getFileListStub = sinon.stub(Store, 'getFileList').returns(['file']);
      });

      afterEach((): void => {
        getFileListStub.restore();
      });

      it('should return false if node.source is a file present in the file list', (): void => {

        const result: boolean = AnalyzeCallTrees['_isCallbackFromExterns'](new Node('file:<1,1>--<1,1>', ''));

        expect(result).to.equal(false);

      });

      it('should return true if node.source is not present in the file list', (): void => {

        const result: boolean = AnalyzeCallTrees['_isCallbackFromExterns'](new Node('file2:<1,1>--<1,1>', ''));

        expect(result).to.equal(true);

      });

    });

    describe('[private] _isValidExternsCall()', (): void => {

      function testValidExternsCall(externsCall: string): void {

        it(`should return true if node.source is "${externsCall}"`, (): void => {

          const result: boolean = AnalyzeCallTrees['_isValidExternsCall'](new Node(externsCall, ''));

          expect(result).to.equal(true);

        });

      }

      ExternsCallDefinitions.validExternsCalls.forEach((externsCall:  string): void => {
        testValidExternsCall(externsCall);
      });

      it('should return false if node.source is any other value', (): void => {

        const result: boolean = AnalyzeCallTrees['_isValidExternsCall'](new Node('file2:<1,1>--<1,1>', ''));

        expect(result).to.equal(false);

      });

    });

    /* describe('[private] _isCallToGetterOrSetter()', (): void => {

      let getASTNodeStub: sinon.SinonStub;

      beforeEach((): void => {
        getASTNodeStub = sinon.stub(Store, 'getASTNode');
      });

      afterEach((): void => {
        getASTNodeStub.restore();
      });

      it('should return true if cached ast node for node.target is node of kind "get"', (): void => {

        getASTNodeStub.returns(new ASTNode({key: {kind: 'get'}}, 'key', 'file', null, null));
        const result: boolean = AnalyzeCallTrees['_isCallToGetterOrSetter'](new Node('', ''));

        expect(result).to.equal(true);

      });

      it('should return true if cached ast node for node.target is node of kind "set"', (): void => {

        getASTNodeStub.returns(new ASTNode({key: {kind: 'set'}}, 'key', 'file', null, null));
        const result: boolean = AnalyzeCallTrees['_isCallToGetterOrSetter'](new Node('', ''));

        expect(result).to.equal(true);

      });

      it('should return false if cached ast node for node.target is node of any other kind', (): void => {

        getASTNodeStub.returns(new ASTNode({key: {kind: 'const'}}, 'key', 'file', null, null));
        const result: boolean = AnalyzeCallTrees['_isCallToGetterOrSetter'](new Node('', ''));

        expect(result).to.equal(false);

      });

    }); */

  });
});
