//实现lodash的各个函数
var brightzoe = {
  /**将数组array拆分成多个size长度的区块,并将这些区块组成新数组。如果最后剩余的长度小于size,那么他们组成剩余的区块。
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  chunk: function (array, size = 1) {
    let result = []
    for (let i = 0, j = 0; i < array.length; i += size, j++) {
      result[j] = array.slice(i, i + size)
    }
    return result
  },

  /**将数组中的假值去除，生成一个新数组。假值包括false，null，0，''，undefined和NaN。
   * @param {array} array
   * @return {array}
   */
  compact: function (array) {
    let result = []
    for (let i = 0; i < array.length; i++) {
      if (array[i] != false && array[i] != null && array[i] === array[i]) {
        result.push(array[i])
      }
    }
    return result
  },

  /**创建一个新数组，其中的值为array里面，但在values里面没有出现的值，值的顺序与array一致。
   * @param {array} array
   * @param {...array} [values]//支持多个数组
   * @return {array}
   */
  difference: function (array, values) {
    let value = []
    let result = []
    for (let i = 1; i < arguments.length; i++) { //小池子拼成大池子
      value = value.concat(arguments[i])
    }

    for (ans of array) {
      let flag = 1
      for (let i = 0; i < value.length; i++) {
        if (ans == value[i]) {
          flag = 0
          continue;
        }
      }
      if (flag) {
        result.push(ans)
      }
    }
    return result
  },

  /**
   * @param {array} array
   * @param {...array} [values]
   * @param {function} [iteratee]
   * @return {array}
   */
  differenceBy: function (array, values, iteratee) {

  },

  /**
   * @param {array} array
   * @param {...array} [values]
   * @param {function} [comparator]
   * @return {array}
   */
  differenceWith: function (array, [values], [comparator]) {

  },

  /**把array的前size个元素删去，创建一个数组片段。
   * @param {array} array
   * @param {number} [n]
   * @return {array}
   */
  drop: function (array, n = 1) {
    let result = []
    for (let i = n; i < array.length; i++) {
      result.push(array[i])
    }
    return result
  },

  /**创建一个切片数组，去除array尾部的n个元素。（n默认值为1。）
   * @param {array} array
   * @param {number} [n]
   * @return {array}
   */
  dropRight: function (array, n = 1) {
    if (n == 0) {
      return array
    }
    return array.slice(0, -n) //从右边裁切

  },

  /**创建一个切片数组，去除array中从 predicate 返回假值开始到尾部的部分。predicate 会传入3个参数： (value, index, array)。
   * @param {array} array
   * @param {function} [predicate=_.identity]
   * @return {array}
   */
  dropRightWhile: function () {

  },

  /**创建一个切片数组，去除array中从起点开始到 predicate 返回假值结束部分。predicate 会传入3个参数： (value, index, array)。
   * @param {array} array
   * @param {function} [predicate=_.identity]
   * @return {array}
   */
  dropWhile: function () {

  },

  /**将数组index为start到end的元素全部替换为value。包含start，不包含end。
   * @param {array} array
   * @param {*} value
   * @param {number} [start]
   * @param {number}[end]
   * @return {array}
   */
  fill: function (array, value, start = 0, end = array.length) {
    for (let i = start; i < end; i++) {
      array[i] = value
    }
    return array
  },


  /**该方法返回第一个通过 predicate 判断为真值的元素的索引值（index），而不是元素本身。
   * @param {array} array
   * @param { Array | Function | Object | string} [predicate = _.identity]
   * @return {number}
   */
  findIndex: function () {

  },

  /**这个方式类似 _.findIndex， 区别是它是从右到左的迭代集合array中的元素。
   * @param {array} array
   * @param { Array | Function | Object | string} [predicate = _.identity]
   * @return {number}
   */
  findLastIndex: function () {

  },

  /**减少一级array嵌套深度。
   * 把array[i] 是数组的解放掉，空数组concat(array[i])
   * @param {array} array
   * @return {array}
   */
  flatten: function (array) {
    let res = []
    for (let ans of array) {
      res = res.concat(ans)
    }
    return res
  },

  /**将array递归为一维数组。
   * @param {array} array
   * @return {array}
   */
  flattenDeep: function (array) {
    let res = []
    for (let ans of array) {
      res = res.concat(ans)
    }
    for (let ans of res) {
      //递归，如果里面还有数组就继续减少一级深度。
      if (Array.isArray(ans)) {
        return flattenDeep(res)
      }
    }
    return res

  },

  /**根据 depth 递归减少 array 的嵌套层级
   * @param {array} array
   * @param {number} [depth=1]
   * @return {array}
   */
  flattenDepth: function (array, depth) {
    for (let i = 0; i < depth; i++) {
      //深度是几就减少几次
      let res = []
      for (let ans of array) {
        res = res.concat(ans)
      }
      array = res
    }
    return array
  },

  /**
   * @param {array} pairs
   * @return {object}
   */
  fromPairs: function (pairs) {
    let res = {}
    let key = ''
    for (let i = 0; i < pairs.length; i++) {
      key = pairs[i][0]
      res[key] = pairs[i][1]
    }
    return res
  },

  /**输出数组的第一个元素。
   * @param {array} array
   * @return {*}
   */
  head: function (array) {
    return array[0]
  },

  /**使用 SameValueZero 等值比较，返回首次 value 在数组array中被找到的 索引值， 如果 fromIndex 为负值，将从数组array尾端索引进行匹配。
   * @param {array} array
   * @param {number} value
   * @param {number} [fromIndex = 0]
   * @return {number}
   */
  indexOf: function (array, value, fromIndex = 0) {
    if (fromIndex >= 0) {
      for (let i = fromIndex; i < array.length; i++) {
        if (value == array[i]) {
          return i
        }
      }
      return -1
    } else {
      for (let i = array.length + fromIndex; i >= 0; i--) {
        if (value == array[i]) {
          return i
        }
      }
      return -1
    }

  },


  /**去除数组array中的最后一个元素
   * @param {array} array
   * @return {array}
   */
  initial: function (array) {
    let res = []
    for (let i = 0; i < array.length - 1; i++) {
      res.push(array[i])
    }
    return res
  },

  /**创建一个给定数组的交集的数组。
   * @param {...array} array
   * @return {array}
   */
  intersection: function (array) {
    let res = []
    let flag = 1
    for (let i = 0; i < array[0].length; i++) {
      for (let j = 1; j < array.length; j++) {
        if (!array[j].includes(array[0][i])) {
          flag = 0
          break;
        }
      }
      if (flag) {
        res.push(array[0][i])
      }
    }
    return res
  },

  /**
   * @param {array} array
   * @param {Array|Function|Object|string} [iteratee = _.identity]
   * @return {array}
   */
  intersectionBy: function () {

  },

  /**这个方法类似 _.intersection，区别是它接受一个 comparator 调用比较arrays中的元素。结果值是从第一数组中选择。comparator 会传入两个参数：(arrVal, othVal)。
   * @param {...array} arrays
   * @param {function} comparator
   * @return {array}
   */
  intersectionWith: function (arrays, comparator) {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  join: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  last: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  lastIndexOf: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  nth: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  pull: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  pullAll: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  pullAllBy: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  pullAllWith: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  reverse: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  sortedIndex: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  sortedIndexBy: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  sortedIndexOf: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  sortedLastIndex: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  sortedLastIndexBy: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  sortedLastIndexOf: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  sortedUniq: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  sortedUniqBy: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  tail: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  take: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  takeRight: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  takeRightWhile: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  takeWhile: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  union: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  unionBy: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  unionWith: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  uniq: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  uniqBy: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  uniqWith: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  unzip: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  unzipWith: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  without: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  xor: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  xorBy: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  xorWith: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  zip: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  zipObject: function () {

  },
  /**
   * @param {} 
   * @param {} 
   * @param {} 
   * @return {}
   */
  zipObjectDeep: function () {

  },
  /**
   * @param {} 
   * @param {} 
   * @param {} 
   * @return {}
   */
  zipWith: function () {

  },
  /**
   * @param {} 
   * @param {} 
   * @param {} 
   * @return {}
   */
  countBy: function () {

  },
  /**
   * @param {} 
   * @param {} 
   * @param {} 
   * @return {}
   */
  every: function () {

  },
  /**
   * @param {} 
   * @param {} 
   * @param {} 
   * @return {}
   */
  filter: function () {

  },
  /**返回符合条件的第一个元素。
   * @param {Array|Object}collection
   * @param {function}predicate
   * @param {number}fromIndex
   * @return {*}
   */
  find: function (collection, predicate = _.identity, fromIndex = 0) {

  },
  /**
   * @param {} 
   * @param {} 
   * @param {} 
   * @return {}
   */
  findLast: function () {

  },
  /**
   * @param {} 
   * @param {} 
   * @param {} 
   * @return {}
   */
  flatMap: function () {

  },
  /**
   * @param {array/object} collection
   * @param {function} [predicate=_.identity]
   * @param {number} [fromIndex=0]
   * @return {*}
   */
  flatMapDeep: function () {

  },
  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  flatMapDepth: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  forEach: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  forEachRight: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  groupBy: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  includes: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  invokeMap: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  keyBy: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  map: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  orderBy: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  partition: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  reduce: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  reduceRight: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  reject: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  sample: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  sampleSize: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  shuffle: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  size: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  some: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  sortBy: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  defer: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  delay: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  castArray: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  conformsTo: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  eq: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  gt: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  gte: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  isArguments: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  isArray: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  isArrayBuffer: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  isArrayLike: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  isArrayLikeObject: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  isBoolean: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  isDate: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  isElement: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  isEmpty: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  isEqual: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  isEqualWith: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  isError: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  isFinite: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  isFunction: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  isInteger: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  isLength: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  isMap: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  isMatch: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  isMatchWith: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  isNative: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  isNil: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  isNumber: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  isObject: function () {

  },

  /**
   * @param {object} array
   * @param {} [size]
   * @return {array[][]}
   */
  isObjectLike: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  isPlainObject: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  isRegExp: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  isSafeInteger: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  isSet: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  isString: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  isSymbol: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  isTypedArray: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  isUndefined: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  isWeakMap: function () {

  },

  /**
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  isWeakSet: function () {

  },

  /**判断是不是null。
   * @param {*} value
   * @return {boolean}
   */
  isNull: function (val) {
    if (val === null) {
      return true
    } else {
      return false
    }
  },

  /**判断是不是NaN。
   * @param {*} value
   * @return {boolean}
   */
  isNaN: function (val) {
    if (typeof val == 'object') {
      //对象转换为原始类型:valueOf()和toString()
      if (val.toString() === 'NaN') {
        return true
      }
      return false
    }
    if (val !== val) {
      return true
    } else {
      return false
    }
  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  lt: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  lte: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  toArray: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  toFinite: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  toInteger: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  toLength: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  toNumber: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  assign: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  toSafeInteger: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  add: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  ceil: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  divide: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  floor: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  max: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  maxBy: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  mean: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  meanBy: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  min: function () {

  },
  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  minBy: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  multiply: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  round: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  subtract: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  sum: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  sumBy: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  clamp: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  inRange: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  random: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  assignIn: function () {

  },
  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  at: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  defaults: function () {

  },
  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  defaultsDeep: function () {

  },
  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  findKey: function () {

  },
  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  findLastKey: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  forIn: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  forInRight: function () {

  },


  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  forOwn: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  forOwnRight: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  functions: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  functionsIn: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  get: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  has: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  hasIn: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  invert: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  invertBy: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  invoke: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  keys: function () {

  },


  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  keysIn: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  mapKeys: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  mapValues: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  merge: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  mergeWith: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  omit: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  omitBy: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  pick: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  pickBy: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  result: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  set: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  setWith: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  toPairs: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  toPairsIn: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  transform: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  upset: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  update: function () {

  },


  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  updateWith: function () {

  },


  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  values: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  valuesIn: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  camelCase: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  capitalize: function () {

  },
  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  deburr: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  endsWith: function () {

  },

  /**转义string中的 "&", "<", ">", '"', "'", 和 "`" 字符为HTML实体字符。
   * @param {string} string
   * @return {string}
   */
  escape: function (string) {
    string.replace(/&/g, "&amp;")
    string.replace(/</g, "&lt;")
    string.replace(/>/g, "&gt;")
    string.replace(/"/g, "&quot;")
    string.replace(/'/g, "&apos;")
    string.replace(/`/g, "&grave;")
  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  escapeRegExp: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  kebabCase: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  lowerCase: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  lowerFirst: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  pad: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  padEnd: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  padStart: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  parseInt: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  repeat: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  replace: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  snakeCase: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  split: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  startCase: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  startsWith: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  toLower: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  toUpper: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  trim: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  trimEnd: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  trimStart: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  truncate: function () {

  },

  /**转换string字符串中的 HTML 实体 &amp;, &lt;, &gt;, &quot;, &#39;, 和 &#96; 为对应的字符。
   * @param {string} string
   * @return {string}
   */
  unescape: function (string) {
    string.replace(/&amp;/g, "&")
    string.replace(/&lt;/g, "<")
    string.replace(/&gt;/g, ">")
    string.replace(/&quot;/g, '"')
    string.replace(/&apos;/g, "'")
    string.replace(/&grave;/g, "`")

  },

  /**转换字符串string为 空格 分隔的大写单词
   * @param {string} string
   * @return {string}
   */
  upperCase: function (string) {
    //先全变成大写，字符都用空格替换，然后减少空格为1个
    var str = string.toUpperCase()
    str = str.replace(/[^A-Z]+/g, " ")
    str = str.trim() //去掉首尾空格
    for (let i = 0; i < str.length; i++) { //间隔空格全部变为1个
      if (str[i] == ' ' && str[i + 1] == ' ') {
        str.substr(i + 1, 1)
        i--
      }
    }
    return str
  },

  /**转换字符串string的首字母为大写。
   * @param {string} string
   * @return {string} 
   */
  upperFirst: function (string) {
    //只有一个字符串，只需要改变首字符
    if (string[0].charCodeAt() >= 97 && string[0].charCodeAt() <= 122) {
      let first = String.fromCharCode(string[0].charCodeAt() - 32)
      return first + string.slice(1)
    }
    return string
  },

  /**拆分字符串string中的词为数组.
   * @param {string} string
   * @param {RegExp / string} pattern
   * @return {array} 
   */
  words: function (string, pattern = /\w+/g) {
    return string.match(pattern)
    //指定字符串匹配指定文本内容,返回数组
  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  bindAll: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  defaultTo: function () {

  },

  /**创建一个包含从 start 到 end，但不包含 end 本身范围数字的数组。 如果 start 是负数，而 end 或 step 没有指定:那么 step 为 -1 。 如果 end 没有指定，start 设置为 0。 如果 end 小于 start，会创建一个空数组，除非指定了 step。
   * @param {number} [start = 0]
   * @param {number} end
   * @param {number} [step]
   * @return {array}
   */
  range: function (start, end, step) {
    //输入一位数想要什么结果，输入两位数要什么结果
    if (end == undefined && step == undefined) {
      //只输入一个数，区分正数和负数
      end = start
      start = 0
      if (end > 0) {
        step = 1
      } else {
        step = -1
      }
    }
    if (step == undefined) {
      //只输入两位数
      if (start < end) {
        step = 1
      } else {
        step = -1
      }
    }

    //已经将上面情况全部处理为正常三个数
    if (start == end) {
      return []
    }

    let result = [start]
    let i = 0
    //是增序还是降序
    if (step > 0) {
      while (result[i] + step < end) {
        result.push(result[i] + step)
        i++
      }
    } else if (step < 0) {
      while (result[i] + step > end) {
        result.push(result[i] + step)
        i++
      }
    } else {
      result.length = Math.abs(end - start)
      result.fill(start)
    }

    return result
  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  rangeRight: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  mixin: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  times: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  toPath: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  uniqueId: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  cloneDeep: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  identity: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  concat: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  pullAt: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  matches: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  property: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  ary: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  unary: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  negate: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  once: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  spread: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  curry: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  memoize: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  flip: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  conforms: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  constant: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  flow: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  method: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  methodOf: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  nthArg: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  propertyOf: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  parseJson: function () {

  },

  /**
   * @param {} 
   * @param {} 
   * @return {}
   */
  stringifyJson: function () {

  }
}