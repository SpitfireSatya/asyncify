
import { FileOps } from './plugins/file-ops/file-ops';
import { ICallgraphEdge } from './interfaces/callgraph-edge.interface';
import { CallGraphTransformations } from './plugins/callgraph-transformations';
import { ASTTransformations } from './plugins/ast-transformations';
import { Node } from './models/node.model';
import { Store } from './plugins/store/store';
import { BabelGenerator } from './plugins/parsers-and-generators/babel-generator';
import * as babelTypes from '@babel/types';
import * as path from 'path';

export class Asyncify {

  public static initialize = async (pathToCallgraphCSV: string): Promise<void> => {
    const callgraph: Array<ICallgraphEdge> = await FileOps.readCSVFile(pathToCallgraphCSV, true);
    const callTree: Node = await CallGraphTransformations.transform(callgraph);
    ASTTransformations.transform(callTree);
    await Asyncify.writeTransformedFiles();
  }

  private static writeTransformedFiles = (): Promise<void> => {

    const promises: Array<Promise<any>> = [];
    Store.getFileList().forEach((fileName: string): void => {
      promises.push(Asyncify.generateCodeAndWrite(fileName));
    });
    return Promise.all(promises)
      .then((): void => { return; });
  }

  private static generateCodeAndWrite = (fileName: string): Promise<any> => {
    const modifiedAST: babelTypes.File = Store.getAST(fileName);
    const contents: string = BabelGenerator.generateCode(modifiedAST, {});
    return FileOps.writeFile(fileName, contents);
  }

}

// Asyncify.initialize(path.resolve('mock', 'test.csv'));
