(async function () {
  const sync = require('./sync');

  const arr1 = [1, 2, 3];
  arr1.forEach(() => {
    sync.doNotConvert1();
  });
  await Promise.all(arr1.map(async () => {
    await sync.doNotConvert2();
  }));
  const obj = {
    get someProp() {
      return async function () {
        await sync.doNotConvert3();
        return '';
      }();
    }

  };

  async function test() {
    await sync.convert1();
  }

  await test();
  await sync.convert2();
  const x = await obj.someProp;
})();