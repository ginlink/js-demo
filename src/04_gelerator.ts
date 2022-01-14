function* g(fn) {
  yield 123;
  yield 123;
  yield fn();
}

const aaa = g(()=>console.log('[]:', 123))
function start() {
  aaa.next()
}

// var aaa = g(() => {
//   console.log('123')
// })

start()
start()
start()