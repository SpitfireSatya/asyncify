
import { ASTUtils } from './ast-utils';
import * as sinon from 'sinon';
import { Store } from '../plugins/store/store';
import { ASTNode } from '../models/AST-node.model';

describe('utils', (): void => {
  describe('CallgraphUtils', (): void => {

    describe('[cacheASTNodes()', (): void => {

      const functionDeclarationNode: any = { type: 'FunctionDeclaration', loc: {start: {line: 1, column: 1}, end: {line: 1, column: 1 }}};
      const functionExpressionNode: any = { type: 'FunctionExpression', loc: {start: {line: 1, column: 1}, end: {line: 1, column: 1 }}};
      const arrowFunctionExpressionNode: any = { type: 'ArrowFunctionExpression', loc: {start: {line: 1, column: 1}, end: {line: 1, column: 1 }}}; // tslint:disable-line: max-line-length
      const arrowFunctionDeclarationNode: any = { type: 'ArrowFunctionDeclaration', loc: {start: {line: 1, column: 1}, end: {line: 1, column: 1 }}}; // tslint:disable-line: max-line-length
      const classMethodNode: any = { type: 'ClassMethod', loc: {start: {line: 1, column: 1}, end: {line: 1, column: 1 }}};
      const objectMethodNode: any = { type: 'ObjectMethod', loc: {start: {line: 1, column: 1}, end: {line: 1, column: 1 }}};

      const callExpressionNode: any = { type: 'CallExpression', loc: {start: {line: 1, column: 1}, end: {line: 1, column: 1 }}};
      const memberExpressionNode: any = { type: 'MemberExpression', loc: {start: {line: 1, column: 1}, end: {line: 1, column: 1 }}};

      let setASTNodeStub: sinon.SinonStub;
      const cacheKeyFun: string = 'Fun(file:<1,1>--<1,1>)';
      const cacheKeyCallee: string = 'Callee(file:<1,1>--<1,1>)';

      beforeEach((): void => {
        setASTNodeStub = sinon.stub(Store, 'setASTNode');
      });

      afterEach((): void => {
        setASTNodeStub.restore();
      });

      it('should populate ASTNode and add to store for function declaration', (): void => {

        const ast: any = { key: functionDeclarationNode };

        ASTUtils.cacheASTNodes(ast, 'file');

        sinon.assert.calledOnceWithExactly(setASTNodeStub, cacheKeyFun, new ASTNode(ast, 'key', 'file', null, ast));

      });

      it('should populate ASTNode and add to store for function expression', (): void => {

        const ast: any = { key: functionExpressionNode };

        ASTUtils.cacheASTNodes(ast, 'file');

        sinon.assert.calledOnceWithExactly(setASTNodeStub, cacheKeyFun, new ASTNode(ast, 'key', 'file', null, ast));

      });

      it('should populate ASTNode and add to store for arrow function declaration', (): void => {

        const ast: any = { key: arrowFunctionDeclarationNode };

        ASTUtils.cacheASTNodes(ast, 'file');

        sinon.assert.calledOnceWithExactly(setASTNodeStub, cacheKeyFun, new ASTNode(ast, 'key', 'file', null, ast));

      });

      it('should populate ASTNode and add to store for arrow function expression', (): void => {

        const ast: any = { key: arrowFunctionExpressionNode };

        ASTUtils.cacheASTNodes(ast, 'file');

        sinon.assert.calledOnceWithExactly(setASTNodeStub, cacheKeyFun, new ASTNode(ast, 'key', 'file', null, ast));

      });

      it('should populate ASTNode and add to store for class method', (): void => {

        const ast: any = { key: classMethodNode };

        ASTUtils.cacheASTNodes(ast, 'file');

        sinon.assert.calledOnceWithExactly(setASTNodeStub, cacheKeyFun, new ASTNode(ast, 'key', 'file', null, ast));

      });

      it('should populate ASTNode and add to store for object method', (): void => {

        const ast: any = { key: objectMethodNode };

        ASTUtils.cacheASTNodes(ast, 'file');

        sinon.assert.calledOnceWithExactly(setASTNodeStub, cacheKeyFun, new ASTNode(ast, 'key', 'file', null, ast));

      });

      it('should populate ASTNode and add to store for call expression', (): void => {

        const ast: any = { key: callExpressionNode };

        ASTUtils.cacheASTNodes(ast, 'file');

        sinon.assert.calledOnceWithExactly(setASTNodeStub, cacheKeyCallee, new ASTNode(ast, 'key', 'file', null, ast));

      });

      it('should populate ASTNode and add to store for member expression', (): void => {

        const ast: any = { key: memberExpressionNode };

        ASTUtils.cacheASTNodes(ast, 'file');

        sinon.assert.calledOnceWithExactly(setASTNodeStub, cacheKeyCallee, new ASTNode(ast, 'key', 'file', null, ast));

      });

      it('should populate parent function for node if present', (): void => {

        const ast: any = { key: { ...functionDeclarationNode, body: { key1: objectMethodNode }, data: null }};

        ASTUtils.cacheASTNodes(ast, 'file');

        sinon.assert.calledWithMatch(setASTNodeStub.secondCall, cacheKeyFun, new ASTNode(ast.key.body, 'key1', 'file', ast.key, ast));

      });

      it('should do nothing if astNode is null', (): void => {

        const ast: any = null;

        ASTUtils.cacheASTNodes(ast, 'file');

        sinon.assert.notCalled(setASTNodeStub);

      });

    });


  });
});
