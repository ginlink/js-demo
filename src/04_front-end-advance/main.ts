import { HttpClient } from './03_实现http协议/clent'
import { parseHttpResponse } from './03_有限状态机'
import { runFsmWithAb } from './03_有限状态机/parse-ab'

// adjust whether include 'ab'
// console.log('[](runFsm):', runFsmWithAb('12a3bc'))

// implement a http client
// const client = new HttpClient()
// client.test()
const client = HttpClient.createHttp({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: 'I am a tiny msg!',
})

client.send().then((res) => {
  // console.log('[](res):', res)
})

// parse http status
// const httpResponse = ''
// console.log('[]（parseHttpResponse:', parseHttpResponse())
