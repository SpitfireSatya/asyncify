
import { Node } from '../../models/node.model';
import { RequiredTransform } from '../../enums/required-transform.enum';
import { AsyncAwaitMethodCalls } from './async-await-method-calls';
import { SyncToAwaitedPromise } from './sync-to-awaited-promise';
import { Store } from '../store/store';
import { ExternsFuncDefinitions } from '../../constants/externs-func-definitions';

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

    switch (ASTTransformations._getRequiredTransform(node)) {
      case RequiredTransform.SYNC_TO_ASYNC:
        SyncToAwaitedPromise.transform(Store.getASTNode(node.source));
        AsyncAwaitMethodCalls.transform(Store.getASTNode(node.source));
        break;
      case RequiredTransform.ASYNC_AWAIT:
      default:
        AsyncAwaitMethodCalls.transform(Store.getASTNode(node.source));
    }

    ASTTransformations._visited.push(node.source);

    node.children.forEach((child: Node): void => {
      ASTTransformations._traverseAST(child);
    });

  }

  private static _getRequiredTransform = (node: Node): RequiredTransform => {

    let requiredTransform: RequiredTransform = RequiredTransform.ASYNC_AWAIT;

    if (ExternsFuncDefinitions.syncFunctions.includes(node.target)) {
      requiredTransform = RequiredTransform.SYNC_TO_ASYNC;
    }

    return requiredTransform;

  }

}
