
import { Global } from './global.constant';

export class ExternsCallDefinitions {

  public static readonly FS_STAT: string = `Callee(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/nodejs/fs.js:<722,50>--<722,60>)`;
  public static readonly FS_RENAME: string = `Callee(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/nodejs/fs.js:<523,64>--<523,74>)`;
  public static readonly FS_READSTREAM_ON: string = `Callee(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/nodejs/fs.js:<1371,53>--<1371,63>)`;
  public static readonly FS_WRITESTREAM_ON: string = `Callee(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/nodejs/fs.js:<1379,54>--<1379,64>)`;
  public static readonly FS_READDIR: string = `Callee(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/nodejs/fs.js:<904,53>--<904,63>)`;
  public static readonly FS_READFILE: string = `Callee(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/nodejs/fs.js:<1125,68>--<1125,78>)`;
  public static readonly FS_WRITEFILE: string = `Callee(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/nodejs/fs.js:<1186,74>--<1186,84>)`;
  public static readonly FS_CHMOD: string = `Callee(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/nodejs/fs.js:<633,57>--<633,67>)`;
  public static readonly FS_CHOWN: string = `Callee(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/nodejs/fs.js:<641,57>--<641,67>)`;
  public static readonly FS_MKDIR: string = `Callee(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/nodejs/fs.js:<854,51>--<854,61>)`;
  public static readonly FS_OPEN: string = `Callee(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/nodejs/fs.js:<931,58>--<931,67>)`;
  public static readonly FS_ACCESS: string = `Callee(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/nodejs/fs.js:<1348,52>--<1348,62>)`;
  public static readonly FS_APPENDFILE: string = `Callee(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/nodejs/fs.js:<1237,67>--<1237,76>)`;

  // call to map()
  public static readonly MAP_ES3: string = `Callee(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/es/es3.js:<811,69>--<811,79>)`;
  public static readonly MAP_ES6: string = `Callee(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/es/es6.js:<479,74>--<479,84>)`;

  // call to forEach()
  public static readonly FOREACH_ES3: string = `Callee(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/es/es3.js:<776,73>--<776,83>)`;
  public static readonly FOREACH_ES6: string = `Callee(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/es/es6.js:<424,78>--<424,88>)`;

  // callS to Promise
  public static readonly NEW_PROMISE: string = `Callee(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/es/es6.js:<1105,42>--<1105,52>)`;
  public static readonly PROMISE_THEN_1: string = `Callee(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/es/es6.js:<1184,89>--<1184,106>)`;
  public static readonly PROMISE_THEN_2: string = `Callee(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/es/es6.js:<1093,91>--<1093,108>)`;
  public static readonly PROMISE_CATCH: string = `Callee(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/es/es6.js:<1192,64>--<1192,76>)`;

  public static readonly NET_SERVER_LISTEN_1: string = `Callee(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/nodejs/net.js:<308,88>--<308,107>)`;
  public static readonly NET_SERVER_LISTEN_2: string = `Callee(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/nodejs/net.js:<323,88>--<323,107>)`;
  public static readonly NET_SERVER_LISTEN_3: string = `Callee(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/nodejs/net.js:<338,90>--<338,109>)`;
  public static readonly NET_SERVER_LISTEN_4: string = `Callee(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/nodejs/net.js:<345,91>--<345,110>)`;

  public static readonly HTTP_GET: string = `Callee(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/nodejs/http.js:<614,54>--<614,64>)`;
  public static readonly HTTPS_GET: string = `Callee(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/nodejs/https.js:<244,55>--<244,65>)`;
  public static readonly HTTP_SET_TIMEOUT: string = `Callee(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/nodejs/http.js:<118,76>--<118,86>)`;

  // call to process
  public static readonly PROCESS_NEXT_TICK: string = `Callee(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/nodejs/globals.js:<989,76>--<989,86>)`;

  // call to jest
  public static readonly JEST_DESCRIBE: string = `Callee(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/lib/jest.js:<38,30>--<38,34>)`;
  public static readonly JEST_IT: string = `Callee(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/lib/jest.js:<53,33>--<53,37>)`;
  public static readonly JEST_BEFORE: string = `Callee(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/lib/jest.js:<32,31>--<32,35>)`;
  public static readonly JEST_BEFORE_EACH: string = `Callee(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/lib/jest.js:<36,35>--<36,39>)`;
  public static readonly JEST_BEFORE_ALL: string = `Callee(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/lib/jest.js:<34,34>--<34,38>)`;
  public static readonly JEST_AFTER: string = `Callee(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/lib/jest.js:<26,30>--<26,34>)`;
  public static readonly JEST_AFTER_EACH: string = `Callee(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/lib/jest.js:<30,34>--<30,38>)`;
  public static readonly JEST_AFTER_ALL: string = `Callee(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/lib/jest.js:<28,33>--<28,37>)`;
  public static readonly JEST_FN: string = `Callee(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/lib/jest.js:<167,34>--<167,50>)`;
  public static readonly JEST_MOCK_IMPLEMENTATION_ONCE: string = `Callee(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/lib/jest.js:<135,41>--<135,46>)`;

