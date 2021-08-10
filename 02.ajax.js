
function ajax() {
  let httpRequest;
  if (window.XMLHttpRequest) {
    httpRequest = new XMLHttpRequest()
  } else {
    console.log('出错了，请升级您的浏览器，目前版本不支持发送HTTP请求！')
  }
  function makeRequest() {
    httpRequest.onreadystatechange = resHandler
    httpRequest.onerror = function (e) {
      console.log('[出错了-onerror]:', e)
    }
    httpRequest.open('GET', 'http://www.baidu.com', true)
    // 请求方法必须大写，第三参数标识是否异步
    httpRequest.send()
  }

  function resHandler() {
    console.log('[readyState]:', httpRequest.readyState)
    if (httpRequest.readyState === XMLHttpRequest.DONE) { // 或者===4
      if (httpRequest.status === 200) {
        console.log('收到服务器响应数据')
        console.log('[返回为字符串]:', httpRequest.responseText)

      } else {
        console.log('出错！', httpRequest.status)
      }
    }
  }

  makeRequest()
}
// ajax()

// 复习
// 2021-6-27 20:13:21
function ajaxR() {
  (function () {
    let xhr;

    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest()
      let url = 'http://localhost:3000'
      // let url = 'http://192.168.77.1:3000'

      xhr.onreadystatechange = handler
      xhr.open('GET', url, true)
      xhr.send()
    }
    function handler(res) {
      console.log('[res]:', res)
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          console.log('[res]:', xhr)
          console.log('[]:', xhr.responseText)
        }
      }
    }
  })()
}
// ajaxR()

// 用promise封装一下
let url = 'http://localhost:3000'
asyncAjax('GET', url).then(res => {
  console.log('[res]:', res)
  console.log('[res]:', res)

  if (res.readyState == 4 && res.status == 200) {
    console.log('[text]:', res.readyState)
    console.log('[text]:', res.responseURL)
  }
})

function asyncAjax(method, url, data = null) {
  return new Promise((re, rj) => {
    if (window.XMLHttpRequest) {
      const xhr = new XMLHttpRequest()
      xhr.onreadystatechange = (e) => {
        if (xhr.readyState == 4) re(xhr)
      }
      xhr.onerror = rj
      xhr.open(method, url, true)

      data ? xhr.send(data) : xhr.send()
    }
  })

}
