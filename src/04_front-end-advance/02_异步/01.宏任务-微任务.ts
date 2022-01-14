foo()

new Promise((resolve) => {
  console.log(1)
})

console.log(2)

async function foo() {
  console.log(0)

  await Promise.resolve().then((_) => console.log(4))

  console.log(3)
}
