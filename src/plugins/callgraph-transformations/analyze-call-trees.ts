
import { Store } from '../store/store';
import { CallgraphUtils } from '../../utils/callgraph-utils';
import { ExternsCallDefinitions } from '../../constants/externs-call-definitions.constant';
import { Node } from '../../models/node.model';
import { IASTNode } from '../../interfaces/AST-node.interface';
import { ASTNodeKinds } from '../../constants/ast-node-kinds.constant';

export class AnalyzeCallTrees {

  private static _invalidCalls: Array<string> = [
    ExternsCallDefinitions.FOREACH_ES3,
    ExternsCallDefinitions.FOREACH_ES6,
    ExternsCallDefinitions.MAP_ES3,
    ExternsCallDefinitions.MAP_ES6,
  ];

  public static analyze = (rootNode: Node): Node => {

    let isBranchInvalid: boolean = false;

    function traverseTree(node: Node): void {

      if (isBranchInvalid) {
        return;
      }

      if (AnalyzeCallTrees.isNodeInvalid(node)) {
        isBranchInvalid = true;
        return;
      }

      if (AnalyzeCallTrees.isNewPromise(node)) {
        node.removeChildren();
      }

      if (node.children.length === 0) {
        return;
      }

      node.children.forEach((child: Node): void => {
        traverseTree(child);
      });

    }

    rootNode.children.forEach((child: Node): void => {
      isBranchInvalid = false;
      traverseTree(child);
      if (isBranchInvalid) {
        rootNode.removeChild(child.id);
      }
    });

    return rootNode;

  }

  private static isNewPromise = (node: Node): boolean => {
    return (node.source === ExternsCallDefinitions.NEW_PROMISE);
  }

  private static isNodeInvalid = (node: Node): boolean => {

    if (AnalyzeCallTrees._invalidCalls.includes(node.source)) {
      return true;
    }

    if (Store.getFileList().includes(CallgraphUtils.getFileName(node.target))) {

      const cachedNode: IASTNode = Store.getASTNode(node.target);
      if (ASTNodeKinds.getterAndSetter().includes(cachedNode.parentNode[cachedNode.key].kind)) {
        return true;
      }

    }

    return false;

  }

}
