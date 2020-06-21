
import * as sinon from 'sinon';
import { Node } from '../../models/node.model';
import { ICallgraphEdge } from '../../interfaces/callgraph-edge.interface';
import { ExtractCallTrees } from './extract-call-trees';
import { AnalyzeCallTrees } from './analyze-call-trees';
import { CallGraphTransformations } from '.';
import { expect } from 'chai';

describe('plugins > callgraph-transformations', (): void => {
  describe('CallGraphTransformations', (): void => {

    describe('transform()', (): void => {

      let extractCallTreesStub: sinon.SinonStub, analyzeCallTreesStub: sinon.SinonStub;
      let printCallTreesStub: sinon.SinonStub;

      beforeEach((): void => {
        extractCallTreesStub = sinon.stub(ExtractCallTrees, 'extract')
          .returns(Promise.resolve(new Node('abc', null)));
        analyzeCallTreesStub = sinon.stub(AnalyzeCallTrees, 'analyze')
          .returns(new Node(null, 'abc'));
        printCallTreesStub = sinon.stub(<any>CallGraphTransformations, 'printCallTrees');  
      });

      afterEach((): void => {
        extractCallTreesStub.restore();
        analyzeCallTreesStub.restore();
        printCallTreesStub.restore();
      });

      it('should invoke ExtractCallTrees.extract() with the callgraph', async (): Promise<void> => {

        await CallGraphTransformations.transform([{sourceNode: 'sourceNode', targetNode: 'targetNode'}]);

        sinon.assert.calledWithExactly(extractCallTreesStub, [{sourceNode: 'sourceNode', targetNode: 'targetNode'}]);

      });

      it('should invoke AnalyzeCallTrees.analyze() with node returned by ExtractCallTrees', async (): Promise<void> => {

        await CallGraphTransformations.transform([{sourceNode: 'sourceNode', targetNode: 'targetNode'}]);

        sinon.assert.calledWithExactly(analyzeCallTreesStub, new Node('abc', null));

      });

      it('should return the node returned by AnalyzeCallTrees', async (): Promise<void> => {

        const result: Node = await CallGraphTransformations.transform([{sourceNode: 'sourceNode', targetNode: 'targetNode'}]);

        expect(result).to.eql(new Node(null, 'abc'));

      });

    });

  });
});
