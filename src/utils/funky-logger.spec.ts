
import { FunkyLogger } from './funky-logger';
import { expect } from 'chai';

describe('utils', (): void => {
  describe('FunkyLogger', (): void => {

    describe('color', (): void => {

      it('should return the string wrapped in shell colors if color exists in foreground', (): void => {

        const result: string = FunkyLogger.color('red', 'My message');
        expect(result).to.equal('\x1b[31mMy message\x1b[0m');

      });

      it('should return the text if color does not exist', (): void => {

        const result: string = FunkyLogger.color('non-existent color', 'My message');
        expect(result).to.equal('My message');

      });

    });

    describe('bgColor', (): void => {

      it('should return the string wrapped in shell colors if color exists in background', (): void => {

        const result: string = FunkyLogger.bgColor('red', 'My message');
        expect(result).to.equal('\x1b[41mMy message\x1b[0m');

      });

      it('should return the text if color does not exist', (): void => {

        const result: string = FunkyLogger.bgColor('non-existent color', 'My message');
        expect(result).to.equal('My message');

      });

    });

  });
});
