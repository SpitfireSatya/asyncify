
import { CallgraphUtils } from '../../utils/callgraph-utils';
import { Events } from '../events/events';
import { Node } from '../../models/node.model';
import { ICallgraphEdge } from '../../interfaces/callgraph-edge.interface';
import { ExternsFuncDefinitions } from '../../constants/externs-func-definitions';

export class ExtractCallTrees {

  private static _nativeCallers: Array<string> = [];
  private static _sourcesAdded: Array<string> = [];

  public static extract = (callGraph: Array<ICallgraphEdge>): Promise<Node> => {
    return new Promise((resolve: any, reject: any): void => {
      const root: Node = new Node(null, null);
      ExtractCallTrees._extractSyncFunctionCallers(root, callGraph);
      root.children.forEach((child: Node): void => {
        ExtractCallTrees._sourcesAdded = [];
        ExtractCallTrees._extractRelatedCalls(child, callGraph);
      });
      ExtractCallTrees._sourcesAdded = [];
      Events.register('ready', (): void => ExtractCallTrees._readyCallback(resolve, root));
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

    if (ExtractCallTrees._sourcesAdded.includes(callTreeNode.source) && ExtractCallTrees._sourcesAdded.includes(callTreeNode.target)) {
      return;
    }

    ExtractCallTrees._sourcesAdded.push(callTreeNode.source);
    ExtractCallTrees._sourcesAdded.push(callTreeNode.target);

    const newTarget: string = ExtractCallTrees._getParent(callTreeNode.source, callGraph);

    if (newTarget) {
      for (let i: number = 0; i < callGraph.length; i++) {
        if (callGraph[i].targetNode === newTarget) {
          if (newTarget.indexOf('codeql-home') !== -1) {
            const index: number = ExtractCallTrees._nativeCallers
              .indexOf(callGraph[i].sourceNode.slice(callGraph[i].sourceNode.indexOf('('), callGraph[i].sourceNode.indexOf(',')));
            if (index !== -1) {
              ExtractCallTrees._addNode(callTreeNode, new Node(callGraph[i].sourceNode, callGraph[i].targetNode));
              ExtractCallTrees._nativeCallers.splice(index, 1);
            }
          } else {
            ExtractCallTrees._addNode(callTreeNode, new Node(callGraph[i].sourceNode, callGraph[i].targetNode));
            if (callGraph[i].sourceNode.indexOf('codeql-home') !== -1) {
              const targetSubString: string = callGraph[i].targetNode
                .slice(callGraph[i].targetNode.indexOf('('), callGraph[i].targetNode.indexOf(','));
              ExtractCallTrees._nativeCallers.push(targetSubString);
            }
          }
        }
      }
    }

    if (callTreeNode.children.length > 0) {
      callTreeNode.children.forEach((childNode: Node): void => {
        ExtractCallTrees._extractRelatedCalls(childNode, callGraph);
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
