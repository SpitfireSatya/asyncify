
import { IASTNode } from '../../interfaces/AST-node.interface';
import { DeepClone } from '../../utils/deep-clone';
import * as babelTypes from '@babel/types';

export class Store {

  private static _fileList: Array<string> = [];
  private static _filesToWrite: Array<string> = [];
  private static _files: { [key: string]: string } = {};
  private static _ASTs: { [key: string]: any } = {};
  private static _config: { [key: string]: any } = {};
  private static _ASTNodes: { [key: string]: IASTNode } = {};
  private static _ASTNodeCopies: { [key: string]: IASTNode } = {};
  private static _data: { [key: string]: any } = { };

  public static addFile(fileName: string | Array<string>, force: boolean = false): void {
    if (Array.isArray(fileName)) {
      if (!force && Store._fileList.filter((file: string): boolean => fileName.indexOf(file) !== -1).length !== 0) {
        throw new Error(`Files from array already exist!`);
      } else {
        Store._fileList.push(...DeepClone.clone(fileName));
      }
    } else {
      if (!force && Store._fileList.indexOf(fileName) !== -1) {
        throw new Error(`File "${fileName}" already exists!`);
      } else {
        Store._fileList.push(fileName);
      }
    }
  }

  public static removeFile(fileName: string, force: boolean = false): void {
    const index: number = Store._fileList.indexOf(fileName);
    if (!force && index === -1) {
      throw new Error(`File "${fileName}" does not exist!`);
    } else if (index !== -1) {
      Store._fileList.splice(Store._fileList.indexOf(fileName), 1);
    }
  }

  public static getFileList(): Array<string> {
    return DeepClone.clone(Store._fileList);
  }

  public static setConfig(key: string, value: any, force: boolean = false): void {
    if (!force && Store._config[key] !== undefined) {
      throw new Error(`Config already exists for "${key}"!`);
    } else {
      Store._config[key] = DeepClone.clone(value);
    }
  }

  public static getConfig(key: string): any {
    if (Store._config[key] === undefined) {
      throw new Error(`Config does not exist for "${key}"!`);
    }
    return Store._config[key];
  }

  public static setASTNode(key: string, value: IASTNode, force: boolean = false): void {
    if (!force && Store._ASTNodes[key] !== undefined) {
      throw new Error(`Data already exists for "${key}"!`);
    } else {
      Store._ASTNodes[key] = value;
    }
  }

  public static getASTNode(key: string): IASTNode {
    if (Store._ASTNodes[key] === undefined) {
      throw new Error(`Data does not exist for "${key}"!`);
    }
    return Store._ASTNodes[key];
  }

  public static removeAllASTNodes(): void {
    Store._ASTNodes = {};
  }

  public static setASTNodeCopy(key: string, value: IASTNode, force: boolean = false): void {
    if (!force && Store._ASTNodeCopies[key] !== undefined) {
      throw new Error(`Data already exists for "${key}"!`);
    } else {
      Store._ASTNodeCopies[key] = value;
    }
  }

  public static getASTNodeCopy(key: string): IASTNode {
    if (Store._ASTNodeCopies[key] === undefined) {
      throw new Error(`Data does not exist for "${key}"!`);
    }
    return Store._ASTNodeCopies[key];
  }

  public static removeAllASTNodeCopies(): void {
    Store._ASTNodeCopies = {};
  }

  public static setFileContents(fileName: string, fileContents: string, force: boolean = false): void {
    if (!force && Store._files[fileName]) {
      throw new Error(`Contents for File "${fileName}" already exist!`);
    } else if (!force && Store._fileList.indexOf(fileName) === -1) {
      throw new Error(`No Such file "${fileName}" exists in fileList!`);
    } else {
      Store._files[fileName] = DeepClone.clone(fileContents);
    }
  }

  public static getFileContents(fileName: string): string {
    if (!Store._files[fileName]) {
      throw new Error(`Contents do not exist for file "${fileName}"!`);
    } else {
      return DeepClone.clone(Store._files[fileName]);
    }
  }

  public static setAST(fileName: string, ast: babelTypes.File, force: boolean = false): void {
    if (!force && Store._ASTs[fileName]) {
      throw new Error(`AST for File "${fileName}" already exist!`);
    } else if (!force && Store._fileList.indexOf(fileName) === -1) {
      throw new Error(`No Such file "${fileName}" exists in fileList!`);
    } else {
      Store._ASTs[fileName] = ast;
    }
  }

  public static getAST(fileName: string): any {
    if (!Store._ASTs[fileName]) {
      throw new Error(`AST for file "${fileName}" does not exist!`);
    } else {
      return Store._ASTs[fileName];
    }
  }

  public static removeAllASTs(): void {
    Store._ASTs = {};
  }

  public static setData(key: string, value: any, force: boolean = false): void {
    if (!force && Store._data[key] !== undefined) {
      throw new Error(`Data already exists for "${key}"!`);
    } else {
      Store._data[key] = value;
    }
  }

  public static getData(key: string): any {
    if (Store._data[key] === undefined) {
      throw new Error(`Data does not exist for "${key}"!`);
    }
    return Store._data[key];
  }

  public static addFileToWrite(fileName: string): void {
    if (!(Store._filesToWrite.indexOf(fileName) !== -1)) {
      Store._filesToWrite.push(fileName);
    }
  }

  public static removeAllFilesToWrite(): void {
    Store._filesToWrite = [];
  }

  public static getFilesToWrite(): Array<string> {
    return DeepClone.clone(Store._filesToWrite);
  }

}
