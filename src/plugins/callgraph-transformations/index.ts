
import { Node } from '../../models/node.model';
import { ICallgraphEdge } from '../../interfaces/callgraph-edge.interface';
import { ExtractCallTrees } from './extract-call-trees';
import { AnalyzeCallTrees } from './analyze-call-trees';
import { Store } from '../store/store';

export class CallGraphTransformations {

  public static transform = (callgraph: Array<ICallgraphEdge>): Promise<Node> => {
    return ExtractCallTrees.extract(callgraph)
    .then((rootNode: Node): Node => {
        Store.setData('syncIdentified', rootNode.children.length, true);
        console.log('Sync functions identified: ', rootNode.children.length);
        rootNode = AnalyzeCallTrees.analyze(rootNode);
        // CallGraphTransformations.printCallTrees(rootNode, '');
        return rootNode;
    });
  }

  /* istanbul ignore next: Non-functional code. For displaying the tree only */
  private static printCallTrees = (node: Node, calltree: string): void => {

    if (node.children.length === 0) {
      console.log(calltree + '\n\t' + node.source + '\n');
      return;
    }

    node.children.forEach((child: Node): void => {
      CallGraphTransformations.printCallTrees(child, calltree + '\n\t' + node.source);
    });

  }

}
