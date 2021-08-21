/**
 * 代理模式适用于对原对象扩展功能的场景
 */


function main17() {
  interface Animal{
    name: string
  }
  interface Dog extends Animal {
  }
  interface Cat extends Animal {
  }

  interface SpeakProxy{
    speak: ()=>void
  }

  const dog: Dog = {name: '小花'}
  const cat: Cat = {name: '小花花时间东风科技'}

  const speakProxy = <T>(target: T): T & SpeakProxy => {
    return {
      ...target, 
      speak(){
        const that = this as Animal
        console.log('[我会说话了！]:', that.name)
      }
    }
  }

  const proxyDog = speakProxy(dog)
  const proxyCat = speakProxy(cat)

  proxyDog.speak()
  proxyCat.speak()
}
main17()