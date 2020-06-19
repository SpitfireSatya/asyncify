
export class ASTNodeKinds {

  public static readonly GET: string = 'get';
  public static readonly SET: string = 'set';
  public static readonly CONST: string = 'const';

  public static getterAndSetter = (): Array<string> => {
    return [
      ASTNodeKinds.GET,
      ASTNodeKinds.SET
    ];
  }

}
