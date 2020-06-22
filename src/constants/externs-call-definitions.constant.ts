
export class ExternsCallDefinitions {

  // call to map()
  public static readonly MAP_ES3: string = 'Callee(/home/osboxes/codeql-home/codeql/javascript/tools/data/externs/nodejs/es3.js:<811,69>--<811,79>)';
  public static readonly MAP_ES6: string = 'Callee(/home/osboxes/codeql-home/codeql/javascript/tools/data/externs/nodejs/es6.js:<479,74>--<479,84>)';

  // call to forEach()
  public static readonly FOREACH_ES3: string = 'Callee(/home/osboxes/codeql-home/codeql/javascript/tools/data/externs/nodejs/es3.js:<776,73>--<776,83>)';
  public static readonly FOREACH_ES6: string = 'Callee(/home/osboxes/codeql-home/codeql/javascript/tools/data/externs/nodejs/es6.js:<424,78>--<424,88>)';

  // call to new Promise()
  public static readonly NEW_PROMISE: string = 'Callee(/home/osboxes/codeql-home/codeql/javascript/tools/data/externs/nodejs/es6.js:<1105,42>--<1105,52>)';

  public static get callsToForEach(): Array<string> {
    return [
      ExternsCallDefinitions.FOREACH_ES3,
      ExternsCallDefinitions.FOREACH_ES6
    ];
  }

  public static get callsToMap(): Array<string> {
    return [
      ExternsCallDefinitions.MAP_ES3,
      ExternsCallDefinitions.MAP_ES6
    ];
  }

  public static get callsToNewPromise(): Array<string> {
    return [
      ExternsCallDefinitions.NEW_PROMISE
    ];
  }

  public static get validExternsCalls(): Array<string> {
    return [
      ExternsCallDefinitions.NEW_PROMISE,
      ExternsCallDefinitions.FOREACH_ES3,
      ExternsCallDefinitions.FOREACH_ES6,
      ExternsCallDefinitions.MAP_ES3,
      ExternsCallDefinitions.MAP_ES6
    ];
  }

}
