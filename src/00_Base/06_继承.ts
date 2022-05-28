/**
 * 原型继承和class继承
 */

// 原型继承
function protoExtends() {
  function Super() {}
  Super.prototype.print = function (val) {
    console.log('[]:', val)
  }

  function Sub() {}
  Sub.prototype = Object.create(Super.prototype, {
    constructor: {
      value: Sub,
      // 改变新创建类的constructor，因为新创建的对象con为Super
      // 联想：prototype和constructor相反

      writeable: true,
      enumerable: true,
      configurable: true,
    },
  })
  // Sub.constructor = Sub

  const sub = new Sub()

  sub.print(11111)
  console.log('[]:', sub)
}

// class继承
function classExtends() {
  class Super {
    print(val) {
      console.log('[]:', val)
    }
  }

  class Sub extends Super {}

  const sub = new Sub()
  sub.print(123)
  console.log('[]:', sub)
}
classExtends()
