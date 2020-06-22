
import { Node } from '../../models/node.model';
import { RequiredTransform } from '../../enums/required-transform.enum';
import { AsyncAwaitMethodCalls } from './async-await-method-calls';
import { SyncToAwaitedPromise } from './sync-to-awaited-promise';
import { Store } from '../store/store';
import { ExternsFuncDefinitions } from '../../constants/externs-func-definitions';
import { WrapInPromiseAll } from './wrap-in-promise-all';
import { ForEachToForOf } from './forEach-to-forOf';
import { IASTNode } from '../../interfaces/AST-node.interface';
import { CallgraphUtils } from '../../utils/callgraph-utils';

export class ASTTransformations {

  private static _visited: Array<string> = [];

  public static transform = (node: Node): void => {

    node.children.forEach((child: Node): void => {
      ASTTransformations._traverseAST(child);
    });

  }

  private static _traverseAST = (node: Node): void => {

    if (ASTTransformations._visited.includes(node.source)) {
      return;
    }

    if (Store.getFileList().includes(CallgraphUtils.getFileName(node.source))) {

      const nodeOfInterest: IASTNode = Store.getASTNode(node.source);

      switch (ASTTransformations._getRequiredTransform(node)) {

        case RequiredTransform.SYNC_TO_ASYNC:
          SyncToAwaitedPromise.transform(nodeOfInterest);
          AsyncAwaitMethodCalls.transform(nodeOfInterest);
          break;

        case RequiredTransform.PROMISE_ALL:
          WrapInPromiseAll.transform(nodeOfInterest);
          AsyncAwaitMethodCalls.transform(nodeOfInterest);
          break;

        case RequiredTransform.FOR_OF_LOOP:
          ForEachToForOf.transform(nodeOfInterest);
          AsyncAwaitMethodCalls.transform(nodeOfInterest);
          break;

        case RequiredTransform.ASYNC_AWAIT:
        default:
          AsyncAwaitMethodCalls.transform(nodeOfInterest);
      }

      ASTTransformations._visited.push(node.source);
    }

    node.children.forEach((child: Node): void => {
      ASTTransformations._traverseAST(child);
    });

  }

  private static _getRequiredTransform = (node: Node): RequiredTransform => {

    let requiredTransform: RequiredTransform = RequiredTransform.ASYNC_AWAIT;

    if (ExternsFuncDefinitions.syncFunctions.includes(node.target)) {
      requiredTransform = RequiredTransform.SYNC_TO_ASYNC;
    }

    if (ExternsFuncDefinitions.forEachFunctions.includes(node.target)) {
      requiredTransform = RequiredTransform.FOR_OF_LOOP;
    }

    if (ExternsFuncDefinitions.mapFunctions.includes(node.target)) {
      requiredTransform = RequiredTransform.PROMISE_ALL;
    }

    return requiredTransform;

  }

}
