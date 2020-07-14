
const sync = require('./sync');

const arr1 = [1, 2, 3];

arr1.forEach(() => {
  sync.doNotConvert1();
});

arr1.map(() => {
  sync.doNotConvert2();
});

const obj = {
  get someProp() {
    sync.doNotConvert3();
    return '';
  }
}

function test() {
  sync.convert1();
}

test();
sync.convert2();
const x = obj.someProp;
