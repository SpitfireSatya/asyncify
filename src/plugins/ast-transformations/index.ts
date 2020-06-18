
import { Node } from '../../models/node.model';
import { RequiredTransform } from '../../enums/required-transform.enum';
import { SyncToExternsMap } from '../../constants/sync-to-externs-map.constant';
import { AsyncAwaitMethodCalls } from './async-await-method-calls';
import { SyncToAwaitedPromise } from './sync-to-awaited-promise';
import { Store } from '../store/store';

export class ASTTransformations {

  private static _visited: Array<string> = [];

  public static transform = (node: Node): void => {

    if (ASTTransformations._visited.includes(node.source)) {
      return;
    }

    switch (ASTTransformations.getRequiredTransform(node)) {
      case RequiredTransform.SYNC_TO_ASYNC:
        SyncToAwaitedPromise.transform(Store.getAST(node.source));
        break;
      case RequiredTransform.ASYNC_AWAIT:
        AsyncAwaitMethodCalls.transform(Store.getAST(node.source));
        break;
      default:
        throw new Error('Unknown transformation');
    }

    ASTTransformations._visited.push(node.source);

    node.children.forEach((child: Node): void => {
      ASTTransformations.transform(child);
    });

  }

  private static getRequiredTransform = (node: Node): RequiredTransform => {

    let requiredTransform: RequiredTransform = RequiredTransform.ASYNC_AWAIT;

    if (SyncToExternsMap.getAll().includes(node.target)) {
      requiredTransform = RequiredTransform.SYNC_TO_ASYNC;
    }

    return requiredTransform;

  }

}
