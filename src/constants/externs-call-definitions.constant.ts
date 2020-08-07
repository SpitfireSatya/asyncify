
export class ExternsCallDefinitions {

  public static readonly FS_STAT: string = 'Callee(/home/osboxes/codeql-home/codeql/javascript/tools/data/externs/nodejs/fs.js:<722,50>--<722,60>)';
  public static readonly FS_RENAME: string = 'Callee(/home/osboxes/codeql-home/codeql/javascript/tools/data/externs/nodejs/fs.js:<523,64>--<523,74>)';
  public static readonly FS_READSTREAM_ON: string = 'Callee(/home/osboxes/codeql-home/codeql/javascript/tools/data/externs/nodejs/fs.js:<1371,53>--<1371,63>)';
  public static readonly FS_WRITESTREAM_ON: string = 'Callee(/home/osboxes/codeql-home/codeql/javascript/tools/data/externs/nodejs/fs.js:<1379,54>--<1379,64>)';

  // call to map()
  public static readonly MAP_ES3: string = 'Callee(/home/osboxes/codeql-home/codeql/javascript/tools/data/externs/es/es3.js:<811,69>--<811,79>)';
  public static readonly MAP_ES6: string = 'Callee(/home/osboxes/codeql-home/codeql/javascript/tools/data/externs/es/es6.js:<479,74>--<479,84>)';

  // call to forEach()
  public static readonly FOREACH_ES3: string = 'Callee(/home/osboxes/codeql-home/codeql/javascript/tools/data/externs/es/es3.js:<776,73>--<776,83>)';
  public static readonly FOREACH_ES6: string = 'Callee(/home/osboxes/codeql-home/codeql/javascript/tools/data/externs/es/es6.js:<424,78>--<424,88>)';

  // call to new Promise()
  public static readonly NEW_PROMISE: string = 'Callee(/home/osboxes/codeql-home/codeql/javascript/tools/data/externs/es/es6.js:<1105,42>--<1105,52>)';

  public static readonly NET_SERVER_LISTEN_1: string = 'Callee(/home/osboxes/codeql-home/codeql/javascript/tools/data/externs/nodejs/net.js:<308,88>--<308,107>)';
  public static readonly NET_SERVER_LISTEN_2: string = 'Callee(/home/osboxes/codeql-home/codeql/javascript/tools/data/externs/nodejs/net.js:<323,88>--<323,107>)';
  public static readonly NET_SERVER_LISTEN_3: string = 'Callee(/home/osboxes/codeql-home/codeql/javascript/tools/data/externs/nodejs/net.js:<338,90>--<338,109>)';
  public static readonly NET_SERVER_LISTEN_4: string = 'Callee(/home/osboxes/codeql-home/codeql/javascript/tools/data/externs/nodejs/net.js:<345,91>--<345,110>)';

  // call to process
  public static readonly PROCESS_NEXT_TICK: string = 'Callee(/home/osboxes/codeql-home/codeql/javascript/tools/data/externs/nodejs/globals.js:<989,76>--<989,86>)';

  // call to jest
  public static readonly JEST_DESCRIBE: string = 'Callee(/home/osboxes/codeql-home/codeql/javascript/tools/data/externs/lib/jest.js:<38,30>--<38,34>)';
  public static readonly JEST_IT: string = 'Callee(/home/osboxes/codeql-home/codeql/javascript/tools/data/externs/lib/jest.js:<57,34>--<57,37>)';
  public static readonly JEST_BEFORE: string = 'Callee(/home/osboxes/codeql-home/codeql/javascript/tools/data/externs/lib/jest.js:<32,31>--<32,35>)';
  public static readonly JEST_BEFORE_EACH: string = 'Callee(/home/osboxes/codeql-home/codeql/javascript/tools/data/externs/lib/jest.js:<36,35>--<36,39>)';
  public static readonly JEST_AFTER: string = '';
  public static readonly JEST_AFTER_EACH: string = '';
  public static readonly JEST_FN: string = 'Callee(/home/osboxes/codeql-home/codeql/javascript/tools/data/externs/lib/jest.js:<167,34>--<167,50>)';

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

  public static get callsToSpecMethods(): Array<string> {
    return [
      ExternsCallDefinitions.JEST_DESCRIBE,
      ExternsCallDefinitions.JEST_IT,
      ExternsCallDefinitions.JEST_BEFORE_EACH,
      ExternsCallDefinitions.JEST_BEFORE
    ];
  }

  public static get validExternsCalls(): Array<string> {
    return [
      ExternsCallDefinitions.FS_STAT,
      ExternsCallDefinitions.FS_RENAME,
      ExternsCallDefinitions.FS_READSTREAM_ON,
      ExternsCallDefinitions.FS_WRITESTREAM_ON,
      ExternsCallDefinitions.NEW_PROMISE,
      ExternsCallDefinitions.FOREACH_ES3,
      ExternsCallDefinitions.FOREACH_ES6,
      ExternsCallDefinitions.MAP_ES3,
      ExternsCallDefinitions.MAP_ES6,
      ExternsCallDefinitions.NET_SERVER_LISTEN_1,
      ExternsCallDefinitions.NET_SERVER_LISTEN_2,
      ExternsCallDefinitions.NET_SERVER_LISTEN_3,
      ExternsCallDefinitions.NET_SERVER_LISTEN_4,
      ExternsCallDefinitions.PROCESS_NEXT_TICK,
      ExternsCallDefinitions.JEST_DESCRIBE,
      ExternsCallDefinitions.JEST_IT,
      ExternsCallDefinitions.JEST_FN,
      ExternsCallDefinitions.JEST_BEFORE_EACH,
      ExternsCallDefinitions.JEST_BEFORE
    ];
  }

}
