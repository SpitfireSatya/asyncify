
import { ExternsFuncDefinitions } from './externs-func-definitions';

export class SyncToExternsMap {

  public static readonly READ_FILE_SYNC: string = ExternsFuncDefinitions.READ_FILE_SYNC;
  public static readonly WRITE_FILE_SYNC: string = ExternsFuncDefinitions.READ_FILE_SYNC;

  public static getAll(): Array<string> {
    return [
      SyncToExternsMap.READ_FILE_SYNC,
      SyncToExternsMap.WRITE_FILE_SYNC
    ];
  }

}
