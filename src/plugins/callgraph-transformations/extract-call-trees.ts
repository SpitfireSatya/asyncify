
import { CallgraphUtils } from '../../utils/callgraph-utils';
import { Events } from '../events/events';
import { Node } from '../../models/node.model';
import { ICallgraphEdge } from '../../interfaces/callgraph-edge.interface';
import { ExternsFuncDefinitions } from '../../constants/externs-func-definitions';
import { Store } from '../store/store';

export class ExtractCallTrees {

  private static _sourceNodesAdded: Array<string> = [];
  private static _nativeCallers: Array<string> = [];
  private static _sourcesAdded: Array<string> = [];

  public static extract = (callGraph: Array<ICallgraphEdge>): Promise<Node> => {
    ExtractCallTrees._sourceNodesAdded = [];
    ExtractCallTrees._nativeCallers = [];
    ExtractCallTrees._sourcesAdded = [];
    return new Promise((resolve: any, reject: any): void => {
      const root: Node = new Node(null, null, null);
      ExtractCallTrees._extractImplicitPromises(callGraph);
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
      if (!ExtractCallTrees._sourceNodesAdded.includes(callGraph[i].sourceNode) && ExternsFuncDefinitions.syncFunctions.indexOf(callGraph[i].targetNode) !== -1) {
        ExtractCallTrees._sourceNodesAdded.push(callGraph[i].sourceNode);
        const parent: string = ExtractCallTrees._getParent(callGraph[i].sourceNode, callGraph);
        ExtractCallTrees._addNode(rootNode, new Node(callGraph[i].sourceNode, callGraph[i].targetNode, parent));
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
              const parent: string = ExtractCallTrees._getParent(callGraph[i].sourceNode, callGraph);
              ExtractCallTrees._addNode(callTreeNode, new Node(callGraph[i].sourceNode, callGraph[i].targetNode, parent));
              ExtractCallTrees._nativeCallers.splice(index, 1);
            }
          } else {
            const parent: string = ExtractCallTrees._getParent(callGraph[i].sourceNode, callGraph);
            ExtractCallTrees._addNode(callTreeNode, new Node(callGraph[i].sourceNode, callGraph[i].targetNode, parent));
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

  private static _extractImplicitPromises = (callGraph: Array<ICallgraphEdge>): void => {
    const callsToPromises: Array<{ parent: string, source: string }> = callGraph.filter((edge: ICallgraphEdge): boolean =>
      (edge.targetNode === ExternsFuncDefinitions.PROMISE_THEN || edge.targetNode === ExternsFuncDefinitions.PROMISE_CATCH))
      .map((edge: ICallgraphEdge): { parent: string, source: string } => {
        return {
          parent: ExtractCallTrees._getParent(edge.sourceNode, callGraph),
          source: edge.sourceNode
        };
      });

    Store.addImplicitPromises(callsToPromises);

  }

}
