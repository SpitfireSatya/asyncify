
import { IASTNode } from '../../interfaces/AST-node.interface';
import { DeepClone } from '../../utils/deep-clone';

export class Store {

  private static fileList: Array<string> = [];
  private static files: { [key: string]: string } = {};
  private static ASTs: { [key: string]: any } = {};
  private static config: { [key: string]: any } = {};
  private static ASTNodes: { [key: string]: IASTNode } = {};

  public static addFile(fileName: string, force: boolean = false): void {
    if (Array.isArray(fileName)) {
      if (!force && Store.fileList.filter((file: string): boolean => fileName.indexOf(file) === -1).length === 0) {
        throw new Error(`Files from array already exist!`);
      } else {
        Store.fileList.push(...DeepClone.clone(fileName));
      }
    } else {
      if (!force && Store.fileList.indexOf(fileName) !== -1) {
        throw new Error(`File "${fileName}" already exists!`);
      } else {
        Store.fileList.push(fileName);
      }
    }
  }

  public static removeFile(fileName: string, force: boolean = false): void {
    if (!force && Store.fileList.indexOf(fileName) === -1) {
      throw new Error(`File "${fileName}" does not exist!`);
    } else {
      Store.fileList.splice(Store.fileList.indexOf(fileName), 1);
    }
  }

  public static getFileList(): Array<string> {
    return DeepClone.clone(Store.fileList);
  }

  public static setConfig(key: string, value: any, force: boolean = false): void {
    if (!force && Store.config[key] !== undefined) {
      throw new Error(`Config already exists for "${key}"!`);
    } else {
      Store.config[key] = DeepClone.clone(value);
    }
  }

  public static getConfig(key: string): any {
    if (Store.config[key] === undefined) {
      throw new Error(`Config does not exist for "${key}"!`);
    }
    return Store.config[key];
  }

  public static setASTNode(key: string, value: IASTNode, force: boolean = false): void {
    if (!force && Store.ASTNodes[key] !== undefined) {
      throw new Error(`Data already exists for "${key}"!`);
    } else {
      Store.ASTNodes[key] = value;
    }
  }

  public static getASTNode(key: string): IASTNode {
    if (Store.ASTNodes[key] === undefined) {
      throw new Error(`Data does not exist for "${key}"!`);
    }
    return Store.ASTNodes[key];
  }

  public static setFileContents(fileName: string, fileContents: string, force: boolean = false): void {
    if (!force && Store.files[fileName]) {
      throw new Error(`Contents for File "${fileName}" already exist!`);
    } else if (!force && Store.fileList.indexOf(fileName) === -1) {
      throw new Error(`No Such file "${fileName}" exists in fileList!`);
    } else {
      Store.files[fileName] = DeepClone.clone(fileContents);
    }
  }

  public static getFileContents(fileName: string): string {
    if (!Store.files[fileName]) {
      throw new Error(`Contents do not exist for file "${fileName}"!`);
    } else {
      return DeepClone.clone(Store.files[fileName]);
    }
  }

  public static setAST(fileName: string, ast: any, force: boolean = false): void {
    if (!force && Store.ASTs[fileName]) {
      throw new Error(`AST for File "${fileName}" already exist!`);
    } else if (!force && Store.fileList.indexOf(fileName) === -1) {
      throw new Error(`No Such file "${fileName}" exists in fileList!`);
    } else {
      Store.ASTs[fileName] = ast;
    }
  }

  public static getAST(fileName: string): any {
    if (!Store.ASTs[fileName]) {
      throw new Error(`AST for file "${fileName}" does not exist!`);
    } else {
      return Store.ASTs[fileName];
    }
  }

}
