
import { Global } from './global.constant';

export class ExternsFuncDefinitions {

  // Sync functions
  public static readonly READ_FILE_SYNC: string = `Fun(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/nodejs/fs.js:<1155,18>--<1155,49>)`;
  public static readonly WRITE_FILE_SYNC: string = `Fun(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/nodejs/fs.js:<1203,19>--<1203,55>)`;
  public static readonly READDIR_SYNC: string = `Fun(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/nodejs/fs.js:<910,18>--<910,34>)`;
  public static readonly ACCesS_SYNC: string = `Fun(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/nodejs/fs.js:<1363,16>--<1363,39>)`;
  public static readonly APPEND_FILE_SYNC: string = `Fun(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/nodejs/fs.js:<1244,21>--<1245,56>)`;
  public static readonly CHMOD_SYNC: string = `Fun(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/nodejs/fs.js:<648,15>--<648,38>)`;
  public static readonly CHOWN_SYNC: string = `Fun(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/nodejs/fs.js:<591,15>--<591,42>)`;
  public static readonly MKDIR_SYNC: string = `Fun(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/nodejs/fs.js:<884,15>--<884,38>)`;
  public static readonly STAT_SYNC: string = `Fun(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/nodejs/fs.js:<742,14>--<742,31>)`;
  public static readonly RENAME_SYNC: string = `Fun(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/nodejs/fs.js:<530,16>--<530,45>)`;
  public static readonly OPEN_SYNC: string = `Fun(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/nodejs/fs.js:<948,14>--<948,44>)`;
  public static readonly EXISTS_SYNC: string = `Fun(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/nodejs/fs.js:<1311,16>--<1311,33>)`;

  // map functions
  public static readonly MAP_es3_1: string = `Fun(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/es/es3.js:<811,22>--<811,82>)`;
  public static readonly MAP_es3_2: string = `Fun(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/es/es3.js:<900,12>--<900,77>)`;
  public static readonly MAP_es6: string = `Fun(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/es/es6.js:<479,27>--<479,87>)`;

  // forEach functions
  public static readonly FOREACH_es3_1: string = `Fun(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/es/es3.js:<776,26>--<776,86>)`;
  public static readonly FOREACH_es3_2: string = `Fun(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/es/es3.js:<867,16>--<867,81>)`;
  public static readonly FOREACH_es6: string = `Fun(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/es/es6.js:<424,31>--<424,91>)`;

  // Promise functions
  public static readonly NEW_PROMISE: string = `Fun(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/es/es6.js:<1105,0>--<1105,55>)`;
  public static readonly PROMISE_THEN: string = `Fun(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/es/es6.js:<1184,25>--<1184,146>)`;
  public static readonly PROMISE_CATCH: string = `Fun(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/es/es6.js:<1192,26>--<1192,79>)`;

  public static get syncFunctions(): Array<string> {
    return [
      ExternsFuncDefinitions.READ_FILE_SYNC,
      ExternsFuncDefinitions.WRITE_FILE_SYNC,
      ExternsFuncDefinitions.READDIR_SYNC,
      ExternsFuncDefinitions.ACCesS_SYNC,
      ExternsFuncDefinitions.APPEND_FILE_SYNC,
      ExternsFuncDefinitions.CHMOD_SYNC,
      ExternsFuncDefinitions.CHOWN_SYNC,
      ExternsFuncDefinitions.MKDIR_SYNC,
      ExternsFuncDefinitions.STAT_SYNC,
      ExternsFuncDefinitions.RENAME_SYNC,
      ExternsFuncDefinitions.OPEN_SYNC,
      // ExternsFuncDefinitions.EXISTS_SYNC
    ];
  }

  public static get forEachFunctions(): Array<string> {
    return [
      ExternsFuncDefinitions.FOREACH_es3_1,
      ExternsFuncDefinitions.FOREACH_es3_2,
      ExternsFuncDefinitions.FOREACH_es6
    ];
  }

  public static get mapFunctions(): Array<string> {
    return [
      ExternsFuncDefinitions.MAP_es3_1,
      ExternsFuncDefinitions.MAP_es3_2,
      ExternsFuncDefinitions.MAP_es6
    ];
  }

  public static get promiseFunctions(): Array<string> {
    return [
      ExternsFuncDefinitions.NEW_PROMISE
    ];
  }

}
