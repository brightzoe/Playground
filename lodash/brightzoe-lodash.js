//实现lodash的各个函数
var brightzoe = {
  /**将数组array拆分成多个size长度的区块,并将这些区块组成新数组。如果最后剩余的长度小于size,那么他们组成剩余的区块。
   * @param {array} array
   * @param {} [size]
   * @return {array[][]}
   */
  chunk: function (array, size = 1) {
    let result = [];
    for (let i = 0, j = 0; i < array.length; i += size, j++) {
      result[j] = array.slice(i, i + size);
    }
    return result;
  },

  /**将数组中的假值去除，生成一个新数组。假值包括false，null，0，''，undefined和NaN。
   * @param {array} array
   * @return {array}
   */
  compact: function (array) {
    let result = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i] != false && array[i] != null && array[i] === array[i]) {
        result.push(array[i]);
      }
    }
    return result;
  },

  /**创建一个新数组，其中的值为array里面，但在values里面没有出现的值，值的顺序与array一致。
   * @param {array} array
   * @param {...array} [values]//支持多个数组
   * @return {array}
   */
  difference: function (array, ...values) {
    let value = [];
    let result = [];
    for (let i = 1; i < arguments.length; i++) {
      //小池子拼成大池子
      value = value.concat(arguments[i]);
    }

    for (ans of array) {
      let flag = 1;
      for (let i = 0; i < value.length; i++) {
        if (ans == value[i]) {
          flag = 0;
          continue;
        }
      }
      if (flag) {
        result.push(ans);
      }
    }
    return result;
  },

  /**
   * @param {array} array
   * @param {...array} [values]
   * @param {function} [iteratee]
   * @return {array}
   */
  differenceBy: function (array, ...values) {
    if (arguments.length <= 2) {
      return this.difference(array, ...values);
    }
    var value = [];
    var iteratee = this.identity(values[values.length - 1]);
    for (let i = 1; i < arguments.length - 1; i++) {
      //小池子拼成大池子
      value = value.concat(arguments[i]);
    }
    value = value.map((item) => iteratee(item));
    var result = [];
    for (let ary of array) {
      if (!value.includes(iteratee(ary))) {
        result.push(ary);
      }
    }

    return result;
  },

  /**
   * @param {array} array
   * @param {...array} [values]
   * @param {function} [comparator]
   * @return {array}
   */
  differenceWith: function (array, values, comparator) {
    //array里面object，深对比是否一致
    //isequal
    var result = [];
    for (let ary of array) {
      for (let val of values) {
        if (comparator(ary, val)) {
          continue;
        }
      }
      result.push(ary);
    }
    return result;
  },

  /**把array的前size个元素删去，创建一个数组片段。
   * @param {array} array
   * @param {number} [n]
   * @return {array}
   */
  drop: function (array, n = 1) {
    let result = [];
    for (let i = n; i < array.length; i++) {
      result.push(array[i]);
    }
    return result;
  },

  /**创建一个切片数组，去除array尾部的n个元素。（n默认值为1。）
   * @param {array} array
   * @param {number} [n]
   * @return {array}
   */
  dropRight: function (array, n = 1) {
    if (n == 0) {
      return array;
    }
    return array.slice(0, -n); //从右边裁切
  },

  /**创建一个切片数组，去除array中从 predicate 返回假值开始到尾部的部分。predicate 会传入3个参数： (value, index, array)。
   * @param {array} array
   * @param {function} [predicate=_.identity]
   * @return {array}
   */
  dropRightWhile: function (array, predicate) {
    for (let i = array.length - 1; i >= 0; i--) {
      if (predicate(array[i], i, array)) {
        array.pop();
      } else {
        return array;
      }
    }
  },

  /**创建一个切片数组，去除array中从起点开始到 predicate 返回假值结束部分。predicate 会传入3个参数： (value, index, array)。
   * @param {array} array
   * @param {function} [predicate=_.identity]
   * @return {array}
   */
  dropWhile: function (array, predicate) {
    for (let i = 0; i < array.length; i++) {
      if (predicate(array[i], i, array)) {
        array.shift();
        i--;
      } else {
        return array;
      }
    }
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
      array[i] = value;
    }
    return array;
  },

  /**该方法返回第一个通过 predicate 判断为真值的元素的索引值（index），而不是元素本身。
   * @param {array} array
   * @param {Function} [predicate = _.identity]
   * @return {number}
   */
  findIndex: function (array, predicate) {
    for (let i = 0; i < collection.length; i++) {
      if (predicate(collection[i], i, collection)) {
        return i;
      }
    }
    return -1;
  },

  /**这个方式类似 _.findIndex， 区别是它是从右到左的迭代集合array中的元素。
   * @param {array} array
   * @param { function} [predicate = _.identity]
   * @return {number}
   */
  findLastIndex: function (array, predicate) {
    for (let i = array.length - 1; i >= 0; i++) {
      if (predicate(collection[i], i, collection)) {
        return i;
      }
    }
    return -1;
  },

  /**减少一级array嵌套深度。
   * 把array[i] 是数组的解放掉，空数组concat(array[i])
   * @param {array} array
   * @return {array}
   */
  flatten: function (array) {
    let res = [];
    for (let ans of array) {
      res = res.concat(ans);
    }
    return res;
  },

  /**将array递归为一维数组。
   * @param {array} array
   * @return {array}
   */
  flattenDeep: function flattenDeep(array) {
    let res = [];
    for (let ans of array) {
      res = res.concat(ans);
    }
    for (let ans of res) {
      //递归，如果里面还有数组就继续减少一级深度。
      if (Array.isArray(ans)) {
        return flattenDeep(res);
      }
    }
    return res;
  },

  /**根据 depth 递归减少 array 的嵌套层级
   * @param {array} array
   * @param {number} [depth=1]
   * @return {array}
   */
  flattenDepth: function (array, depth) {
    for (let i = 0; i < depth; i++) {
      //深度是几就减少几次
      let res = [];
      for (let ans of array) {
        res = res.concat(ans);
      }
      array = res;
    }
    return array;
  },

  /**
   * @param {array} pairs
   * @return {object}
   */
  fromPairs: function (pairs) {
    let res = {};
    let key = "";
    for (let i = 0; i < pairs.length; i++) {
      key = pairs[i][0];
      res[key] = pairs[i][1];
    }
    return res;
  },

  /**输出数组的第一个元素。
   * @param {array} array
   * @return {*}
   */
  head: function (array) {
    return array[0];
  },

  /**使用 SameValueZero 等值比较，返回首次 value 在数组array中被找到的 索引值， 如果 fromIndex 为负值，将从数组array尾端索引进行匹配。
   * @param {array} array
   * @param {number} value
   * @param {number} [fromIndex = 0]
   * @return {number}
   */
  indexOf: function (array, value, fromIndex = 0) {
    for (let i = fromIndex; i < array.length; i++) {
      if (value == array[i] || (value !== value && array[i] !== array[i])) {
        return i;
      }
    }
    return -1;
  },

  /**去除数组array中的最后一个元素
   * @param {array} array
   * @return {array}
   */
  initial: function (array) {
    let res = [];
    for (let i = 0; i < array.length - 1; i++) {
      res.push(array[i]);
    }
    return res;
  },

  /**创建一个给定数组的交集的数组。
   * @param {...array} array
   * @return {array}
   */
  intersection: function (...array) {
    let res = [];
    let flag = 1;
    for (let i = 0; i < array[0].length; i++) {
      for (let j = 1; j < array.length; j++) {
        if (!array[j].includes(array[0][i])) {
          flag = 0;
          break;
        }
      }
      if (flag) {
        res.push(array[0][i]);
      }
    }
    return res;
  },

  /**
   * @param {array} array
   * @param {Array|Function|Object|string} [iteratee = _.identity]
   * @return {array}
   */
  //TODO:
  intersectionBy: function () {},

  /**这个方法类似 _.intersection，区别是它接受一个 comparator 调用比较arrays中的元素。结果值是从第一数组中选择。comparator 会传入两个参数：(arrVal, othVal)。
   * @param {...array} arrays
   * @param {function} comparator
   * @return {array}
   */
  intersectionWith: function () {},

  /**将 array 中的所有元素转换为由 separator 分隔的字符串。
   * @param {array} array
   * @param {string} separator
   * @return {string}
   */
  join: function (array, separator = ",") {
    let res = "";
    for (let i = 0; i < array.length - 1; i++) {
      res = res + array[i] + separator;
    }
    res += array[array.length - 1];
    return res;
  },

  /**获取array中的最后一个元素。
   * @param {array} array
   * @return {*}
   */
  last: function (array) {
    // if (array.length == 0) {
    //   return undefined
    // }不需要
    return array[array.length - 1];
  },

  /**这个方法类似 _.indexOf ，区别是它是从右到左遍历array的元素。
   * @param {array} array
   * @param {*} value
   * @param {number} fromIndex
   * @return {number}
   */
  lastIndexOf: function (array, value, fromIndex = array.length - 1) {
    for (let i = fromIndex; i >= 0; i--) {
      if (value == array[i] || (value !== value && array[i] !== array[i])) {
        return i;
      }
    }
    return -1;
  },

  /**获取array数组的第n个元素。如果n为负数，则返回从数组结尾开始的第n个元素.
   * @param {array} array
   * @param {number} [n]
   * @return {*}
   */
  nth: function (array, n = 0) {
    if (n < 0) {
      return array[array.length + n];
    }
    return array[n];
  },

  /**移除数组array中所有和给定值相等的元素，使用 SameValueZero 进行全等比较。
   * @param {array} array
   * @param {...*} [values]
   * @return {array}
   */
  pull: function (array, ...values) {
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < values.length; j++) {
        if (
          array[i] == values[j] ||
          (array[i] !== array[i] && values[j] !== values[j])
        ) {
          array.splice(i, 1);
          i--;
        }
      }
    }
    return array;
  },

  pullAll: function (array, values) {
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < values.length; j++) {
        if (
          array[i] == values[j] ||
          (array[i] !== array[i] && values[j] !== values[j])
        ) {
          array.splice(i, 1);
          i--;
        }
      }
    }
    return array;
  },

  pullAllBy: function () {},

  pullAllWith: function () {},

  reverse: function (array) {
    //双指针
    for (let i = 0, j = array.length - 1; i < j; i++, j--) {
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  },

  sortedIndex: function (array, value) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] >= value) {
        return i;
      }
    }
    return array.length;
  },

  sortedIndexBy: function () {},

  sortedIndexOf: function (array, value) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] == value || (array[i] !== array[i] && value !== value)) {
        return i;
      }
    }
  },

  sortedLastIndex: function (array, value) {
    for (let i = array.length - 1; i > 0; i--) {
      if (array[i] <= array) {
        return i + 1;
      }
    }
    return 0;
  },

  sortedLastIndexBy: function () {},

  //从右边开始，返回第一个遇到的索引
  sortedLastIndexOf: function (array, value) {
    for (let i = array.length - 1; i > 0; i--) {
      if (array[i] == value || (array[i] !== array[i] && value !== value)) {
        return i;
      }
    }
    return -1;
  },

  //这个和uniq只是输入的数组的区别吗？？
  sortedUniq: function (array) {
    for (let i = 0; i < array.length; i++) {
      for (let j = i + 1; j < array.length; j++) {
        if (
          array[i] === array[j] ||
          (array[i] !== array[i] && array[j] !== array[j])
        ) {
          array.splice(j, 1);
        }
      }
    }
    return array;
  },

  sortedUniqBy: function () {},

  tail: function (array) {
    let res = [];
    for (let i = 1; i < array.length; i++) {
      res.push(array[i]);
    }
    return res;
  },

  take: function (array, n = 1) {
    if (n >= array.length) {
      return array;
    }
    let res = [];
    let i = 0;
    while (i < n) {
      res.push(array[i]);
      i++;
    }
    return res;
  },

  takeRight: function (array, n = 1) {
    if (n >= array.length) {
      return array;
    }
    let res = [];
    let i = array.length - 1;
    let count = 0;
    while (count < n) {
      res.unshift(array[i]);
      i--;
      count++;
    }
    return res;
  },

  takeRightWhile: function () {},

  takeWhile: function () {},

  union: function (...array) {
    for (let i = 1; i < array.length; i++) {
      for (let j = 0; j < array[i].length; j++) {
        if (!array[0].includes(array[i][j])) {
          array[0].push(array[i][j]);
        }
      }
    }
    return array[0];
  },

  unionBy: function () {},

  unionWith: function () {},

  //去重
  uniq: function (array) {
    for (let i = 0; i < array.length; i++) {
      for (let j = i + 1; j < array.length; j++) {
        if (
          array[i] === array[j] ||
          (array[i] !== array[i] && array[j] !== array[j])
        ) {
          array.splice(j, 1);
        }
      }
    }
    return array;
  },

  uniqBy: function () {},

  uniqWith: function () {},

  unzip: function (array) {
    let res = [];
    for (let i = 0; i < array[0].length; i++) {
      res[i] = [];
      for (let j = 0; j < array.length; j++) {
        res[i][j] = array[j][i];
      }
    }
    return res;
  },

  unzipWith: function () {},

  without: function (array, ...values) {
    let res = [];
    for (let ans of array) {
      if (!values.includes(ans)) {
        res.push(ans);
      }
    }
    return res;
  },

  //求并集
  xor: function (...arrays) {
    let ary = [];
    for (let ans of arrays) {
      ary = ary.concat(ans);
    }
    for (let i = 0; i < ary.length; i++) {
      for (let j = i + 1; j < ary.length; j++) {
        if (ary[i] == ary[j]) {
          ary.splice(i, 1);
          ary.splice(j - 1, 1);
          i--;
          j--;
        }
      }
    }
    return ary;
  },

  xorBy: function () {},

  xorWith: function () {},

  zip: function (...arrays) {
    //二维数组的声明
    let res = [];
    for (let i = 0; i < arrays[0].length; i++) {
      res[i] = [];
      for (let j = 0; j < arrays.length; j++) {
        res[i][j] = arrays[j][i];
      }
    }
    return res;
  },

  zipObject: function (props = [], values = []) {
    var res = {};
    for (let i = 0; i < props.length; i++) {
      res[props[i]] = values[i];
    }
    return res;
  },

  zipObjectDeep: function () {},

  zipWith: function () {},

  countBy: function () {},

  every: function (collection, predicate = this.identity) {
    if (this.isArray(collection)) {
      collection.reduce((pre, acc) => {
        return pre && predicate(acc);//短路，都为true
      }, true);
    } else if (this.isObject(collection)) {
      for (let key in collection) {
        if (!predicate(collection[key], key, collection)) {
          return false
        }
      }
      return true
    }
  },

  filter: function (array, predicate = this.identity) {
    let test = iteratee(predicate);
    var result = [];
    for (let i = 0; i < array.length; i++) {
      if (test(array[i], i, array)) {
        result.push(array[i]);
      }
    }
    return result;
  },

  //返回符合条件的第一个元素。
  find: function (collection, predicate, fromIndex = 0) {
    //未写findIndex
    if (isArray(collection)) {
      for (let i = 0; i < collection.length; i++) {
        if (predicate(collection[i], i, collection)) {
          return collection[i];
        }
      }
    } else {
      for (let col of collection) {
        if (predicate(collection[col], col, collection)) {
          return col;
        }
      }
    }
  },

  findLast: function (
    collection,
    predicate,
    fromIndex = collection.length - 1
  ) {
    //未写findIndex,obj没有从右向左
    if (isArray(collection)) {
      for (let i = collection.length - 1; i >= 0; i--) {
        if (predicate(collection[i], i, collection)) {
          return collection[i];
        }
      }
    } else {
      for (let col of collection) {
        if (predicate(collection[col], col, collection)) {
          return col;
        }
      }
    }
  },

  flatMap: function () {},

  flatMapDeep: function () {},

  flatMapDepth: function () {},

  forEach: function (collection, iteratee) {
    if (Array.isArray(collection)) {
      for (let i = 0; i < collection.length; i++) {
        iteratee(collection[i]);
      }
    } else {
      for (item in collection) {
        iteratee(item);
      }
    }
  },

  forEachRight: function () {},

  groupBy: function (collection, iteratee) {
    var result = {};
  },

  includes: function (collection, value, fromIndex = 0) {
    fromIndex = fromIndex >= 0 ? fromIndex : collection.length + fromIndex;
    if (typeof collection == "object") {
      //变成只有属性值的数组
      collection = Object.values(collection);
    }
    for (let i = fromIndex; i < collection.length; i++) {
      if (
        value == collection[i] ||
        value == collection.slice(i, i + value.length)
      ) {
        return true;
      }
    }
    return false;
  },

  invokeMap: function () {},

  keyBy: function () {},

  map: function () {},

  orderBy: function () {},

  partition: function () {},

  reduce: function () {},

  reduceRight: function () {},

  reject: function () {},

  sample: function () {
    //random
  },

  sampleSize: function () {},

  shuffle: function () {},

  size: function (collection) {
    if (typeof collection == "object") {
      return Object.keys(collection).length;
    } else {
      return collection.length;
    }
  },

  some: function () {},

  sortBy: function () {},

  defer: function () {},

  delay: function () {},

  castArray: function (value) {
    //如何判断没有输入参数还是参数是undefined
    //用arguments.length
    if (!arguments.length) {
      return [];
    }
    if (typeof value == "array") {
      return value;
    }

    return [value];
  },

  conformsTo: function () {},

  eq: function (value, other) {
    if (value !== value && other !== other) {
      return true;
    }
    return value === other;
  },

  gt: function (value, other) {
    return value > other;
  },

  gte: function (value, other) {
    return value >= other;
  },

  isArguments: function () {},

  isArray: function (value) {
    return Array.isArray(value);
  },

  isArrayBuffer: function () {},

  isArrayLike: function () {},

  isArrayLikeObject: function () {},

  isBoolean: function (value) {
    return typeof value === "boolean";
  },

  isDate: function () {},

  isElement: function () {},

  isEmpty: function () {},

  isEqual: function (value, other) {
    //深对比
    if (value === other) {
      //基本类型直接比较
      return true;
    }
    if (typeof value !== typeof other) {
      //类型不等则肯定不等
      return false;
    }

    if (this.isNaN(value) && this.isNaN(other)) {
      //NaN
      return true;
    }
    if (value.length !== other.length) {
      return false;
    }
    if (this.isArray(value)) {
      //array
      if (this.isArray(object)) {
        for (let i = 0; i < value.length; i++) {
          if (!this.isEqual(value[i], other[i])) {
            return false;
          }
        }
        return true;
      }
      return false;
    }
    if (this.isObject(value) && this.isObject(other) && !this.isArray(other)) {
      //object
      for (let key in value) {
        if (!this.isEqual(value[key], other[key])) {
          return false;
        }
      }
      return true;
    }
    return false;
  },
  isEqualWith: function (value, other, customizer = undefined) {
    customizer = typeof customizer == "function" ? customizer : undefined;
    if (this.isUndefined(customizer)) {
      return this.isEqual(value, other);
    } else {
      return customizer(value, other);
    }
  },

  isError: function () {},

  isFinite: function () {},

  isFunction: function (value) {
    return typeof value === "function";
  },

  isInteger: function () {},

  isLength: function () {},

  isMap: function () {},

  /**
   * obj是否符合src的条件
   * @param {*} obj
   * @param {*} src
   */
  isMatch: function (obj, src) {
    for (let key in src) {
      if (obj[key] !== src[key]) {
        return false;
      }
    }
    return true;
  },

  isMatchWith: function (obj, src, customizer = undefined) {
    customizer = typeof customizer == "function" ? customizer : undefined;
    if (this.isUndefined(customizer)) {
      return this.isMatch(obj, src);
    } else {
      return customizer(obj, src);
    }
  },

  isNative: function () {},

  isNil: function (value) {
    if (value === null || value === undefined) {
      return true;
    }
    return false;
  },

  isNumber: function (value) {
    return typeof value === "number";
  },

  isObject: function (value) {
    if (value === null) {
      return false;
    }
    return typeof value === "object";
  },

  isObjectLike: function () {},

  isPlainObject: function () {},

  isRegExp: function () {},

  isSafeInteger: function () {},

  isSet: function () {},

  isString: function (value) {
    return typeof value === "string";
  },

  isSymbol: function () {},

  isTypedArray: function () {},

  isUndefined: function (value) {
    return value === undefined;
  },

  isWeakMap: function () {},

  isWeakSet: function () {},

  /**判断是不是null。
   * @param {*} value
   * @return {boolean}
   */
  isNull: function (val) {
    if (val === null) {
      return true;
    } else {
      return false;
    }
  },

  /**判断是不是NaN。
   * @param {*} value
   * @return {boolean}
   */
  isNaN: function (val) {
    if (typeof val == "object") {
      //对象转换为原始类型:valueOf()和toString()
      if (val.toString() === "NaN") {
        return true;
      }
      return false;
    }
    if (val !== val) {
      return true;
    } else {
      return false;
    }
  },

  lt: function (value, other) {
    return value < other;
  },

  lte: function (value, other) {
    return value <= other;
  },

  toArray: function (value) {
    if (value == undefined) {
      //null&&undefined
      return [];
    }
    if (typeof value == "object") {
      return Object.values(value);
    } else if (typeof value == "array") {
      return value;
    } else if (typeof value == "string") {
      let res = [];
      for (let str of value) {
        res.push(str);
      }
      return res;
    } else {
      return [];
    }
  },

  toFinite: function () {},

  toInteger: function () {},

  toLength: function () {},

  toNumber: function () {},

  assign: function () {},

  toSafeInteger: function () {},

  add: function (augend, addend) {
    return augend + addend;
  },

  ceil: function (number, precision = 0) {
    // p = -1 number = number - number % 10 + 10
    // p = 0 number = number - number % 1 + 1
    // p = 1 number = number - number % 0.1 + 0.1
    let exp = 10 ** -precision;
    return number - (number % exp) + exp;
  },

  divide: function (dividend, divisor) {
    return dividend / divisor;
  },

  floor: function (number, precision = 0) {
    let exp = 10 ** -precision;
    return number - (number % exp);
  },

  max: function (array) {
    let max = array[0];
    for (let i = 0; i < array.length; i++) {
      max = max > array[i] ? max : array[i];
    }
    return max;
  },

  maxBy: function () {},

  mean: function (array) {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
      sum += array[i];
    }
    return sum / array.length;
  },

  meanBy: function () {},

  min: function (array) {
    let min = array[0];
    for (let i = 0; i < array.length; i++) {
      mean = mean < array[i] ? mean : array[i];
    }
    return min;
  },

  minBy: function () {},

  multiply: function (multiplier, multiplicand) {
    return multiplicand * multiplier;
  },

  round: function (number, precision = 0) {
    let exp = 10 ** -precision;
    if (number - this.floor(number, precision) < 0.5 * exp) {
      return this.floor(number, precision);
    }
    return this.ceil(number, precision);
  },

  subtract: function (minuend, subtrahend) {
    return minuend - subtrahend;
  },

  sum: function (array) {
    let sum = 0;
    for (let ary of array) {
      sum += ary;
    }
    return sum;
  },

  sumBy: function () {},

  clamp: function () {},

  inRange: function (number, start = 0, end) {
    if (end == undefined) {
      end = start;
      start = 0;
    }
    if (start > end) {
      let temp = start;
      start = end;
      end = temp;
    }
    return number >= start && number < end;
  },

  random: function () {},

  assignIn: function () {},

  at: function (object, paths) {
    let res = [];
    for (let i = 0; i < paths.length; i++) {
      // res.push(object[path[i]])
    }
    return res;
  },

  defaults: function (object, ...sources) {
    let source = {};
    for (let i in sources) {
      //对象合并
      Object.assign(source, sources[i]);
    }
    let array = Object.keys(source);
    for (let ary of array) {
      if (ary in object == false) {
        object[ary] = source[ary];
      }
    }
    return object;
  },

  defaultsDeep: function () {},

  findKey: function () {},

  findLastKey: function () {},

  forIn: function () {},

  forInRight: function () {},

  forOwn: function () {},

  forOwnRight: function () {},

  functions: function () {},

  functionsIn: function () {},

  get: function (obj, prop) {
    return obj[prop];
  },

  has: function () {},

  hasIn: function () {},

  invert: function (object) {
    let res = {};
    let array = Object.values(object);
    let array2 = Object.keys(object);
    for (let i = 0; i < array.length; i++) {
      res[array[i]] = array2[i];
    }
    return res;
  },

  invertBy: function () {},

  invoke: function () {},

  keys: function () {},

  keysIn: function () {},

  mapKeys: function () {},

  mapValues: function () {},

  merge: function () {},

  mergeWith: function () {},

  omit: function () {},

  omitBy: function () {},

  pick: function (object, props) {
    let res = {};
    for (let prop of props) {
      res[prop] = object[prop];
    }
    return res;
  },

  pickBy: function () {},

  result: function () {},

  set: function () {},

  setWith: function () {},

  toPairs: function () {},

  toPairsIn: function () {},

  transform: function () {},

  unset: function () {},

  update: function () {},

  updateWith: function () {},

  values: function (object) {
    //要去掉不可枚举的
    let obj = Object(object);
    let ary = [];
    for (let keys in obj) {
      if (obj.hasOwnProperty(keys)) {
        ary.push(obj[keys]);
      }
    }

    return ary;
  },

  valuesIn: function (object) {
    let obj = Object(object);
    let ary = [];
    for (let keys in obj) {
      ary.push(obj[keys]);
    }
    return ary;
  },

  camelCase: function (string = "") {
    string = string.replace(/[^a-zA-Z]/g, " "); //非字母变成空格
    let str = string.trim(); //前后空格去掉
    str = str.toLowerCase();
    for (let i = 0; i < str.length; i++) {
      if (str[i] == " " && str[i + 1].charCodeAt(0) >= 97) {
        str =
          str.slice(0, i) +
          str[i + 1].toUpperCase() +
          str.slice(i + 2, str.length);
      }
    }
    str.replace("/ /g", "");
    return str;
  },

  capitalize: function (string = "") {
    string = string.toUpperCase();
    string = string.slice(0, 1) + string.slice(1, string.length).toLowerCase();
    return string;
  },

  deburr: function () {},

  endsWith: function (string = "", target, position = string.length) {
    if (string[position - 1] == target) {
      return true;
    }
    return false;
  },

  /**转义string中的 "&", "<", ">", '"', "'", 和 "`" 字符为HTML实体字符。
   * @param {string} string
   * @return {string}
   */
  escape: function (string) {
    string.replace(/&/g, "&amp;");
    string.replace(/</g, "&lt;");
    string.replace(/>/g, "&gt;");
    string.replace(/"/g, "&quot;");
    string.replace(/'/g, "&apos;");
    string.replace(/`/g, "&grave;");
  },

  escapeRegExp: function () {},

  kebabCase: function (string = "") {
    string = string.replace(/[^a-zA-Z]/g, " ");
    string = string.trim().toLowerCase();
    string = string.replace(/ +/g, "-");
    return string;
  },

  lowerCase: function (string = "") {
    if (/[^a-zA-Z]/.exec(string) == null) {
      for (var i = 1; i < string.length; i++) {
        if (string[i].charCodeAt(0) <= 90 && string[i].charCodeAt(0) >= 65) {
          var string =
            string.slice(0, i) +
            " " +
            string.slice(i, i + 1).toLowerCase() +
            string.slice(i + 1, string.length);
        }
      }
    }

    string = string.replace(/[^a-zA-Z]+/g, " ");
    string = string.trim().toLowerCase();
    return string;
  },

  lowerFirst: function (string = "") {
    var str = string[0].toLowerCase() + string.slice(1, string.length);
    return str;
  },

  pad: function (string = "", length = 0, chars = " ") {
    while (true) {
      if (string.length < length) {
        string += chars;
      } else {
        break;
      }
      if (string.length < length) {
        string = chars + string;
      } else {
        break;
      }
    }
    return string.slice(0, length);
  },

  padEnd: function (string = "", length = 0, chars = " ") {
    while (string.length < length) {
      string += chars;
    }
    return string.slice(0, length);
  },

  padStart: function (string = "", length = 0, chars = " ") {
    var char = "";
    for (var i = chars.length - 1; i >= 0; i--) {
      char += chars[i];
    }
    while (string.length < length) {
      string = char + string;
    }
    return string.slice(string.length - length, string.length);
  },

  parseInt: function (string, radix = 10) {
    var num = +string;
    return num.toString(radix);
  },

  repeat: function (string = "", n) {
    var res = "";
    for (var i = 0; i < n; i++) {
      res += str;
    }
    return res;
  },

  replace: function (string = "", pattern, replacement) {},

  snakeCase: function () {},

  split: function () {},

  startCase: function () {},

  startsWith: function () {},

  toLower: function () {},

  toUpper: function () {},

  trim: function () {},

  trimEnd: function () {},

  trimStart: function () {},

  truncate: function () {},

  /**转换string字符串中的 HTML 实体 &amp;, &lt;, &gt;, &quot;, &#39;, 和 &#96; 为对应的字符。
   * @param {string} string
   * @return {string}
   */
  unescape: function (string) {
    string.replace(/&amp;/g, "&");
    string.replace(/&lt;/g, "<");
    string.replace(/&gt;/g, ">");
    string.replace(/&quot;/g, '"');
    string.replace(/&apos;/g, "'");
    string.replace(/&grave;/g, "`");
  },

  /**转换字符串string为 空格 分隔的大写单词
   * @param {string} string
   * @return {string}
   */
  upperCase: function (string) {
    //先全变成大写，字符都用空格替换，然后减少空格为1个
    var str = string.toUpperCase();
    str = str.replace(/[^A-Z]+/g, " ");
    str = str.trim(); //去掉首尾空格
    for (let i = 0; i < str.length; i++) {
      //间隔空格全部变为1个
      if (str[i] == " " && str[i + 1] == " ") {
        str.substr(i + 1, 1);
        i--;
      }
    }
    return str;
  },

  /**转换字符串string的首字母为大写。
   * @param {string} string
   * @return {string}
   */
  upperFirst: function (string) {
    //只有一个字符串，只需要改变首字符
    if (string[0].charCodeAt() >= 97 && string[0].charCodeAt() <= 122) {
      let first = String.fromCharCode(string[0].charCodeAt() - 32);
      return first + string.slice(1);
    }
    return string;
  },

  /**拆分字符串string中的词为数组.
   * @param {string} string
   * @param {RegExp / string} pattern
   * @return {array}
   */
  words: function (string, pattern = /\w+/g) {
    return string.match(pattern);
    //指定字符串匹配指定文本内容,返回数组
  },

  bindAll: function () {},

  defaultTo: function () {},

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
      end = start;
      start = 0;
      if (end > 0) {
        step = 1;
      } else {
        step = -1;
      }
    }
    if (step == undefined) {
      //只输入两位数
      if (start < end) {
        step = 1;
      } else {
        step = -1;
      }
    }

    //已经将上面情况全部处理为正常三个数
    if (start == end) {
      return [];
    }

    let result = [start];
    let i = 0;
    //是增序还是降序
    if (step > 0) {
      while (result[i] + step < end) {
        result.push(result[i] + step);
        i++;
      }
    } else if (step < 0) {
      while (result[i] + step > end) {
        result.push(result[i] + step);
        i++;
      }
    } else {
      result.length = Math.abs(end - start);
      result.fill(start);
    }

    return result;
  },

  rangeRight: function () {},

  mixin: function () {},

  times: function () {},

  toPath: function () {},

  uniqueId: function () {},

  cloneDeep: function () {},
  /**
   * 返回接收的首个参数。
   * @param  {...any} args
   */
  identity: function (...args) {
    return args[0];
  },

  concat: function () {},

  pullAt: function () {},

  property: function (prop) {
    return this.get.bind(null, _, prop);
  },
  /**
   * 调用的函数最多传n个参数
   * @param {*} func
   * @param {*} n
   */
  ary: function (func, n = func.length) {
    return function (...args) {
      return func(...args.slice(0, n));
    };
  },
  /**
   * 调用的函数只接一个参数。
   * @param {*} func
   */
  unary: function (func) {
    return func(this.identity(...args));
  },

  negate: function () {},

  once: function () {},
  /**
   * 返回可以接受数组的原函数
   * @param {*} func
   */
  spread: function (func) {
    return function (ary) {
      return func(...ary);
    };
  },

  /**
   * 返回可以分开接受参数的原函数
   * @param {*} func
   * @param {*} arity
   */
  curry: function (func, arity = func.length) {
    return function (...args) {
      while (args.length < arity) {
        return curry(func.bind(null, ...args), arity - args.length);
      }
      return func(...args);
    };
  },

  memoize: function () {},

  /**返回参数反转接收的原函数 */
  flip: function (func) {
    return (...args) => func(...args.reverse());
  },

  conforms: function () {},

  constant: function () {},

  flow: function () {},

  method: function () {},

  methodOf: function () {},

  nthArg: function () {},

  propertyOf: function () {},

  parseJson: function () {},

  stringifyJson: function () {},

  //调用func,次数不超过n次，之后再调用这个函数，返回最后一次调用func的结果。
  //超过多少次不再调用func。
  before: function (n, func) {
    var i = 0;
    var result;
    return function (...args) {
      if (i < n) {
        i++;
        result = func(...args);
      }
      return result;
    };
  },

  //创建一个函数，调用n次及以上马上触发func
  after: function (n, func) {
    var i = 0;
    return function (...args) {
      i++;
      if (i > n) {
        return func(...args);
      }
    };
  },

  //调用func,func最多接受n个参数
  ary: function (func, n = func.length) {
    return function (...args) {
      return func(...args.slice(0, n));
    };
  },

  //调用func,func只接受1个参数
  unary: function (func) {
    return function (args) {
      return func(args);
    };
  },
  flip: function (func) {
    return function (...args) {
      return func(...args.reverse());
    };
  },
  matches: function (src) {
    return this.isMatch.bind(_, src);
  },

  matches: function (tar) {
    return function (obj) {
      for (var key in obj) {
        if (obj[key] != tar[key]) {
          return false;
        }
      }
      return true;
    };
  },
  matchesProperty: function (array) {
    return this.matches(this.fromPairs(this.chunk(array, 2)));
  },

  iteratee: function (precision) {
    //把string/array/object转为function
    if (typeof precision === "string") {
      return this.property(precision);
    } else if (Array.isArray(precision)) {
      return this.matchesProperty(precision);
    } else if (typeof precision === "object") {
      return this.matches(precision);
    }
  },
};

console.log(brightzoe.isEqual({ "0": 1, "1": 2, length: 2 }, [1, 2]));
