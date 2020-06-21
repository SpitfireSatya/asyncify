
import { expect } from 'chai';
import { Asyncify } from './index';
import * as sinon from 'sinon';
import { BabelGenerator } from './plugins/parsers-and-generators/babel-generator';
import { FileOps } from './plugins/file-ops/file-ops';
import { Store } from './plugins/store/store';
import { CallGraphTransformations } from './plugins/callgraph-transformations';
import { Node } from './models/node.model';
import { ASTTransformations } from './plugins/ast-transformations';

describe('Asyncify', (): void => {

  describe('initialize()', (): void => {

    let readCSVFileStub: sinon.SinonStub, cgTransformStub: sinon.SinonStub, astTransformStub: sinon.SinonStub;
    let writeTransformedFilesStub: sinon.SinonStub;
    const mockNode: Node = new Node(null, null);

    beforeEach((): void => {
      readCSVFileStub = sinon.stub(FileOps, 'readCSVFile').returns(Promise.resolve([{sourceNode: '', targetNode: ''}]));
      cgTransformStub = sinon.stub(CallGraphTransformations, 'transform').returns(Promise.resolve(mockNode));
      astTransformStub = sinon.stub(ASTTransformations, 'transform');
      writeTransformedFilesStub = sinon.stub(<any>Asyncify, 'writeTransformedFiles').returns(Promise.resolve);
    });

    afterEach((): void => {
      readCSVFileStub.restore();
      cgTransformStub.restore();
      astTransformStub.restore();
      writeTransformedFilesStub.restore();
    });


    it('should invoke FileOps.readCSVFile with file path', async (): Promise<void> => {

      await Asyncify.initialize('filePath');
      sinon.assert.calledWithExactly(readCSVFileStub, 'filePath', true);

    });

    it('should invoke CallGraphTransformations.transform with callgraph from csv', async (): Promise<void> => {

      await Asyncify.initialize('filePath');
      sinon.assert.calledWithExactly(cgTransformStub, [{sourceNode: '', targetNode: ''}]);

    });

    it('should invoke ASTTransformations.transform with node returned by cgTransform', async (): Promise<void> => {

      await Asyncify.initialize('filePath');
      sinon.assert.calledWithExactly(astTransformStub, mockNode);

    });

    it('should invoke Asyncify.writeTransformedFiles()', async (): Promise<void> => {

      await Asyncify.initialize('filePath');
      sinon.assert.calledWithExactly(writeTransformedFilesStub);

    });

  });


  describe('[private] writeTransformedFiles()', (): void => {

    let generateCodeAndWriteStub: sinon.SinonStub, getFileListStub: sinon.SinonStub;

    beforeEach((): void => {
      getFileListStub = sinon.stub(Store, 'getFileList').returns(['file1', 'file2']);
      generateCodeAndWriteStub = sinon.stub(<any>Asyncify, 'generateCodeAndWrite');
    });

    afterEach((): void => {
      getFileListStub.restore();
      generateCodeAndWriteStub.restore();
    });

    it('should invoke Store.getFileList()', async (): Promise<void> => {

      await Asyncify['writeTransformedFiles']();
      sinon.assert.calledOnce(getFileListStub);

    });

    it('should invoke generateCodeAndWrite() for each file in fileList', async (): Promise<void> => {

      await Asyncify['writeTransformedFiles']();
      sinon.assert.calledTwice(generateCodeAndWriteStub);
      sinon.assert.calledWithExactly(generateCodeAndWriteStub.firstCall, 'file1');
      sinon.assert.calledWithExactly(generateCodeAndWriteStub.secondCall, 'file2');

    });

    it('should return a promise', (): void => {

      expect(Asyncify['writeTransformedFiles']()).to.be.instanceOf(Promise);

    });

  });


  describe('[private] generateCodeAndWrite()', (): void => {

    let generateCodeStub: sinon.SinonStub, writeFileStub: sinon.SinonStub, getASTStub: sinon.SinonStub;

    beforeEach((): void => {
      getASTStub = sinon.stub(Store, 'getAST').returns({ myAST: { } });
      generateCodeStub = sinon.stub(BabelGenerator, 'generateCode').returns('generated code');
      writeFileStub = sinon.stub(FileOps, 'writeFile').returns(Promise.resolve(null));
    });

    afterEach((): void => {
      getASTStub.restore();
      generateCodeStub.restore();
      writeFileStub.restore();
    });

    it('should invoke Store.getAST() with given filename', async (): Promise<void> => {

      await Asyncify['generateCodeAndWrite']('filename');
      sinon.assert.calledWithExactly(getASTStub, 'filename');

    });

    it('should invoke BabelGenerator.generateCode() with ast returned by getAST and config', async (): Promise<void> => {

      await Asyncify['generateCodeAndWrite']('filename');
      sinon.assert.calledWithExactly(generateCodeStub, { myAST: { } }, { });

    });

    it('should invoke FileOps.writeFile() with filename and code generated by BabelGenerator', async (): Promise<void> => {

      await Asyncify['generateCodeAndWrite']('filename');
      sinon.assert.calledWithExactly(writeFileStub, 'filename', 'generated code');

    });

    it('should return a promise', (): void => {

      expect(Asyncify['generateCodeAndWrite']('filename')).to.be.instanceOf(Promise);

    });

  });

});