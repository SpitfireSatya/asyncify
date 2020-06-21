
import * as fs from 'fs';
import * as sinon from 'sinon';
import { FileOps } from './file-ops';
import { expect } from 'chai';
import * as path from 'path';
import { ICallgraphEdge } from '../../interfaces/callgraph-edge.interface';

describe('plugins > file-ops', (): void => {
  describe('FileOps', (): void => {

    describe('readFile()', (): void => {

      let existsSyncStub: sinon.SinonStub, readFileStub: sinon.SinonStub;

      beforeEach((): void => {
        existsSyncStub = sinon.stub(fs, 'existsSync');
        readFileStub = sinon.stub(fs.promises, 'readFile').returns(Promise.resolve(''));
      });

      afterEach((): void => {
        existsSyncStub.restore();
        readFileStub.restore();
      });

      it('should return the contents of the file if it exists', (): void => {

        existsSyncStub.returns(true);

        FileOps.readFile('/file')
          .then((result: string): void => {
            expect(result).to.equal('');
          });

      });

      it('should reject the promise if file does not exist', (): void => {

        existsSyncStub.returns(false);

        FileOps.readFile('/file')
          .catch((error: Error): void => {
            expect(error.message).to.equal('File not found');
          });

      });

    });

    // TODO: Figure out how to mock this.
    describe('readCSVFile()', (): void => {

      it('should parse the input csv and return the result without line no. correction', async (): Promise<void> => {

        await FileOps.readCSVFile(path.resolve(__dirname, './mock.csv'))
          .then((data: Array<ICallgraphEdge>): void => {
            expect(data).to.eql([{sourceNode: 'Callee(sourceNode:<1,1>--<2,1>)', targetNode: 'Fun(targetNode:<1,1>--<2,1>)'}]);
          });

      });

      it('should parse the input csv, correct line numbers and return the result if flag is true', async (): Promise<void> => {

        await FileOps.readCSVFile(path.resolve(__dirname, './mock.csv'), true)
          .then((data: Array<ICallgraphEdge>): void => {
            expect(data).to.eql([{sourceNode: 'Callee(sourceNode:<1,0>--<2,1>)', targetNode: 'Fun(targetNode:<1,0>--<2,1>)'}]);
          });

      });

      it('should reject the promise if file does not exist', async (): Promise<void> => {

        await FileOps.readCSVFile('/file')
          .catch((error: Error): void => {
            expect(error.message).to.equal('File not found');
          });

      });

      it('should reject the promise if csv is invalid', async (): Promise<void> => {

        await FileOps.readCSVFile(path.resolve(__dirname, './mock-invalid.csv'))
          .then((): void => {
            expect(false).to.equal(true);
          })
          .catch((error: Error): void => {
            expect(true).to.equal(true);
          });

      });

    });

    describe('writeFile', async (): Promise<void> => {

      let writeFileStub: sinon.SinonStub;

      beforeEach((): void => {
        writeFileStub = sinon.stub(fs.promises, 'writeFile').returns(Promise.resolve());
      });

      afterEach((): void => {
        writeFileStub.restore();
      });

      it('should invoke writeFile() with file path and data and return the result', async (): Promise<void> => {

        FileOps.writeFile('path', 'data')
        .then((): void => {
          sinon.assert.calledOnceWithExactly(writeFileStub, 'path', 'data', 'utf8');
        });

      });

    });

    describe('[private] correctLineNo()', (): void => {

      it('should reduce the col no. of starting line by 1 for Callee', (): void => {

        const result: string = FileOps['correctLineNo']('Callee(sourceNode:<1,1>--<2,1>)');
        expect(result).to.equal('Callee(sourceNode:<1,0>--<2,1>)');

      });

      it('should reduce the col no. of starting line by 1 for Fun', (): void => {

        const result: string = FileOps['correctLineNo']('Fun(sourceNode:<1,1>--<2,1>)');
        expect(result).to.equal('Fun(sourceNode:<1,0>--<2,1>)');

      });

    });

  });
});
