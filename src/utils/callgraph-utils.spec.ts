
import { CallgraphUtils } from './callgraph-utils';
import { expect } from 'chai';

describe('utils', (): void => {
  describe('CallgraphUtils', (): void => {

    const callGraphNode: string = 'Fun(filename:<1,1>--<5,1>)';

    describe('getFileName()', (): void => {

      it('should return the file name from callgraph node', (): void => {

        const result: string = CallgraphUtils.getFileName(callGraphNode);
        expect(result).to.equal('filename');

      });

    });

    describe('getFunctionStart()', (): void => {

      it('should return the start line and col in decimals from callgraph node', (): void => {

        const result: number = CallgraphUtils.getFunctionStart(callGraphNode);
        expect(result).to.equal(1.1);

      });

    });

    describe('getFunctionEnd()', (): void => {

      it('should return the end line and col in decimals from callgraph node', (): void => {

        const result: number = CallgraphUtils.getFunctionEnd(callGraphNode);
        expect(result).to.equal(5.1);

      });

    });


  });
});
