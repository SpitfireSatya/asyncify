
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
        console.log('Invalid externs call: ', node.source);
        isBranchInvalid = true;
        return;
      }

      if (!AnalyzeCallTrees._isCallToExterns(node) && AnalyzeCallTrees._isCallToConstructor(node)) {
        console.log('Invalid call to constructor: ', node.target);
        isBranchInvalid = true;
        return;
      }

      if (AnalyzeCallTrees._isCallToPromise(node) || AnalyzeCallTrees._isCallToSpecMethod(node) ||
        AnalyzeCallTrees._isCallToEventListener(node) || AnalyzeCallTrees._isNonPropagationCallback(node)) {
          node.removeChildren();
      }

      if (!AnalyzeCallTrees._isCallToExterns(node) && AnalyzeCallTrees._containsImplicitPromise(node)) {
        console.log('Invalid call to Implicit promise');
        isBranchInvalid = true;
        return;
      }

      if (!AnalyzeCallTrees._isCallbackFromExterns(node) && AnalyzeCallTrees._invalidAsyncIIFE(node)) {
        console.log('Results in invalid IIFE');
        isBranchInvalid = true;
        return;
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

  private static _invalidAsyncIIFE = (node: Node): boolean => {
    const cachedNode: IASTNode = Store.getASTNode(node.source);
    if (!node.parentFunction && JSON.stringify(cachedNode.fileAST).indexOf('ExportNamedDeclaration') > -1) {
      console.log('branch invalid');
      return true;
    }
    return false;
  }

  private static _isCallToConstructor = (node: Node): boolean => {
    const cachedNode: IASTNode = Store.getASTNode(node.target);
    if (cachedNode.parentNode[cachedNode.key].kind === ASTNodeKinds.CONSTRUCTOR) {
      return true;
    }
    return false;
  }

  private static _isNonPropagationCallback = (node: Node): boolean => {
    return [...ExternsCallDefinitions.callsToFSMethods, ...ExternsCallDefinitions.callsToExpressMethods,
      ...ExternsCallDefinitions.callsToZlibMethods, ...ExternsCallDefinitions.callsToCryptoMethods, ...ExternsCallDefinitions.callsToCPMethods]
      .includes(node.source);
  }

  private static _isCallToEventListener = (node: Node): boolean => {
    return [ExternsCallDefinitions.FS_READSTREAM_ON, ExternsCallDefinitions.FS_WRITESTREAM_ON]
      .includes(node.source);
  }

  private static _isCallToSpecMethod = (node: Node): boolean => {
    return (ExternsCallDefinitions.callsToSpecMethods.includes(node.source));
  }

  private static _isCallToPromise = (node: Node): boolean => {
    return (ExternsCallDefinitions.callsToPromise.includes(node.source));
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
    return false;
  }

  private static _containsImplicitPromise = (node: Node): boolean => {
    if (node.parent !== undefined) {
      return Store.getImplicitPromises().map(e => e.parent).includes(node.parentFunction);
    } else {
      return !!Store.getImplicitPromises()
        .filter(e => CallgraphUtils.getFileName(e.source) === CallgraphUtils.getFileName(node.source))
        .filter(e => e.parent === node.parentFunction)
        .length;
    }
  }

  /* private static _isCallToGetterOrSetter = (node: Node): boolean => {

    const cachedNode: IASTNode = Store.getASTNode(node.target);
    if (ASTNodeKinds.getterAndSetter().includes(cachedNode.parentNode[cachedNode.key].kind)) {
      return true;
    }
    return false;

  } */

}
