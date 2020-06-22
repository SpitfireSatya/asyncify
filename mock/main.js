(async function () {
  const sync = require('./sync');

  const arr1 = [1, 2, 3];

  for (const [arrayIteratorIndex] of arr1.entries()) {
    await sync.doNotConvert1();
  }

  await Promise.all(arr1.map(async () => {
    await sync.doNotConvert2();
  }));
  const obj = {
    get someProp() {
      sync.doNotConvert3();
      return '';
    }

  };

  async function test() {
    await sync.convert1();
  }

  await test();
  await sync.convert2();
  const x = obj.someProp;
})();