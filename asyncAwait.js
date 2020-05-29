var p1 = new Promise((resolve, reject) => {
  setTimeout((param) => {
    console.log(param);
    resolve(param);
  }, 1000, 'un')
});

async function testAsyn() {
  await p1
  console.log('on a passer le await');
}

testAsyn();