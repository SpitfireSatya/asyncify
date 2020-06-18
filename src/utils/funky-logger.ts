
import { ColorMap } from '../constants/color-map.constant';

export class FunkyLogger {

  private static readonly foreground: {[key: string]: string} = ColorMap.FOREGROUND;
  private static readonly background: {[key: string]: string} = ColorMap.BACKGROUND;

  // A simple javascript solution to bring colors to the console.

  public static color(color: string, text: string): string {
    if (this.foreground[color]) {
      return ('\x1b[' + this.foreground[color] + 'm' + text + '\x1b[' + this.foreground.normal + 'm');
    } else {
      return (text);
    }
  }

  public static bgColor(color: string, text: string): string {
    if (this.background[color]) {
      return ('\x1b[' + this.background[color] + 'm' + text + '\x1b[' + this.background.normal + 'm');
    } else {
      return (text);
    }
  }

}
