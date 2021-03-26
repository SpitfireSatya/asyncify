
import { SyncToAsyncMap } from '../../constants/sync-to-async-map.constant';
import { FuncToLibMap } from '../../constants/func-to-lib-map.constant';
import { IASTNode } from '../../interfaces/AST-node.interface';
import * as babelTypes from '@babel/types';
import { template } from '../../templates/require-declaration.template';

export class SyncToAwaitedPromise {

  public static transform = (nodeRef: IASTNode): void => {

    const childNode: babelTypes.CallExpression = nodeRef.parentNode[nodeRef.key];
    let functionName = '';

    if((<any>childNode.callee).object) {
      functionName = (<babelTypes.OptionalMemberExpression>childNode.callee).property.name;
    } else {
      functionName = (<babelTypes.Identifier>childNode.callee).name;
    }

    (<any>childNode).callee = {
      'type': 'Identifier',
      'name': `${(<any>SyncToAsyncMap)[functionName]}Promise`
    };

    nodeRef.parentNode[nodeRef.key] = childNode;

    const requireStmt = template.replace(/functionName/g, (<any>SyncToAsyncMap)[functionName]).replace(/parentLib/g, (<any>FuncToLibMap)[functionName]);

    const promisifiedRequire = nodeRef.fileAST.program.body.find((node) => (JSON.stringify(node) === requireStmt));
    if(!promisifiedRequire) {
      nodeRef.fileAST.program.body.unshift(JSON.parse(requireStmt));
    }

  }

}
