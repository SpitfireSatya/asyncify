
export class ExternsFuncDefinitions {

  // Sync functions
  public static readonly READ_FILE_SYNC: string = 'Fun(/home/osboxes/codeql-home/codeql/javascript/tools/data/externs/nodejs/fs.js:<1155,18>--<1155,49>)';
  public static readonly WRITE_FILE_SYNC: string = 'Fun(/home/osboxes/codeql-home/codeql/javascript/tools/data/externs/nodejs/fs.js:<1203,19>--<1203,55>)';

  // map functions
  public static readonly MAP_ES3_1: string = 'Fun(/home/osboxes/codeql-home/codeql/javascript/tools/data/externs/ES/es3.js:<811,22>--<811,82>)';
  public static readonly MAP_ES3_2: string = 'Fun(/home/osboxes/codeql-home/codeql/javascript/tools/data/externs/ES/es3.js:<900,12>--<900,77>)';
  public static readonly MAP_ES6: string = 'Fun(/home/osboxes/codeql-home/codeql/javascript/tools/data/externs/ES/es6.js:<479,27>--<479,87>)';

  // forEach functions
  public static readonly FOREACH_ES3_1: string = 'Fun(/home/osboxes/codeql-home/codeql/javascript/tools/data/externs/ES/es3.js:<776,26>--<776,86>)';
  public static readonly FOREACH_ES3_2: string = 'Fun(/home/osboxes/codeql-home/codeql/javascript/tools/data/externs/ES/es3.js:<867,16>--<867,81>)';
  public static readonly FOREACH_ES6: string = 'Fun(/home/osboxes/codeql-home/codeql/javascript/tools/data/externs/ES/es6.js:<424,31>--<424,91>)';

  // Promise functions
  public static readonly NEW_PROMISE: string = '';

  public static get syncFunctions(): Array<string> {
    return [
      ExternsFuncDefinitions.READ_FILE_SYNC,
      ExternsFuncDefinitions.WRITE_FILE_SYNC
    ];
  }

  public static get forEachFunctions(): Array<string> {
    return [
      ExternsFuncDefinitions.FOREACH_ES3_1,
      ExternsFuncDefinitions.FOREACH_ES3_2,
      ExternsFuncDefinitions.FOREACH_ES6
    ];
  }

  public static get mapFunctions(): Array<string> {
    return [
      ExternsFuncDefinitions.MAP_ES3_1,
      ExternsFuncDefinitions.MAP_ES3_2,
      ExternsFuncDefinitions.MAP_ES6
    ];
  }

  public static get promiseFunctions(): Array<string> {
    return [
      ExternsFuncDefinitions.NEW_PROMISE
    ];
  }

}
