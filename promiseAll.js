var p1 = new Promise((resolve, reject) => {
  setTimeout((param) => {
    console.log(param);
    resolve(param);
  }, 1000, 'un')
});
var p2 = new Promise((resolve, reject) => {
  setTimeout((param) => {
    console.log(param);
    resolve(param);
  }, 2000, 'deux')
});
var p3 = new Promise((resolve, reject) => {
  setTimeout((param) => {
    console.log(param);
    resolve(param);
  }, 3000, 'trois')
});
var p4 = new Promise((resolve, reject) => {
  setTimeout((param) => {
    console.log(param);
    resolve(param);
  }, 4000, '4')
});
var p5 = new Promise((resolve, reject) => {
  reject('CRASH 5');
});

Promise
  .all([p1,p2,p3,p4,p5])
  .then((values) => {
    console.log("all then", values);
  })
  .catch((reason) => {
    console.log("all catch", reason)
  });
