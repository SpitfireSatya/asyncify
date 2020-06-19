
import { Store } from './store';
import { expect } from 'chai';
import { ASTNode } from '../../models/AST-node.model';
import { IASTNode } from '../../interfaces/AST-node.interface';

describe('plugins > store', (): void => {
  describe('Store', (): void => {

    describe('addFile()', (): void => {

      beforeEach((): void => {
        Store['_fileList'] = [];
      });

      afterEach((): void => {
        Store['_fileList'] = [];
      });

      it('should add a file to file list if it does not exist', (): void => {

        Store.addFile('file1');
        expect(Store['_fileList'][0]).to.equal('file1');

      });

      it('should add a file to file list if it does not exist and force is true', (): void => {

        Store.addFile('file1', true);
        expect(Store['_fileList'][0]).to.equal('file1');

      });

      it('should add files to file list if none of them exist', (): void => {

        Store.addFile(['file1', 'file2']);
        expect(Store['_fileList'][0]).to.equal('file1');
        expect(Store['_fileList'][1]).to.equal('file2');

      });

      it('should add files to file list if none of them exist and force is true', (): void => {

        Store.addFile(['file1', 'file2'], true);
        expect(Store['_fileList'][0]).to.equal('file1');
        expect(Store['_fileList'][1]).to.equal('file2');

      });

      it('should add a file to file list again if force is true', (): void => {

        Store.addFile('file1');
        Store.addFile('file1', true);
        expect(Store['_fileList'][0]).to.equal('file1');
        expect(Store['_fileList'][1]).to.equal('file1');

      });

      it('should add files to file list again if force is true', (): void => {

        Store.addFile(['file1', 'file2']);
        Store.addFile(['file1', 'file2'], true);
        expect(Store['_fileList'][0]).to.equal('file1');
        expect(Store['_fileList'][1]).to.equal('file2');
        expect(Store['_fileList'][2]).to.equal('file1');
        expect(Store['_fileList'][3]).to.equal('file2');

      });

      it('should throw an error if the file already exists', (): void => {

        Store.addFile('file1');
        expect((): any => Store.addFile('file1')).to.throw(`File "file1" already exists!`);

      });

      it('should throw an error if any of the files already exists', (): void => {

        Store.addFile(['file1', 'file2']);
        expect((): any => Store.addFile(['file1'])).to.throw(`Files from array already exist!`);

      });

    });

    describe('removeFile()', (): void => {

      beforeEach((): void => {
        Store['_fileList'] = ['file1', 'file2'];
      });

      afterEach((): void => {
        Store['_fileList'] = [];
      });

      it('should remove a file from fileList', (): void => {

        Store.removeFile('file1');
        expect(Store['_fileList']).to.eql(['file2']);

      });

      it('should remove a file from fileList when force is true', (): void => {

        Store.removeFile('file1');
        expect(Store['_fileList']).to.eql(['file2']);

      });

      it('should do nothing if force is true and file doesnt exist', (): void => {

        Store.removeFile('file3', true);
        expect(Store['_fileList']).to.eql(['file1', 'file2']);

      });

      it('should throw an error if file does not exist', (): void => {

        expect((): any => Store.removeFile('file3')).to.throw(`File "file3" does not exist!`);

      });

    });

    describe('getFileList()', (): void => {

      beforeEach((): void => {
        Store['_fileList'] = ['file1', 'file2'];
      });

      afterEach((): void => {
        Store['_fileList'] = [];
      });

      it('should return a copy of the fileList', (): void => {

        const result: Array<string> = Store.getFileList();
        expect(result).to.eql(['file1', 'file2']);

      });

    });

    describe('setConfig()', (): void => {

      beforeEach((): void => {
        Store['_config'] = {};
      });

      afterEach((): void => {
        Store['_config'] = {};
      });

      it('should set the given value to given key', (): void => {

        Store.setConfig('key', 'value');
        expect(Store['_config'].key).to.equal('value');

      });

      it('should set the given value to given key when force is true', (): void => {

        Store.setConfig('key', 'value', true);
        expect(Store['_config'].key).to.equal('value');

      });

      it('should overwrite the given value to given key when force is true', (): void => {

        Store.setConfig('key', 'value');
        Store.setConfig('key', 'value2', true);
        expect(Store['_config'].key).to.equal('value2');

      });

      it('should throw an error if overwriting value with force as false', (): void => {

        Store.setConfig('key', 'value');
        expect((): void => Store.setConfig('key', 'value2')).to.throw(`Config already exists for "key"!`);

      });

    });

    describe('getConfig()', (): void => {

      beforeEach((): void => {
        Store['_config'] = { key: 'value' };
      });

      afterEach((): void => {
        Store['_config'] = {};
      });

      it('should get the value for given key', (): void => {

        expect(Store.getConfig('key')).to.equal('value');

      });

      it('should throw an error if key does not exist', (): void => {

        expect((): any => Store.getConfig('key2')).to.throw(`Config does not exist for "key2"!`);

      });

    });

    describe('setASTNode()', (): void => {

      const astNode: IASTNode = new ASTNode(null, '1', '1', null, null);
      const astNode2: IASTNode = new ASTNode(null, '2', '2', null, null);

      beforeEach((): void => {
        Store['_ASTNodes'] = {};
      });

      afterEach((): void => {
        Store['_ASTNodes'] = {};
      });

      it('should set the given value to given key', (): void => {

        Store.setASTNode('key', astNode);
        expect(Store['_ASTNodes'].key).to.equal(astNode);

      });

      it('should set the given value to given key when force is true', (): void => {

        Store.setASTNode('key', astNode, true);
        expect(Store['_ASTNodes'].key).to.equal(astNode);

      });

      it('should overwrite the given value to given key when force is true', (): void => {

        Store.setASTNode('key', astNode);
        Store.setASTNode('key', astNode2, true);
        expect(Store['_ASTNodes'].key).to.equal(astNode2);

      });

      it('should throw an error if overwriting value with force as false', (): void => {

        Store.setASTNode('key', astNode);
        expect((): void => Store.setASTNode('key', astNode2)).to.throw(`Data already exists for "key"!`);

      });

    });

    describe('getASTNode()', (): void => {

      const astNode: IASTNode = new ASTNode(null, '1', '1', null, null);

      beforeEach((): void => {
        Store['_ASTNodes'] = { key: astNode };
      });

      afterEach((): void => {
        Store['_ASTNodes'] = {};
      });

      it('should get the value for given key', (): void => {

        expect(Store.getASTNode('key')).to.equal(astNode);

      });

      it('should throw an error if key does not exist', (): void => {

        expect((): any => Store.getASTNode('key2')).to.throw(`Data does not exist for "key2"!`);

      });

    });

    describe('setFileContents()', (): void => {

      beforeEach((): void => {
        Store['_fileList'] = ['key'];
        Store['_files'] = {};
      });

      afterEach((): void => {
        Store['_fileList'] = [];
        Store['_files'] = {};
      });

      it('should set the given value to given key', (): void => {

        Store.setFileContents('key', 'value');
        expect(Store['_files'].key).to.equal('value');

      });

      it('should set the given value to given key when force is true', (): void => {

        Store.setFileContents('key', 'value', true);
        expect(Store['_files'].key).to.equal('value');

      });

      it('should set the given value to given key when force is true', (): void => {

        Store.setFileContents('key2', 'value', true);
        expect(Store['_files'].key2).to.equal('value');

      });

      it('should overwrite the given value to given key when force is true', (): void => {

        Store.setFileContents('key', 'value');
        Store.setFileContents('key', 'value2', true);
        expect(Store['_files'].key).to.equal('value2');

      });

      it('should throw an error if overwriting value with force as false', (): void => {

        Store.setFileContents('key', 'value');
        expect((): void => Store.setFileContents('key', 'value2')).to.throw(`Contents for File "key" already exist!`);

      });

      it('should throw an error if file doesnt exist in file list', (): void => {

        expect((): void => Store.setFileContents('key2', 'value2')).to.throw(`No Such file "key2" exists in fileList!`);

      });

    });

    describe('getFileContents()', (): void => {

      beforeEach((): void => {
        Store['_files'] = { key: 'value' };
      });

      afterEach((): void => {
        Store['_files'] = {};
      });

      it('should get the value for given key', (): void => {

        expect(Store.getFileContents('key')).to.equal('value');

      });

      it('should throw an error if key does not exist', (): void => {

        expect((): any => Store.getFileContents('key2')).to.throw(`Contents do not exist for file "key2"!`);

      });

    });

    describe('setAST()', (): void => {

      const ast: any = {};

      beforeEach((): void => {
        Store['_fileList'] = ['key'];
        Store['_ASTs'] = {};
      });

      afterEach((): void => {
        Store['_fileList'] = [];
        Store['_ASTs'] = {};
      });

      it('should set the given value to given key', (): void => {

        Store.setAST('key', ast);
        expect(Store['_ASTs'].key).to.equal(ast);

      });

      it('should set the given value to given key when force is true', (): void => {

        Store.setAST('key', ast, true);
        expect(Store['_ASTs'].key).to.equal(ast);

      });

      it('should set the given value to given key when force is true', (): void => {

        Store.setAST('key2', ast, true);
        expect(Store['_ASTs'].key2).to.equal(ast);

      });

      it('should overwrite the given value to given key when force is true', (): void => {

        Store.setAST('key', ast);
        Store.setAST('key', ast, true);
        expect(Store['_ASTs'].key).to.equal(ast);

      });

      it('should throw an error if overwriting value with force as false', (): void => {

        Store.setAST('key', ast);
        expect((): void => Store.setAST('key', ast)).to.throw(`AST for File "key" already exist!`);

      });

      it('should throw an error if file doesnt exist in file list', (): void => {

        expect((): void => Store.setAST('key2', ast)).to.throw(`No Such file "key2" exists in fileList!`);

      });

    });

    describe('getAST()', (): void => {

      const ast: any = {};

      beforeEach((): void => {
        Store['_ASTs'] = { key: ast };
      });

      afterEach((): void => {
        Store['_ASTs'] = {};
      });

      it('should get the value for given key', (): void => {

        expect(Store.getAST('key')).to.equal(ast);

      });

      it('should throw an error if key does not exist', (): void => {

        expect((): any => Store.getAST('key2')).to.throw(`AST for file "key2" does not exist!`);

      });

    });

  });

}); // tslint:disable-line: max-file-line-count
