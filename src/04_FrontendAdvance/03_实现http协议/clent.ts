import * as net from 'net'

type RequestOptions = {
  method?: string
  url?: string
  headers?: Record<any, any>
  body?: any
}

enum HeaderStatus {
  WAITING_STATUS_LINE = 0,
  WAITING_STATUS_LINE_END,
  WAITING_HEADER_NAME,
  WAITING_HEADER_VALUE,
  WAITING_HEADER_LINE_END,
  WAITING_HEADER_BLOCK_END,
  WAITING_BODY,
}

enum BodyStatus {
  WAITING_LENGTH = 0,
  WAITING_LENGTH_LINE_END,
  READING_TRUNK,
}

class ResponseParser {
  current = HeaderStatus.WAITING_STATUS_LINE
  statusLine = ''
  headers: {
    [key: string]: string
  } = {}
  headerName = ''
  headerValue = ''
  trunkedParser = new TrunkedParser()

  receive(str: string) {
    const len = str.length
    for (let i = 0; i < len; ++i) {
      this.receiveChar(str.charAt(i))
    }

    console.log('[](statusLine):', this.statusLine)
    console.log('[](headers):', this.headers)
    console.log('[](body):', this.trunkedParser.body)
  }

  receiveChar(char: string) {
    // parse status line
    if (this.current == HeaderStatus.WAITING_STATUS_LINE) {
      if (char === '\r') {
        // next
        this.current = HeaderStatus.WAITING_HEADER_LINE_END
      } else {
        this.statusLine += char
      }
    } else if (this.current == HeaderStatus.WAITING_STATUS_LINE_END) {
      // skip \n
      this.current = HeaderStatus.WAITING_HEADER_NAME
    } else if (this.current == HeaderStatus.WAITING_HEADER_NAME) {
      if (char === ':') {
        this.current = HeaderStatus.WAITING_HEADER_VALUE

        // TODO应该增加一个SPACE（空格）状态
      } else if (char === '\r') {
        this.current = HeaderStatus.WAITING_HEADER_BLOCK_END
      } else {
        this.headerName += char
      }
    } else if (this.current == HeaderStatus.WAITING_HEADER_VALUE) {
      if (char === '\r') {
        this.headers[this.headerName] = this.headerValue.trim()

        // reset and next
        this.headerName = ''
        this.headerValue = ''
        this.current = HeaderStatus.WAITING_HEADER_LINE_END
      } else {
        this.headerValue += char
      }
    } else if (this.current == HeaderStatus.WAITING_HEADER_LINE_END) {
      this.current = HeaderStatus.WAITING_HEADER_NAME
    } else if (this.current == HeaderStatus.WAITING_HEADER_BLOCK_END) {
      this.current = HeaderStatus.WAITING_BODY
    } else if (this.current == HeaderStatus.WAITING_BODY) {
      this.trunkedParser.receiveChar(char)
    }
  }
}

class TrunkedParser {
  body = ''
  current = BodyStatus.WAITING_LENGTH
  length = 0
  isFinished = false

  constructor() {}

  receiveChar(char: string) {
    if (this.current === BodyStatus.WAITING_LENGTH) {
      if (char === '\r') {
        this.current = BodyStatus.WAITING_LENGTH_LINE_END
      } else {
        const pos0 = char.codePointAt(0) as number
        const pos1 = '0'.codePointAt(0) as number

        this.length *= 10
        this.length += pos0 - pos1
      }
    } else if (this.current === BodyStatus.WAITING_LENGTH_LINE_END) {
      this.current = BodyStatus.READING_TRUNK
    } else if (this.current === BodyStatus.READING_TRUNK) {
      if (this.length === 0) {
        this.current = BodyStatus.WAITING_LENGTH
      }

      --this.length
      this.body += char
    }
  }
}

class Response {
  statusCode = 0
  statusMsg = ''
  headers: Record<any, any> = {}
  body?: any

  constructor() {}

  receive(data: string) {
    this.body = data

    return this
  }
}

class Request {
  method?: string
  url?: string
  headers?: Record<any, any>
  body?: any

  constructor({ method, url, headers, body }: RequestOptions) {
    this.method = method || 'GET'
    this.url = url || '/'
    this.headers = headers || {}
    this.body = body || ''
  }

  send() {
    return new Promise<ResponseParser>((resolve, reject) => {
      const client = net.connect(
        {
          host: '127.0.0.1',
          port: 8088,
        },
        () => {
          console.log('[]:')

          const line = `${this.method} ${this.url} HTTP/1.1`
          const body = this.body

          let headerStr = ''
          for (const key in this.headers) {
            const value = this.headers[key]
            headerStr += `${key}: ${value}\r\n`
          }

          const header = `${headerStr}Content-Length: ${body.length}`

          const data = `${line}\r\n${header}\r\n\r\n${body}`
          // console.log('[request](data):', data)

          client.write(data)
        }
      )

      // const response = new Response()
      const parser = new ResponseParser()

      client.on('data', (data) => {
        // console.log('[request](data):', data.toString())
        // response.receive(data.toString())
        parser.receive(data.toString())

        client.end()
      })
      client.on('end', () => {
        resolve(parser)
      })
    })
  }
}

export class HttpClient {
  constructor() {
    throw new Error('please use createHttp for creating instance!')
  }

  static createHttp(options?: RequestOptions) {
    const request = new Request(options || {})
    return request
  }

  test() {
    console.log('[]test:')
  }
}
