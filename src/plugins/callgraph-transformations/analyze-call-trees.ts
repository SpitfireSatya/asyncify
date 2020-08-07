
import { Store } from '../store/store';
import { CallgraphUtils } from '../../utils/callgraph-utils';
import { ExternsCallDefinitions } from '../../constants/externs-call-definitions.constant';
import { Node } from '../../models/node.model';
import { IASTNode } from '../../interfaces/AST-node.interface';
import { ASTNodeKinds } from '../../constants/ast-node-kinds.constant';

export class AnalyzeCallTrees {

  public static analyze = (rootNode: Node): Node => {

    let isBranchInvalid: boolean = false;

    function traverseTree(node: Node): void {

      if (isBranchInvalid) {
        return;
      }

      if (AnalyzeCallTrees._isCallbackFromExterns(node) && !AnalyzeCallTrees._isValidExternsCall(node)) {
        isBranchInvalid = true;
        return;
      }

      if (!AnalyzeCallTrees._isCallToExterns(node) && AnalyzeCallTrees._isCallToConstructor(node)) {
        isBranchInvalid = true;
        return;
      }

      if (AnalyzeCallTrees._isNewPromise(node) || AnalyzeCallTrees._isCallToSpecMethod(node) ||
        AnalyzeCallTrees._isCallToEventListener(node)) {
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

  private static _isCallToConstructor = (node: Node): boolean => {
    const cachedNode: IASTNode = Store.getASTNode(node.target);
    if (cachedNode.parentNode[cachedNode.key].kind === ASTNodeKinds.CONSTRUCTOR) {
      console.log('Removing branch: ', node.target);
      return true;
    }
    return false;
  }

  private static _isCallToEventListener = (node: Node): boolean => {
    return [ExternsCallDefinitions.FS_READSTREAM_ON, ExternsCallDefinitions.FS_WRITESTREAM_ON].includes(node.source);
  }

  private static _isCallToSpecMethod = (node: Node): boolean => {
    return (ExternsCallDefinitions.callsToSpecMethods.includes(node.source));
  }

  private static _isNewPromise = (node: Node): boolean => {
    return (ExternsCallDefinitions.callsToNewPromise.includes(node.source));
  }

  private static _isCallToExterns = (node: Node): boolean => {
    return !Store.getFileList().includes(CallgraphUtils.getFileName(node.target));
  }

  private static _isCallbackFromExterns = (node: Node): boolean => {
    return !Store.getFileList().includes(CallgraphUtils.getFileName(node.source));
  }

  private static _isValidExternsCall = (node: Node): boolean => {
    if (ExternsCallDefinitions.validExternsCalls.includes(node.source)) {
      return true;
    }
    console.log(node.source);
    return false;
  }

  /* private static _isCallToGetterOrSetter = (node: Node): boolean => {

    const cachedNode: IASTNode = Store.getASTNode(node.target);
    if (ASTNodeKinds.getterAndSetter().includes(cachedNode.parentNode[cachedNode.key].kind)) {
      return true;
    }
    return false;

  } */

}
