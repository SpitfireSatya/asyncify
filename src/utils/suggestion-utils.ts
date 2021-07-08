
import * as path from 'path';
import * as fs from 'fs';
import * as handlebars from 'handlebars';
import { ITransformationDetail } from '../interfaces/transformation-detail.interface';
import { FunkyLogger } from './funky-logger';
import { template } from '../templates/suggestions.template';

export class SuggestionUtils {
    
  public static generateHtmlReport(data: { statistics: any, suggestions: { [key: string]: Array<ITransformationDetail>} }): Promise<void> {

    console.info(FunkyLogger.color('cyan', 'Writing suggestions to file'));

    const compiledTemplate = handlebars.compile(template, {});
    const html = compiledTemplate(data);

    return fs.promises.writeFile('./suggested-transformations.html', html, 'utf8')
    .then(() => {
      console.info(FunkyLogger.color('green', 'Suggestions written to file'));
    });


  }
}