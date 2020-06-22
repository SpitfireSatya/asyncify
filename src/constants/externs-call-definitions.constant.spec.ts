
import { ExternsCallDefinitions } from './externs-call-definitions.constant';
import { expect } from 'chai';

describe('constants', (): void => {
  describe('ExternsCallDefinitions', (): void => {

    describe('[getter] callsToForEach', (): void => {

      it('should return an array of externs definitions for calls to forEach', (): void => {

        expect(ExternsCallDefinitions.callsToForEach).to.eql([
          ExternsCallDefinitions.FOREACH_ES3,
          ExternsCallDefinitions.FOREACH_ES6
        ]);

      });

    });

    describe('[getter] callsToMap', (): void => {

      it('should return an array of externs definitions for calls to map', (): void => {

        expect(ExternsCallDefinitions.callsToMap).to.eql([
          ExternsCallDefinitions.MAP_ES3,
          ExternsCallDefinitions.MAP_ES6
        ]);

      });

    });

    describe('[getter] callsToNewPromise', (): void => {

      it('should return an array of externs definitions for calls to Promise', (): void => {

        expect(ExternsCallDefinitions.callsToNewPromise).to.eql([
          ExternsCallDefinitions.NEW_PROMISE
        ]);

      });

    });

    describe('[getter] validExternsCalls', (): void => {

      it('should return an array of externs definitions for calls valid for transformation', (): void => {

        expect(ExternsCallDefinitions.validExternsCalls).to.eql([
          ExternsCallDefinitions.NEW_PROMISE,
          ExternsCallDefinitions.FOREACH_ES3,
          ExternsCallDefinitions.FOREACH_ES6,
          ExternsCallDefinitions.MAP_ES3,
          ExternsCallDefinitions.MAP_ES6,
        ]);

      });

    });

  });
});
