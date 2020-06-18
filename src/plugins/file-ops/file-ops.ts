
import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'csv-parser';
import { ICallgraphEdge } from '../../interfaces/callgraph-edge.interface';

export class FileOps {

  public static readFile(filePath: string): Promise<string> {
    if (!fs.existsSync(filePath)) {
      return Promise.reject(new Error('File not found'));
    }
    return fs.promises.readFile(filePath, 'utf8');
  }

  public static readCSVFile(filePath: string, lineNoCorrection: boolean = false): Promise<Array<ICallgraphEdge>> {
    console.log('Reading file: ', filePath);
    return new Promise((resolve: any, reject: any): void => {
      const csvResults: Array<ICallgraphEdge> = [];

      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data: ICallgraphEdge): void => {
          if (lineNoCorrection) {
            data.sourceNode = FileOps.correctLineNo(data.sourceNode);
            data.targetNode = FileOps.correctLineNo(data.targetNode);
          }
          csvResults.push(data);
        })
        .on('end', (): void => {
          resolve(csvResults);
        })
        .on('error', (error: Error): void => {
          reject(error);
        });
    });
  }

  public static writeFile(filePath: string, data: string): Promise<any> {
    return fs.promises.writeFile(filePath, data, 'utf8');
  }

  public static generateFileList(filePath: string): Promise<Array<string>> {

    return new Promise(async (resolve: any, reject: any): Promise<any> => {

      if (!fs.existsSync(filePath)) {
        return reject(new Error('File not found'));
      }

      const fileList: Array<string> = [];

      async function findJSFilesInDirectory(fileName: string): Promise<any> {
        const promises: Array<Promise<any>> = [];
        const stat: fs.Stats = await fs.promises.stat(fileName);
        if (stat.isDirectory()) {
          const files: Array<string> = await fs.promises.readdir(fileName);
          files.forEach(async (file: string): Promise<void> => {
            promises.push(findJSFilesInDirectory(path.resolve(fileName, file)));
          });
          return Promise.all(promises)
            .catch((e: Error): void => reject(e));
        } else {
          if (fileName.endsWith('.js')) {
            fileList.push(fileName);
          }
          return Promise.resolve();
        }

      }

      await findJSFilesInDirectory(filePath);
      return resolve(fileList);

    });
  }

  // tslint:disable-next-line: max-line-length
  // `Fun(${filePath}:<${astNode[key].loc.start.line},${astNode[key].loc.start.column}>--<${astNode[key].loc.end.line},${astNode[key].loc.end.column}>)`
  // tslint:disable-next-line: max-line-length
  // `Callee(${filePath}:<${astNode[key].loc.start.line},${astNode[key].loc.start.column}>--<${astNode[key].loc.end.line},${astNode[key].loc.end.column}>)`
  private static correctLineNo(element: string): string {
    const start: number = element.indexOf(',') + 1;
    const stop: number = element.indexOf('>');
    const col: string = element.substring(start, stop);
    const newElement: string = [element.slice(0, start), (Number(col) - 1), element.slice(stop)].join('');
    return newElement;
  }

}
