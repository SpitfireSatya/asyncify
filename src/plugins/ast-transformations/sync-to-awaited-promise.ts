
import { SyncToAsyncMap } from '../../constants/sync-to-async-map.constant';
import { FuncToLibMap } from '../../constants/func-to-lib-map.constant';
import { IASTNode } from '../../interfaces/AST-node.interface';
import * as babelTypes from '@babel/types';
import { template } from '../../templates/require-declaration.template';
import { Node } from '../../models/node.model';

export class SyncToAwaitedPromise {

  public static transform = (nodeRef: IASTNode, node: Node): void => {

    const childNode: babelTypes.CallExpression = nodeRef.parentNode[nodeRef.key];
    let functionName = '';

    if((<any>childNode.callee).object) {
      functionName = (<babelTypes.OptionalMemberExpression>childNode.callee).property.name;
    } else {
      functionName = (<babelTypes.Identifier>childNode.callee).name;
    }

    let parentLib: string = (<any>FuncToLibMap)[functionName];

    if(node.target.indexOf(parentLib) === -1) {
      parentLib = node.target.slice(node.target.lastIndexOf('/') + 1, node.target.indexOf('.js'));
    }

    (<any>childNode).callee = {
      'type': 'Identifier',
      'name': `${parentLib}_${(<any>SyncToAsyncMap)[functionName]}Promise`
    };

    nodeRef.parentNode[nodeRef.key] = childNode;

    const requireStmt = template
      .replace(/functionNamePromise/g, parentLib + '_' +(<any>SyncToAsyncMap)[functionName] + 'Promise')
      .replace(/functionName/g, (<any>SyncToAsyncMap)[functionName])
      .replace(/parentLib/g, parentLib);

    if(nodeRef.fileAST.program.body[0] && nodeRef.fileAST.program.body[0].type === 'ExpressionStatement'
      && (<any>nodeRef.fileAST.program.body[0]).expression.callee && (<any>nodeRef.fileAST.program.body[0]).expression.callee.type === 'FunctionExpression') {
      const promisifiedRequire = (<any>nodeRef.fileAST.program.body[0]).expression
        .callee.body.body.find((node: any) => (JSON.stringify(node) === requireStmt));
      if(!promisifiedRequire) {
        (<any>nodeRef.fileAST.program.body[0]).expression.callee.body.body.unshift(JSON.parse(requireStmt));
      }  
    } else {
      const promisifiedRequire = nodeRef.fileAST.program.body.find((node) => (JSON.stringify(node) === requireStmt));
      if(!promisifiedRequire) {
        nodeRef.fileAST.program.body.unshift(JSON.parse(requireStmt));
      }
    }

  }

}
