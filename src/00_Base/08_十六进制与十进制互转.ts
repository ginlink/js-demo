const mapHex2ten = {
  "0": 0,
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "A": 10,
  "B": 11,
  "C": 12,
  "D": 13,
  "E": 14,
  "F": 15,
}
const mapTen2hex = {
  "0": "0",
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
  "10": "A",
  "11": "B",
  "12": "C",
  "13": "D",
  "14": "E",
  "15": "F",
}

function hex2ten(num) {
  if (!num) return

  let i, tmp = [], res = 0
  for (i = 0;i < num.length;++i) tmp.push(num[i])

  tmp.reverse()
  for (i = 0;i < tmp.length;++i) {
    res += mapHex2ten[tmp[i]] * Math.pow(16, i)
  }

  return res
}
let base = 16
function ten2hex(num) {
  if (typeof num != 'number') return '0x00'

  let tmp = []
  while (true) {
    let mod = num % base
    num = Math.floor(num / base)

    tmp.push(mapTen2hex[mod])

    if (num == 0) break
    // 判断商是否为0
  }

  return tmp.reverse().join('')
}

let hex = 'EA7'
hex = 'FF'
console.log('[hex2ten]:', hex2ten(hex))

let ten = 255
console.log('[ten2hex]:', ten2hex(ten))

hex = 'AAEEE'
console.log('[hex2ten2hex]:', ten2hex(hex2ten(hex)))