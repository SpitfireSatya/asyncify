
export class ASTNodeTypes {

  public static readonly FUNCTION_DECLARATION: string = 'FunctionDeclaration';
  public static readonly FUNCTION_EXPRESSION: string = 'FunctionExpression';
  public static readonly ARROW_FUNCTION_EXPRESSION: string = 'ArrowFunctionExpression';
  public static readonly ARROW_FUNCTION_DECLARATION: string = 'ArrowFunctionDeclaration';
  public static readonly CLASS_METHOD: string = 'ClassMethod';
  public static readonly OBJECT_METHOD: string = 'ObjectMethod';

  public static readonly CALL_EXPRESSION: string = 'CallExpression';
  public static readonly MEMBER_EXPRESSION: string = 'MemberExpression';

  public static functionDeclarations = (): Array<string> => {
    return [
     ASTNodeTypes.FUNCTION_DECLARATION,
     ASTNodeTypes.FUNCTION_EXPRESSION,
     ASTNodeTypes.ARROW_FUNCTION_EXPRESSION,
     ASTNodeTypes.ARROW_FUNCTION_DECLARATION,
     ASTNodeTypes.CLASS_METHOD,
     ASTNodeTypes.OBJECT_METHOD
    ];
  }

  public static functionCalls = (): Array<string> => {
    return [
      ASTNodeTypes.CALL_EXPRESSION,
      ASTNodeTypes.MEMBER_EXPRESSION
    ];
  }

}
