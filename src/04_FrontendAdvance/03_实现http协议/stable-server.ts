// import * as net from 'net'
import * as http from 'http'

// Create a local server to receive data from
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  // res.end(
  //   JSON.stringify({
  //     data: 'Hello World!',
  //   })
  // )

  req.on('data', (chunk: Buffer) => {
    console.log('[response](data):', chunk.toString())
  })

  res.write('hello')
  res.end()
})

server.listen(8088)
