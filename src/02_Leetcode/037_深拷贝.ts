// deepclone
function cloneDeep1(value) {
  return JSON.parse(JSON.stringify(value))
}

const arrayTag = '[object Array]'
const boolTag = '[object Boolean]'
const dateTag = '[object Date]'
const errorTag = '[object Error]'
const mapTag = '[object Map]'
const numberTag = '[object Number]'
const objectTag = '[object Object]'
const regexpTag = '[object RegExp]'
const setTag = '[object Set]'
const stringTag = '[object String]'
const symbolTag = '[object Symbol]'
const weakMapTag = '[object WeakMap]'

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function getTag(value) {
  if (value == null) {
    return value === undefined ? '[object Undefined]' : '[object Null]'
  }
  return Object.prototype.toString.call(value)
}

function isObject(value) {
  const type = typeof value
  return value != null && (type === 'object' || type === 'function')
}
function isArray(value) {
  return Array.isArray(value)
}

function cloneDeep2(value) {
  // regard null as not object
  if (!isObject(value)) {
    return value
  }

  if (isArray(value)) {
    return value.map((x) => {
      return cloneDeep2(x)
    })
  } else {
    const tag = getTag(value)

    if (tag == regexpTag) {
      return new RegExp(value)
    } else if (tag == dateTag) {
      return new Date(value)
    } else if (tag == errorTag) {
      return new Error(value)
    } else if (tag == mapTag) {
      const newMap = new Map()
      value.forEach((subValue, key) => {
        newMap.set(key, cloneDeep2(subValue))
      })

      return newMap
    } else if (tag == setTag) {
      const newSet = new Set()
      value.forEach((subValue) => {
        newSet.add(cloneDeep2(subValue))
      })

      return newSet
    } else {
      return Object.keys(value).reduce((memo, key) => {
        memo[key] = cloneDeep2(value[key])

        return memo
      }, {})
    }
  }
}

// cloneDeep1()

function main() {
  const map = new Map()
  const set = new Set()
  map.set('name', 'John')
  map.set('name1', 'John1')
  set.add('John1')
  set.add('John2')

  const obj = {
    name: 'John',
    arg1: undefined,
    arg2: null,
    arg3: /123/,
    arg4: () => {},
    arg5: map,
    arg6: set,
    arg7: new Error('123'),
    arg8: new Date(),
  }
  const obj2 = cloneDeep1(obj)
  const obj3 = cloneDeep2(obj)

  const arr = [obj]
  const arr2 = cloneDeep1(arr)
  const arr3 = cloneDeep2(arr)

  // console.log('[obj]:', obj)
  // console.log('[obj2]:', obj2)
  // console.log('[obj3]:', obj3)

  console.log('[arr]:', arr)
  console.log('[arr2]:', arr2)
  console.log('[arr3]:', arr3)
}

main()
