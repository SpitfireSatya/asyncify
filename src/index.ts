
import { FileOps } from './plugins/file-ops/file-ops';
import { ICallgraphEdge } from './interfaces/callgraph-edge.interface';
import { CallGraphTransformations } from './plugins/callgraph-transformations';
import { ASTTransformations } from './plugins/ast-transformations';
import { Node } from './models/node.model';
import { Store } from './plugins/store/store';
import { BabelGenerator } from './plugins/parsers-and-generators/babel-generator';
import * as babelTypes from '@babel/types';
import { BabelParser } from './plugins/parsers-and-generators/babel-parser';
import { ASTUtils } from './utils/ast-utils';

export default class Asyncify {

  public static showTransformations = async (pathToCallgraphCSV: string): Promise<void> => {
    const callgraph: Array<ICallgraphEdge> = await FileOps.readCSVFile(pathToCallgraphCSV, true);
    const callTree: Node = await CallGraphTransformations.transform(callgraph);
    Store.setData('callTree', callTree);
    await FileOps.writeFile('listOfTransformations.txt', JSON.stringify(ASTTransformations.showTransformations(callTree), null, 2));
  }

  public static transform = async (nodesToTransform: Array<string> = []): Promise<void> => {
    Asyncify.rebuildASTCache();
    const callTree: Node = <Node>Store.getData('callTree');
    callTree.childKeys
      .filter((key: string): boolean => !nodesToTransform.includes(key))
      .forEach((key: string): void => {
        callTree.removeChild(parseInt(key, 10));
      });
    ASTTransformations.transform(callTree);
    await Asyncify.writeTransformedFiles();
  }

  private static rebuildASTCache(): void {

    Store.removeAllFilesToWrite();
    Store.removeAllASTNodeCopies();
    Store.removeAllASTNodes();
    Store.removeAllASTs();

    Store.getFileList().forEach((fileName: string): void => {

      const contents: string = Store.getFileContents(fileName);
      const ast: babelTypes.File = BabelParser.generateAST(contents, {}, fileName);
      Store.setAST(fileName, ast);

      ASTUtils.cacheASTNodes(ast, fileName, false);

    });

  }

  private static writeTransformedFiles = (): Promise<void> => {

    const promises: Array<Promise<any>> = [];
    Store.getFilesToWrite().forEach((fileName: string): void => {
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

module.exports = Asyncify;
