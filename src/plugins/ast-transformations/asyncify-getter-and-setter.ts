
import { IASTNode } from '../../interfaces/AST-node.interface';
import * as babelTypes from '@babel/types';
import { template } from '../../templates/async-iife.template';

export class AsyncifyGetterAndSetter {

  public static transform = (nodeRef: IASTNode): void => {

    const childNode: babelTypes.FunctionExpression = nodeRef.parentNode[nodeRef.key];
    const childBody: any = Object.assign({}, childNode.body);

    const asyncIIFENode: any = JSON.parse(template);
    asyncIIFENode.argument.callee.body.body.push(...childBody.body);

    nodeRef.parentNode[nodeRef.key].body.body = [];
    nodeRef.parentNode[nodeRef.key].body.body.push(asyncIIFENode);

  }

}
