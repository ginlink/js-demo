function MyNew(constructor, ...args) {
  const obj = Object.create(constructor.prototype)

  obj.constructor = constructor

  const result = constructor.apply(obj, args)

  console.log('[result]:', result)
  console.log('[obj]:', obj)

  return typeof result == 'object' ? result : obj
}

class Person {
  private name?: string

  constructor(name?: string) {
    this.name = name
  }
}

// function Person(name) {
//   this.name = name
// }

// class is only a candy of function
// so it can be applied, although not be invoked

function main() {
  const person = MyNew(Person, 'John')

  console.log('[person]:', person)
}

main()