  // call to express
  public static readonly EXPRESS_LISTEN: string = `Callee(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/nodejs/express.js:<9,61>--<9,65>)`;
  public static readonly EXPRESS_GET: string = `Callee(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/nodejs/express.js:<11,52>--<11,56>)`;
  public static readonly EXPRESS_POST: string = `Callee(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/nodejs/express.js:<13,53>--<13,57>)`;
  public static readonly EXPRESS_PUT: string = `Callee(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/nodejs/express.js:<15,53>--<15,56>)`;
  public static readonly EXPRESS_DELETE: string = `Callee(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/nodejs/express.js:<17,56>--<17,59>)`;
  public static readonly EXPRESS_PATCH: string = `Callee(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/nodejs/express.js:<19,55>--<19,58>)`;  

  // call to zlib
  public static readonly ZLIB_GZIP: string = `Callee(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/nodejs/zlib.js:<194,51>--<194,61>)`;
  public static readonly ZLIB_DEFLATE: string = `Callee(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/nodejs/zlib.js:<166,54>--<166,64>)`;
  public static readonly ZLIB_BROTLICOMPRESS: string = `Callee(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/nodejs/zlib.js:<426,61>--<426,71>)`;

  // call to child_process
  public static readonly CP_EXEC: string = `Callee(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/nodejs/child_process.js:<228,64>--<228,74>)`;

  // call to crypto
  public static readonly CRYPTO_PBKDF2: string = `Callee(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/nodejs/crypto.js:<610,16>--<610,107>)`;
  public static readonly CRYPTO_GENERATE_KEY_PAIR: string = `Callee(${Global.HOME_DIR}/codeql-home/codeql/javascript/tools/data/externs/nodejs/crypto.js:<979,75>--<979,84>)`;

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

  public static get callsToPromise(): Array<string> {
    return [
      ExternsCallDefinitions.NEW_PROMISE,
      ExternsCallDefinitions.PROMISE_THEN_1,
      ExternsCallDefinitions.PROMISE_THEN_2,
      ExternsCallDefinitions.PROMISE_CATCH,
      ExternsCallDefinitions.HTTP_GET,
      ExternsCallDefinitions.HTTPS_GET,
      ExternsCallDefinitions.HTTP_SET_TIMEOUT
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

  public static get callsToExpressMethods(): Array<string> {
    return [
      ExternsCallDefinitions.EXPRESS_LISTEN,
      ExternsCallDefinitions.EXPRESS_GET,
      ExternsCallDefinitions.EXPRESS_POST,
      ExternsCallDefinitions.EXPRESS_PUT,
      ExternsCallDefinitions.EXPRESS_DELETE,
      ExternsCallDefinitions.EXPRESS_PATCH
    ];
  }

  public static get callsToFSMethods(): Array<string> {
    return [
      ExternsCallDefinitions.FS_STAT,
      ExternsCallDefinitions.FS_RENAME,
      ExternsCallDefinitions.FS_READSTREAM_ON,
      ExternsCallDefinitions.FS_WRITESTREAM_ON,
      ExternsCallDefinitions.FS_READDIR,
      ExternsCallDefinitions.FS_READFILE,
      ExternsCallDefinitions.FS_WRITEFILE,
      ExternsCallDefinitions.FS_READFILE,
      ExternsCallDefinitions.FS_WRITEFILE,
      ExternsCallDefinitions.FS_CHMOD,
      ExternsCallDefinitions.FS_CHOWN,
      ExternsCallDefinitions.FS_MKDIR,
      ExternsCallDefinitions.FS_OPEN,
      ExternsCallDefinitions.FS_ACCESS,
      ExternsCallDefinitions.FS_APPENDFILE
    ];
  }

  public static get callsToZlibMethods(): Array<string> {
    return [
      ExternsCallDefinitions.ZLIB_GZIP,
      ExternsCallDefinitions.ZLIB_DEFLATE
    ];
  }

  public static get callsToCPMethods(): Array<string> {
    return [
      ExternsCallDefinitions.CP_EXEC
    ];
  }

  public static get callsToCryptoMethods(): Array<string> {
    return [
      ExternsCallDefinitions.CRYPTO_PBKDF2
    ];
  }

  public static get validExternsCalls(): Array<string> {
    return [
      ...ExternsCallDefinitions.callsToFSMethods,
      ...ExternsCallDefinitions.callsToExpressMethods,
      ...ExternsCallDefinitions.callsToZlibMethods,
      ...ExternsCallDefinitions.callsToCPMethods,
      ...ExternsCallDefinitions.callsToCryptoMethods,
      ExternsCallDefinitions.NEW_PROMISE,
      ExternsCallDefinitions.PROMISE_THEN_1,
      ExternsCallDefinitions.PROMISE_THEN_2,
      ExternsCallDefinitions.PROMISE_CATCH,
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
      ExternsCallDefinitions.JEST_BEFORE,
      ExternsCallDefinitions.HTTP_GET,
      ExternsCallDefinitions.HTTPS_GET,
      ExternsCallDefinitions.HTTP_SET_TIMEOUT
    ];
  }

}
