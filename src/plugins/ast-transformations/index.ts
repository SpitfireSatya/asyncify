
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
import { AsyncifyGetterAndSetter } from './asyncify-getter-and-setter';
import { ASTNodeKinds } from '../../constants/ast-node-kinds.constant';

import { BabelGenerator } from '../parsers-and-generators/babel-generator';
import { ITransformationDetail } from '../../interfaces/transformation-detail.interface';
import { ForEachToMap } from './forEach-to-map';

export class ASTTransformations {

  private static _visited: Array<string> = [];
  private static _relatedFunctionsTransformed: number = 0;

  public static transform = (node: Node): number => {

    ASTTransformations._relatedFunctionsTransformed = 0;
    node.children.forEach((child: Node): void => {
      ASTTransformations._traverseCallTree(child, true, undefined);
    });
    return ASTTransformations._relatedFunctionsTransformed;
  }

  public static showTransformations = (node: Node): { [key: string]: Array<ITransformationDetail> } => {

    const transformationDetails: { [key: string]: Array<ITransformationDetail> } = { };

    node.children.forEach((child: Node): void => {
      transformationDetails[child.id] = [];
      ASTTransformations._traverseCallTree(child, false, transformationDetails[child.id]);
    });

    return transformationDetails;

  }

  private static _traverseCallTree = (node: Node, updateRef: boolean = true,
    transformationDetails?: Array<ITransformationDetail>): void => {

    if (updateRef && ASTTransformations._visited.includes(node.source) && ASTTransformations._visited.includes(node.target)) {
      return;
    }

    if (!ASTTransformations._visited.includes(node.source)) {
      if (Store.getFileList().includes(CallgraphUtils.getFileName(node.source))) {

        const nodeOfInterest: IASTNode = Store.getASTNode(node.source);
        Store.addFileToWrite(CallgraphUtils.getFileName(node.source));

        switch (ASTTransformations._getRequiredTransform(node)) {

          case RequiredTransform.SYNC_TO_ASYNC:
            SyncToAwaitedPromise.transform(nodeOfInterest, node);
            AsyncAwaitMethodCalls.transform(nodeOfInterest);
            break;

          case RequiredTransform.PROMISE_ALL:
            WrapInPromiseAll.transform(nodeOfInterest);
            AsyncAwaitMethodCalls.transform(nodeOfInterest);
            break;

          case RequiredTransform.FOR_EACH_TO_MAP:
            ForEachToMap.transform(nodeOfInterest);
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

        ASTTransformations._relatedFunctionsTransformed++;

        if (!updateRef) {
          const details: ITransformationDetail = ASTTransformations._getTransformedSourceCode(node, nodeOfInterest);
          if (transformationDetails.filter((value: ITransformationDetail): boolean =>
            JSON.stringify(value) === JSON.stringify(details)).length === 0) {
              transformationDetails.push(details);
          }
        }

      }
    }

    if (!ASTTransformations._visited.includes(node.target)) {
      if (Store.getFileList().includes(CallgraphUtils.getFileName(node.target))) {

        const nodeOfInterest: IASTNode = Store.getASTNode(node.target);
        Store.addFileToWrite(CallgraphUtils.getFileName(node.target));

        if (nodeOfInterest.parentNode[nodeOfInterest.key] &&
          ASTNodeKinds.getterAndSetter().includes(nodeOfInterest.parentNode[nodeOfInterest.key].kind)) {

          AsyncifyGetterAndSetter.transform(nodeOfInterest);
          ASTTransformations._relatedFunctionsTransformed++;

          if (!updateRef) {
            const details: ITransformationDetail = ASTTransformations._getTransformedTargetCode(node, nodeOfInterest);
            if (transformationDetails.filter((value: ITransformationDetail): boolean =>
              JSON.stringify(value) === JSON.stringify(details)).length === 0) {
                transformationDetails.push(details);
            }
          }

        }

      }
    }

    if (updateRef) {
      ASTTransformations._visited.push(node.source);
      ASTTransformations._visited.push(node.target);
    }

    node.children.forEach((child: Node): void => {
      ASTTransformations._traverseCallTree(child, updateRef, transformationDetails);
    });

  }

  private static _getRequiredTransform = (node: Node): RequiredTransform => {

    let requiredTransform: RequiredTransform = RequiredTransform.ASYNC_AWAIT;

    if (ExternsFuncDefinitions.syncFunctions.includes(node.target)) {
      requiredTransform = RequiredTransform.SYNC_TO_ASYNC;
    }

    if (ExternsFuncDefinitions.forEachFunctions.includes(node.target)) {
      const astNode: IASTNode = Store.getASTNode(node.source);
      console.log('astNode.parentNode: ', astNode.parentNode);
      if(astNode.parentNode.type !== 'ArrowFunctionExpression') {
        requiredTransform = RequiredTransform.FOR_OF_LOOP;  
      } else {
        requiredTransform = RequiredTransform.FOR_EACH_TO_MAP;
      }
    }

    if (ExternsFuncDefinitions.mapFunctions.includes(node.target)) {
      requiredTransform = RequiredTransform.PROMISE_ALL;
    }

    return requiredTransform;

  }

  private static _getTransformedSourceCode = (node: Node, nodeOfInterest: IASTNode): ITransformationDetail => {

    const transformation: ITransformationDetail = <ITransformationDetail>{
      filename: CallgraphUtils.getFileName(node.source),
      startLine: Math.floor(CallgraphUtils.getFunctionStart(node.source)),
      endLine: Math.floor(CallgraphUtils.getFunctionEnd(node.source))
    };

    if (nodeOfInterest.parentFunction !== null) {
      transformation.before = BabelGenerator.generateCode(<any>Store.getASTNodeCopy(node.source).parentFunction, {});
      transformation.after = BabelGenerator.generateCode(<any>nodeOfInterest.parentFunction, {});
    } else {
      transformation.before = BabelGenerator.generateCode(<any>Store.getASTNodeCopy(node.source).parentNode[nodeOfInterest.key], {});
      transformation.after = '*Note*: File will be wrapped in an IIFE \n\n' +
        BabelGenerator.generateCode(<any>nodeOfInterest.parentNode[nodeOfInterest.key], {});
    }

    return transformation;

  }

  private static _getTransformedTargetCode = (node: Node, nodeOfInterest: IASTNode): ITransformationDetail => {

    const transformation: ITransformationDetail = <ITransformationDetail>{
      filename: CallgraphUtils.getFileName(node.target),
      before: BabelGenerator.generateCode(<any>Store.getASTNodeCopy(node.target).parentNode[nodeOfInterest.key], {}),
      after: BabelGenerator.generateCode(<any>nodeOfInterest.parentNode[nodeOfInterest.key], {}),
      startLine: Math.floor(CallgraphUtils.getFunctionStart(node.target)),
      endLine: Math.floor(CallgraphUtils.getFunctionEnd(node.target))
    };

    return transformation;

  }

}
