
import { expect } from 'chai';
import { ExternsFuncDefinitions } from './externs-func-definitions';

describe('constants', (): void => {
  describe('ExternsFuncDefinitions', (): void => {

    describe('[getter] syncFunctions', (): void => {

      it('should return an array of externs definitions for calls valid for transformation', (): void => {

        expect(ExternsFuncDefinitions.syncFunctions).to.eql([
          ExternsFuncDefinitions.READ_FILE_SYNC,
          ExternsFuncDefinitions.WRITE_FILE_SYNC
        ]);

      });

    });

    describe('[getter] forEachFunctions', (): void => {

      it('should return an array of externs definitions for calls to forEach', (): void => {

        expect(ExternsFuncDefinitions.forEachFunctions).to.eql([
          ExternsFuncDefinitions.FOREACH_ES3_1,
          ExternsFuncDefinitions.FOREACH_ES3_2,
          ExternsFuncDefinitions.FOREACH_ES6
        ]);

      });

    });

    describe('[getter] mapFunctions', (): void => {

      it('should return an array of externs definitions for calls to map', (): void => {

        expect(ExternsFuncDefinitions.mapFunctions).to.eql([
          ExternsFuncDefinitions.MAP_ES3_1,
          ExternsFuncDefinitions.MAP_ES3_2,
          ExternsFuncDefinitions.MAP_ES6
        ]);

      });

    });

    describe('[getter] promiseFunctions', (): void => {

      it('should return an array of externs definitions for calls to Promise', (): void => {

        expect(ExternsFuncDefinitions.promiseFunctions).to.eql([
          ExternsFuncDefinitions.NEW_PROMISE
        ]);

      });

    });

  });
});
