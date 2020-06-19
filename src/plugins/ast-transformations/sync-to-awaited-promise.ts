
import { DeepClone } from '../../utils/deep-clone';
import { SyncToAsyncMap } from '../../constants/sync-to-async-map.constant';
import { IASTNode } from '../../interfaces/AST-node.interface';
import * as babelTypes from '@babel/types';

export class SyncToAwaitedPromise {

  public static transform = (nodeRef: IASTNode): void => {

    const childNode: babelTypes.CallExpression = DeepClone.clone(nodeRef.parentNode[nodeRef.key]);
    const object: babelTypes.OptionalMemberExpression = (<any>childNode.callee).object;

    (<babelTypes.BindExpression>childNode.callee).object = {
      type: 'MemberExpression',
      object: object,
      property: {
        type: 'Identifier',
        name: 'promises'
      }
    };

    (<babelTypes.OptionalMemberExpression>childNode.callee).property.name =
      (<any>SyncToAsyncMap)[(<babelTypes.OptionalMemberExpression>childNode.callee).property.name];

      nodeRef.parentNode[nodeRef.key] = childNode;

  }

}
