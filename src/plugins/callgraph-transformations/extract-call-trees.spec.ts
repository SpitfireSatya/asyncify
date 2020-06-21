
import * as sinon from 'sinon';
import { ExtractCallTrees } from './extract-call-trees';
import { Events } from '../events/events';
import { Node } from '../../models/node.model';
import { ICallgraphEdge } from '../../interfaces/callgraph-edge.interface';
import { expect } from 'chai';
import { ExternsFuncDefinitions } from '../../constants/externs-func-definitions';

describe('plugins > callgraph-transformations', (): void => {
  describe('ExtractCallTrees', (): void => {

    describe('extract()', (): void => {

      let extractSyncCallersStub: sinon.SinonStub, extractRelatedCallsStub: sinon.SinonStub;
      let registerStub: sinon.SinonStub, dispatchStub: sinon.SinonStub, readyCallbackStub: sinon.SinonStub;
      const rootNode: Node = new Node(null, null);
      const callGraph: Array<ICallgraphEdge> = [];

      beforeEach((): void => {
        extractSyncCallersStub = sinon.stub(<any>ExtractCallTrees, '_extractSyncFunctionCallers');
        extractRelatedCallsStub = sinon.stub(<any>ExtractCallTrees, '_extractRelatedCalls');
        readyCallbackStub = sinon.stub(<any>ExtractCallTrees, '_readyCallback');
        registerStub = sinon.stub(Events, 'register');
        dispatchStub = sinon.stub(Events, 'dispatch');
      });

      afterEach((): void => {
        extractSyncCallersStub.restore();
        extractRelatedCallsStub.restore();
        readyCallbackStub.restore();
        registerStub.restore();
        dispatchStub.restore();
      });

      it('should invoke _extractSyncFunctionCallers() with root node and callgraph', async (): Promise<void> => {

        ExtractCallTrees.extract(callGraph);

        sinon.assert.calledWithExactly(extractSyncCallersStub, rootNode, callGraph);

      });

      it('should invoke _extractRelatedCalls() with root node and callgraph', async (): Promise<void> => {

        ExtractCallTrees.extract(callGraph);

        sinon.assert.calledWithExactly(extractRelatedCallsStub, rootNode, callGraph);

      });

      it('should resgister the _readyCallback() for the event "ready"', async (): Promise<void> => {

        ExtractCallTrees.extract(callGraph);

        sinon.assert.calledWithExactly(registerStub, 'ready', ExtractCallTrees['_readyCallback']);

      });

      it('should dispatch the notify-when-ready event', async (): Promise<void> => {

        ExtractCallTrees.extract(callGraph);

        sinon.assert.calledWithExactly(dispatchStub, 'notify-when-ready', null);

      });

    });

    describe('[private] _readyCallback()', (): void => {

      it('should invoke resolve() with the root node', (): void => {

        const resolve: sinon.SinonStub = sinon.stub();
        const rootNode: Node = new Node(null, null);

        ExtractCallTrees['_readyCallback'](resolve, rootNode);

        sinon.assert.calledWithExactly(resolve, rootNode);

      });

    });

    describe('[private] _extractSyncFunctionCallers()', (): void => {

      let addNodeStub: sinon.SinonStub;
      let rootNode: Node, callgraph: Array<ICallgraphEdge>;

      beforeEach((): void => {
        addNodeStub = sinon.stub(<any>ExtractCallTrees, '_addNode');
        rootNode = new Node(null, null);
        callgraph = [];
      });

      afterEach((): void => {
        addNodeStub.restore();
        rootNode = undefined;
        callgraph = [];
      });

      it('should add a node to rootNode for calls to readFileSync', (): void => {

        callgraph = [
          {sourceNode: 'Callee(sync.js:<5,10>--<5,28>)', targetNode: 'Fun(/home/osboxes/codeql-home/codeql/javascript/tools/data/externs/nodejs/fs.js:<1155,18>--<1155,49>)'},
          {sourceNode: 'Callee(sync.js:<5,10>--<5,28>)', targetNode: 'Fun(/home/osboxes/codeql-home/codeql/javascript/tools/data/externs/nodejs/fs.js:<1162,19>--<1162,48>)'},
          {sourceNode: 'Callee(sync.js:<5,10>--<5,28>)', targetNode: 'Fun(/home/osboxes/codeql-home/codeql/javascript/tools/data/externs/nodejs/fs.js:<1169,19>--<1169,48>)'},
        ];

        ExtractCallTrees['_extractSyncFunctionCallers'](rootNode, callgraph);

        sinon.assert.calledWithExactly(addNodeStub,
          rootNode, new Node('Callee(sync.js:<5,10>--<5,28>)', ExternsFuncDefinitions.READ_FILE_SYNC));

      });

      it('should add a node to rootNode for calls to writeFileSync', (): void => {

        callgraph = [
          {sourceNode: 'Callee(sync.js:<5,10>--<5,28>)', targetNode: 'Fun(/home/osboxes/codeql-home/codeql/javascript/tools/data/externs/nodejs/fs.js:<1203,19>--<1203,55>)'},
          {sourceNode: 'Callee(sync.js:<5,10>--<5,28>)', targetNode: 'Fun(/home/osboxes/codeql-home/codeql/javascript/tools/data/externs/nodejs/fs.js:<1162,19>--<1162,48>)'},
          {sourceNode: 'Callee(sync.js:<5,10>--<5,28>)', targetNode: 'Fun(/home/osboxes/codeql-home/codeql/javascript/tools/data/externs/nodejs/fs.js:<1169,19>--<1169,48>)'},
        ];

        ExtractCallTrees['_extractSyncFunctionCallers'](rootNode, callgraph);

        sinon.assert.calledWithExactly(addNodeStub,
          rootNode, new Node('Callee(sync.js:<5,10>--<5,28>)', ExternsFuncDefinitions.WRITE_FILE_SYNC));

      });

    });

    describe('[private] _extractRelatedCalls()', (): void => {

      let addNodeStub: sinon.SinonStub, dispatchStub: sinon.SinonStub;
      let rootNode: Node, callgraph: Array<ICallgraphEdge>;

      beforeEach((): void => {
        addNodeStub = sinon.stub(<any>ExtractCallTrees, '_addNode').callThrough();
        dispatchStub = sinon.stub(Events, 'dispatch');
        rootNode = new Node(null, null);
        callgraph = [];
      });

      afterEach((): void => {
        addNodeStub.restore();
        dispatchStub.restore();
        rootNode = undefined;
        callgraph = [];
      });

      it('should recursively add related nodes to the root node', (): void => {

        rootNode.addChild = new Node('Callee(sync.js:<5,10>--<5,28>)', 'Fun(/home/osboxes/codeql-home/codeql/javascript/tools/data/externs/nodejs/fs.js:<1155,18>--<1155,49>)');
        callgraph = [
          { sourceNode: 'Callee(sync.js:<5,10>--<5,28>)', targetNode: 'Fun(/home/osboxes/codeql-home/codeql/javascript/tools/data/externs/nodejs/fs.js:<1155,18>--<1155,49>)' },
          { sourceNode: 'Callee(/codeql-home/codeql/es6.js:<424,79>--<424,88>)', targetNode: 'Fun(main.js:<10,14>--<12,1>)' },
          { sourceNode: 'Callee(/codeql-home/codeql/es3.js:<776,74>--<776,83>)', targetNode: 'Fun(main.js:<10,14>--<12,1>)' },
          { sourceNode: 'Callee(/codeql-home/codeql/es3.js:<776,74>--<776,83>)', targetNode: 'Fun(main.js:<6,14>--<8,1>)' },
          { sourceNode: 'Callee(/codeql-home/codeql/es3.js:<811,70>--<811,79>)', targetNode: 'Fun(main.js:<10,10>--<12,1>)' },
          { sourceNode: 'Callee(main.js:<10,1>--<12,2>)', targetNode: 'Fun(/codeql-home/codeql/es3.js:<776,27>--<776,86>)' },
          { sourceNode: 'Callee(main.js:<10,1>--<12,2>)', targetNode: 'Fun(/codeql-home/codeql/es6.js:<424,32>--<424,91>)' },
          { sourceNode: 'Callee(main.js:<6,1>--<8,2>)', targetNode: 'Fun(/codeql-home/codeql/es3.js:<776,27>--<776,86>)' },
          { sourceNode: 'Callee(main.js:<6,1>--<8,2>)', targetNode: 'Fun(/codeql-home/codeql/es3.js:<867,17>--<867,81>)' },
          { sourceNode: 'Callee(main.js:<7,3>--<7,22>)', targetNode: 'Fun(sync.js:<4,1>--<6,1>)' }
        ];

        ExtractCallTrees['_extractRelatedCalls'](rootNode, callgraph);

        sinon.assert.callCount(addNodeStub, 3);

        expect(rootNode.children[0].target).to.equal('Fun(/home/osboxes/codeql-home/codeql/javascript/tools/data/externs/nodejs/fs.js:<1155,18>--<1155,49>)');
        expect(rootNode.children[0].source).to.equal('Callee(sync.js:<5,10>--<5,28>)');

        expect(rootNode.children[0].children[0].target).to.equal('Fun(sync.js:<4,1>--<6,1>)');
        expect(rootNode.children[0].children[0].source).to.equal('Callee(main.js:<7,3>--<7,22>)');

        expect(rootNode.children[0].children[0].children[0].target).to.equal('Fun(main.js:<6,14>--<8,1>)');
        expect(rootNode.children[0].children[0].children[0].source).to.equal('Callee(/codeql-home/codeql/es3.js:<776,74>--<776,83>)');

        expect(rootNode.children[0].children[0].children[0].children[0].target).to.equal('Fun(/codeql-home/codeql/es3.js:<776,27>--<776,86>)');
        expect(rootNode.children[0].children[0].children[0].children[0].source).to.equal('Callee(main.js:<6,1>--<8,2>)');

      });

      it('should do nothing if there are no child nodes', (): void => {

        ExtractCallTrees['_extractRelatedCalls'](rootNode, []);

        sinon.assert.notCalled(addNodeStub);

      });

    });

    describe('[private] _addNode()', (): void => {

      let dispatchStub: sinon.SinonStub;
      let rootNode: Node;

      beforeEach((): void => {
        dispatchStub = sinon.stub(Events, 'dispatch');
        rootNode = new Node(null, null);
      });

      afterEach((): void => {
        dispatchStub.restore();
        rootNode = undefined;
      });

      it('should add the childNode to parentNode', (): void => {

        const childNode: Node = new Node('source', 'target');
        ExtractCallTrees['_addNode'](rootNode, childNode);

        expect(rootNode.children[0]).to.equal(childNode);

      });

      it('should dispatch the "fetch-file" event with fileName of childNode source', (): void => {

        const childNode: Node = new Node('Callee(source:<1,1>--<1,1>)', 'Fun(target:<1,1>--<1,1>)');
        ExtractCallTrees['_addNode'](rootNode, childNode);

        sinon.assert.calledWithExactly(dispatchStub, 'fetch-file', 'source');

      });

    });

    describe('[private] _getParent()', (): void => {

      it('should return a Fun node which starts before and ends after Callee', () => {

        const callgraph: Array<ICallgraphEdge> = [
          { sourceNode: 'Callee(sync.js:<5,10>--<5,28>)', targetNode: 'Fun(/home/osboxes/codeql-home/codeql/javascript/tools/data/externs/nodejs/fs.js:<1155,18>--<1155,49>)' },
          { sourceNode: 'Callee(/codeql-home/codeql/es6.js:<424,79>--<424,88>)', targetNode: 'Fun(main.js:<10,14>--<12,1>)' },
          { sourceNode: 'Callee(/codeql-home/codeql/es3.js:<776,74>--<776,83>)', targetNode: 'Fun(main.js:<10,14>--<12,1>)' },
          { sourceNode: 'Callee(/codeql-home/codeql/es3.js:<776,74>--<776,83>)', targetNode: 'Fun(main.js:<6,14>--<8,1>)' },
          { sourceNode: 'Callee(/codeql-home/codeql/es3.js:<811,70>--<811,79>)', targetNode: 'Fun(main.js:<10,10>--<12,1>)' },
          { sourceNode: 'Callee(main.js:<10,1>--<12,2>)', targetNode: 'Fun(/codeql-home/codeql/es3.js:<776,27>--<776,86>)' },
          { sourceNode: 'Callee(main.js:<10,1>--<12,2>)', targetNode: 'Fun(/codeql-home/codeql/es6.js:<424,32>--<424,91>)' },
          { sourceNode: 'Callee(main.js:<6,1>--<8,2>)', targetNode: 'Fun(/codeql-home/codeql/es3.js:<776,27>--<776,86>)' },
          { sourceNode: 'Callee(main.js:<6,1>--<8,2>)', targetNode: 'Fun(/codeql-home/codeql/es3.js:<867,17>--<867,81>)' },
          { sourceNode: 'Callee(main.js:<7,3>--<7,22>)', targetNode: 'Fun(sync.js:<4,1>--<6,1>)' }
        ];

        const result: string = ExtractCallTrees['_getParent']('Callee(sync.js:<5,10>--<5,28>)', callgraph);

        expect(result).to.equal('Fun(sync.js:<4,1>--<6,1>)');

      });

    });

  });
});
