
export class ExternsCallDefinitions {

  public static readonly FS_STAT: string = 'Callee(/home/osboxes/codeql-home/codeql/javascript/tools/data/externs/nodejs/fs.js:<722,50>--<722,60>)';
  public static readonly FS_RENAME: string = 'Callee(/home/osboxes/codeql-home/codeql/javascript/tools/data/externs/nodejs/fs.js:<523,64>--<523,74>)';

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

  public static readonly PROCESS_NEXT_TICK: string = 'Callee(/home/osboxes/codeql-home/codeql/javascript/tools/data/externs/nodejs/globals.js:<989,76>--<989,86>)';

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
      ExternsCallDefinitions.FS_STAT,
      ExternsCallDefinitions.FS_RENAME,
      ExternsCallDefinitions.NEW_PROMISE,
      ExternsCallDefinitions.FOREACH_ES3,
      ExternsCallDefinitions.FOREACH_ES6,
      ExternsCallDefinitions.MAP_ES3,
      ExternsCallDefinitions.MAP_ES6,
      ExternsCallDefinitions.NET_SERVER_LISTEN_1,
      ExternsCallDefinitions.NET_SERVER_LISTEN_2,
      ExternsCallDefinitions.NET_SERVER_LISTEN_3,
      ExternsCallDefinitions.NET_SERVER_LISTEN_4,
      ExternsCallDefinitions.PROCESS_NEXT_TICK
    ];
  }

}
