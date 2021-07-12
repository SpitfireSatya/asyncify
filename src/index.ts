
import { FileOps } from './plugins/file-ops/file-ops';
import { ICallgraphEdge } from './interfaces/callgraph-edge.interface';
import { CallGraphTransformations } from './plugins/callgraph-transformations';
import { ASTTransformations } from './plugins/ast-transformations';
import { Node } from './models/node.model';
import { Store } from './plugins/store/store';
import { BabelGenerator } from './plugins/parsers-and-generators/babel-generator';
import * as babelTypes from '@babel/types';
import { ITransformationDetail } from './interfaces/transformation-detail.interface';
import { ExtractCallTrees } from './plugins/callgraph-transformations/extract-call-trees';
import { SuggestionUtils } from './utils/suggestion-utils';
import { Events } from './plugins/events/events';

export default class Asyncify {

  public static showTransformationsAndTransform = async (pathToCallgraphCSV: string): Promise<{[key: string]: Array<ITransformationDetail>}> => {
    const callgraph: Array<ICallgraphEdge> = await FileOps.readCSVFile(pathToCallgraphCSV, true);
    const callTree: Node = await CallGraphTransformations.transform(callgraph);
    Store.setData('callTree', callTree);
    const transformations: { statistics: any, suggestions: { [key: string]: Array<ITransformationDetail>} }
      = ASTTransformations.showTransformations(callTree);
    await SuggestionUtils.generateHtmlReport(transformations);
    await FileOps.writeFile('listOfTransformations.txt', JSON.stringify(transformations, null, 2));
    
    await Asyncify.rebuildASTCache(pathToCallgraphCSV);

    const numberOfFuncsTransformed: number = ASTTransformations.transform(Store.getData('callTree'));
    await Asyncify.writeTransformedFiles();
    console.log('Sync functions transformed: ', callTree.children.length);
    console.log('Related functions transformed: ', numberOfFuncsTransformed - callTree.children.length);
    return;
  }

  public static showTransformations = async (pathToCallgraphCSV: string): Promise<{[key: string]: Array<ITransformationDetail>}> => {
    const callgraph: Array<ICallgraphEdge> = await FileOps.readCSVFile(pathToCallgraphCSV, true);
    const callTree: Node = await CallGraphTransformations.transform(callgraph);
    Store.setData('callTree', callTree);
    const transformations: { statistics: any, suggestions: { [key: string]: Array<ITransformationDetail>} }
      = ASTTransformations.showTransformations(callTree);
    await SuggestionUtils.generateHtmlReport(transformations);
    await FileOps.writeFile('listOfTransformations.txt', JSON.stringify(transformations, null, 2));
    return;
  }

  public static transform = async (pathToCallgraphCSV: string, nodesToTransform?: Array<string>): Promise<any> => {
    const start: number = new Date().getTime();
    const callgraph: Array<ICallgraphEdge> = await FileOps.readCSVFile(pathToCallgraphCSV, true);
    const callTree: Node = await CallGraphTransformations.transform(callgraph);
    Store.setData('callTree', callTree);
    if(nodesToTransform) {
      callTree.childKeys
        .filter((key: string): boolean => !nodesToTransform.includes(key))
        .forEach((key: string): void => {
          callTree.removeChild(parseInt(key, 10));
        });
    }
    const numberOfFuncsTransformed: number = ASTTransformations.transform(callTree);
    await Asyncify.writeTransformedFiles();
    const end: number = new Date().getTime();
    const timeTaken: number = end - start;
    const syncIdentified = Store.getData('syncIdentified');
    const syncTransformed = callTree.children.length
    const relatedTransformed = numberOfFuncsTransformed - callTree.children.length
    console.log('Sync functions transformed: ', syncTransformed);
    console.log('Related functions transformed: ', relatedTransformed);
    return { syncIdentified, syncTransformed, relatedTransformed, timeTaken };
  }

  public static resetData(): void {
  
    Store.reset();
    ExtractCallTrees.resetData();
    Events.reset();
  
  }

  private static rebuildASTCache = async (pathToCallgraphCSV: string) => {

    Store.reset();

    ExtractCallTrees.resetData();

    const callgraph: Array<ICallgraphEdge> = await FileOps.readCSVFile(pathToCallgraphCSV, true);
    const callTree: Node = await CallGraphTransformations.transform(callgraph);
    Store.setData('callTree', callTree);

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
