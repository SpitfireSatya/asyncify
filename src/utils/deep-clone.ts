
export class DeepClone {

  public static clone<T>(obj: T): T {

    // return value is input is not an Object or Array.
    if (typeof(obj) !== 'object' || obj === null) {
      return obj;
    }

    let clone: any;

    if (Array.isArray(obj)) {
      clone = obj.slice();  // unlink Array reference.
    } else {
      clone = Object.assign({}, obj); // Unlink Object reference.
    }

    const keys: Array<any> = Object.keys(clone);

    for (let i: number = 0; i < keys.length; i++) {
      clone[keys[i]] = this.clone(clone[keys[i]]); // recursively unlink reference to nested objects.
    }

    return clone; // return unlinked clone.

  }

}
