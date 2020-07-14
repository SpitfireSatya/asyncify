
import { Store } from '../store/store';
import { FileOps } from '../file-ops/file-ops';
import { BabelParser } from '../parsers-and-generators/babel-parser';
import { EventEmitter } from 'events';
import * as babelTypes from '@babel/types';
import { ASTUtils } from '../../utils/ast-utils';


export class Events {

  private static _event: EventEmitter = new EventEmitter();
  private static _pending: Array<string> = [];
  private static _notifyWhenReady: boolean = false;

  public static initialize = (): void => {
    Events.registerEvents();
    /* istanbul ignore next */
    Events.registerEvents = (): void => { /* Prevent reregistration of events */ };
  }

  public static register = (eventName: string, callback: (...args: any[]) => void): void => {
    Events._event.on(eventName, callback);
  }

  public static dispatch = (eventName: string, data: any | Array<any>): void => {
    Events._event.emit(eventName, data);
  }

  private static registerEvents = (): void => {
    Events._event.on('notify-when-ready', Events._notifyWhenReadyCallback);
    Events._event.on('fetch-file', Events._fetchFileCallback);
    Events._event.on('fetch-file-complete', Events._fetchFileCompleteCallback);
    Events._event.on('check-pending', Events._checkPendingCallback);
  }

  private static _notifyWhenReadyCallback = (): void => {
    Events._notifyWhenReady = true;
    if (Events._pending.length === 0) {
      Events._event.emit('ready');
    }
  }

  private static _fetchFileCallback = async (fileName: string): Promise<void> => {

    if (fileName.indexOf('codeql-home') === -1 && Store.getFileList().indexOf(fileName) === -1) {

      Store.addFile(fileName);
      Events._pending.push(fileName);

      const contents: string = await FileOps.readFile(fileName);
      Store.setFileContents(fileName, contents);

      const ast: babelTypes.File = BabelParser.generateAST(contents, {}, fileName);
      Store.setAST(fileName, ast);

      ASTUtils.cacheASTNodes(ast, fileName);

      Events._event.emit('fetch-file-complete', fileName);

    }

  }

  private static _fetchFileCompleteCallback = (fileName: string): void => {
    Events._pending.splice(Events._pending.indexOf(fileName), 1);
    Events._event.emit('check-pending');
  }

  private static _checkPendingCallback = (): void => {
    if (Events._notifyWhenReady && Events._pending.length === 0) {
      Events._event.emit('ready');
    }
  }

}

Events.initialize();
