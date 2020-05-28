new Promise(function(resolve, reject) {
  setTimeout( function() {
    resolve(1), 1000
  })
})
.then(function(result) {
  console.log(result, "1er niveau"); // 1
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(result * 2), 2000);
  })
})
.then(function(result) {
  console.log(result, "2ème niveau"); //2
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(result * 2), 500);
  })
})
.then(function(result) {
  console.log(result, "3ème niveau"); //4
  result = undef;
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(result * 2), 6000);
    console.log(result, "4ème niveau"); //4
  })
})
.catch((e) => {
  console.log("Error caught: ", e);
})