
import { DeepClone } from './deep-clone';
import { expect } from 'chai';


describe('utils', (): void => {
  describe('DeepClone', (): void => {

    const innerObject: Object = { a: 1, b: 2};
    const innerArray: Array<number> = [1, 2, 3];
    const mockObject: Object = { innerObject, innerArray };

    it('should return the input if it is null', (): void => {
      const result: any = DeepClone.clone(null);
      expect(result).to.equal(null);
    });

    it('should return the input if it is a number', (): void => {
      const result: any = DeepClone.clone(1);
      expect(result).to.equal(1);
    });

    it('should return the input if it is a string', (): void => {
      const result: any = DeepClone.clone('abc');
      expect(result).to.equal('abc');
    });

    it('should return the input if it is a boolean', (): void => {
      const result: any = DeepClone.clone(true);
      expect(result).to.equal(true);
    });

    it('should return a new instance if input is an object', (): void => {
      const result: any = DeepClone.clone(innerObject);
      expect(result).to.not.equal(innerObject);
      expect(result).to.eql(innerObject);
    });

    it('should return a new instance if input is an array', (): void => {
      const result: any = DeepClone.clone(innerArray);
      expect(result).to.not.equal(innerArray);
      expect(result).to.eql(innerArray);
    });

    it('should recursively unlink references of an object', (): void => {
      const result: any = DeepClone.clone(mockObject);
      expect(result.innerObject).to.not.equal(innerObject);
      expect(result.innerArray).to.not.equal(innerArray);
      expect(result).to.not.equal(mockObject);
      expect(result).to.eql(mockObject);
    });

  });
});
