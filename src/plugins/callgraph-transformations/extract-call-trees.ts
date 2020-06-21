
import { CallgraphUtils } from '../../utils/callgraph-utils';
import { Events } from '../events/events';
import { Node } from '../../models/node.model';
import { ICallgraphEdge } from '../../interfaces/callgraph-edge.interface';
import { ExternsFuncDefinitions } from '../../constants/externs-func-definitions';

export class ExtractCallTrees {

  private static _nativeCallers: Array<string> = [];

  public static extract = (callGraph: Array<ICallgraphEdge>): Promise<Node> => {
    return new Promise((resolve: any, reject: any): void => {
      const root: Node = new Node(null, null);
      ExtractCallTrees._extractSyncFunctionCallers(root, callGraph);
      ExtractCallTrees._extractRelatedCalls(root, callGraph);
      Events.register('ready', ExtractCallTrees._readyCallback);
      Events.dispatch('notify-when-ready', null);
    });
  }

  private static _readyCallback = (resolve: any, root: Node): void => {
    resolve(root);
  }

  private static _extractSyncFunctionCallers = (rootNode: Node, callGraph: Array<ICallgraphEdge>): void => {

    for (let i: number = 0; i < callGraph.length; i++) {
      if (ExternsFuncDefinitions.syncFunctions.indexOf(callGraph[i].targetNode) !== -1) {
        ExtractCallTrees._addNode(rootNode, new Node(callGraph[i].sourceNode, callGraph[i].targetNode));
      }
    }

  }

  private static _extractRelatedCalls = (callTreeNode: Node, callGraph: Array<ICallgraphEdge>): void => {

    if (callTreeNode.children.length > 0) {

      callTreeNode.children.forEach((childNode: Node): void => {

        const newTarget: string = ExtractCallTrees._getParent(childNode.source, callGraph);

        if (newTarget) {
          for (let i: number = 0; i < callGraph.length; i++) {
            if (callGraph[i].targetNode === newTarget && callGraph[i].sourceNode !== callTreeNode.source) {
              if (newTarget.indexOf('codeql-home') !== -1) {
                const index: number = ExtractCallTrees._nativeCallers
                  .indexOf(callGraph[i].sourceNode.slice(callGraph[i].sourceNode.indexOf('('), callGraph[i].sourceNode.indexOf(',')));
                if (index !== -1) {
                  ExtractCallTrees._addNode(childNode, new Node(callGraph[i].sourceNode, callGraph[i].targetNode));
                  ExtractCallTrees._nativeCallers.splice(index, 1);
                }
              } else {
                ExtractCallTrees._addNode(childNode, new Node(callGraph[i].sourceNode, callGraph[i].targetNode));
                if (callGraph[i].sourceNode.indexOf('codeql-home') !== -1) {
                  const targetSubString: string = callGraph[i].targetNode
                    .slice(callGraph[i].targetNode.indexOf('('), callGraph[i].targetNode.indexOf(','));
                  ExtractCallTrees._nativeCallers.push(targetSubString);
                }
              }
            }
          }

          ExtractCallTrees._extractRelatedCalls(childNode, callGraph);

        }

      });
    }

  }

  private static _addNode = (parentNode: Node, childNode: Node): void => {
    parentNode.addChild = childNode;
    Events.dispatch('fetch-file', CallgraphUtils.getFileName(childNode.source));
  }

  private static _getParent = (target: string, callGraph: Array<ICallgraphEdge>): string => {
    let parent: ICallgraphEdge = <ICallgraphEdge>{};
    for (let i: number = 0; i < callGraph.length; i++) {
      if ((CallgraphUtils.getFileName(callGraph[i].targetNode) === CallgraphUtils.getFileName(target)) &&
        (CallgraphUtils.getFunctionStart(callGraph[i].targetNode) < CallgraphUtils.getFunctionStart(target)) &&
        (CallgraphUtils.getFunctionEnd(callGraph[i].targetNode) > CallgraphUtils.getFunctionEnd(target))) {
        parent = callGraph[i];
        break;
      }
    }
    return parent.targetNode;
  }

}
