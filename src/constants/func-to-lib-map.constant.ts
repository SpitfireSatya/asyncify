
export class FuncToLibMap {
  public static readonly readFileSync: string = 'fs';
  public static readonly writeFileSync: string = 'fs';
  public static readonly readdirSync: string = 'fs';
  public static readonly accessSync: string = 'fs';
  public static readonly appendFileSync: string = 'fs';
  public static readonly chmodSync: string = 'fs';
  public static readonly chownSync: string = 'fs';
  public static readonly mkdirSync: string = 'fs';
  public static readonly statSync: string = 'fs';
  public static readonly renameSync: string = 'fs';
  public static readonly openSync: string = 'fs';
  public static readonly existsSync: string = 'fs';
  
  public static readonly gzipSync: string = 'zlib';
  public static readonly deflateSync: string = 'zlib';
  public static readonly brotliCompressSync: string = 'zlib';
  
  public static readonly generateKeyPairSync: string = 'crypto';
  public static readonly pbkdf2Sync: string = 'crypto';
  
  public static readonly execSync: string = 'child_process';
}
