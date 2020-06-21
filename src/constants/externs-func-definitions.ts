
export class ExternsFuncDefinitions {

  public static readonly READ_FILE_SYNC: string = 'Fun(/home/osboxes/codeql-home/codeql/javascript/tools/data/externs/nodejs/fs.js:<1155,18>--<1155,49>)';
  public static readonly WRITE_FILE_SYNC: string = 'Fun(/home/osboxes/codeql-home/codeql/javascript/tools/data/externs/nodejs/fs.js:<1203,19>--<1203,55>)';

  public static get syncFunctions(): Array<string> {
    return [
      ExternsFuncDefinitions.READ_FILE_SYNC,
      ExternsFuncDefinitions.WRITE_FILE_SYNC
    ];
  }

}
