//模块化
var xx = require('chosen-js')
import xxx,{ funcName, funcName } from "url";//前面是默认导出的，后面是有名字的
import * as xx from "url";
//默认导入import name(随便起),以及非默认func from "xxx"
//默认导出export default func;
//具名导出 export func abc(){} /let/var/const
//可以在js末尾统一导出 export{funcName,funcName...}
//export * from xxx;
//导入的script 的 type:module

(function () {
  function readFile(filename) {
    var xhr = new XMLHttpRequest();
    xhr.open("get", filename, false);//同步，不行，要卡
    xhr.send();
    return xhr.responseText;
  }
  require.cache = {};
  function require(filename) {
    //路径问题？base自己
    if (require.cache.hasOwnProperty(filename)) {
      return require.cache[filename].exports;
    }
    var modFunc = new Function(
      "require",
      "module",
      "exports",
      readFile(filename)
    );
    var module = { exports: {} };
    require.cache[filename] = module; //最终导出的是module.exports;引用类型，先放在缓存上，解决循环依赖的问题，可以防止爆栈；但是后续只能异步访问
    modFunc(require, module, module.exports, readFile(filename));
    return module.exports;
  }
})();
//异步
(function () {
  function readFile(filename) {
    var xhr = new XMLHttpRequest();
    xhr.open("get", filename); 
    xhr.send();
    return xhr.responseText;
  }
  require.cache = {};
  window.require = require
  function require(filename) {
    //路径问题？base自己
    if (require.cache.hasOwnProperty(filename)) {
      return require.cache[filename].exports;
    }
    var fileContent = readFile(filename)
    var modFunc = new Function(
      "require",
      "module",
      "exports",
      fileContent
    );
    var module = { exports: {} };
    require.cache[filename] = module; //最终导出的是module.exports;引用类型，先放在缓存上，解决循环依赖的问题，可以防止爆栈；但是后续只能异步访问
    modFunc(require, module, module.exports, readFile(filename));
    return module.exports;
  }
})();
function readFile(filename) {
  return new Promise((resolve) => {
    var xhr = new XMLHttpRequest();
    xhr.open("get", filename);
    xhr.onload = () => {
      fileCache[filename] = xhr.responseText;
      resolve(xhr.responseText);
    };
    xhr.send();
  });
}
//三个异步版本，async+promise+callback
async function loadAllDeps(entryFile) {
  var entryCode = await readFile(entryFile);
  var deps = getAllDeps(entryCode);
  await Promise.all(deps.map(loadAllDeps));
  return;
}

function loadAllDeps(entryFile) {
  readFile(entryFile).then((entryCode) => {
    var deps = getAllDeps(entryCode);
    return Promise.all(deps.map(loadAllDeps));
  });
}

function loadAllDeps(entryFile, cb) {
  readFile(entryFile, (entryCode) => {
    var deps = getAllDeps(entryCode);
    if (deps.length) {
      var count = 0;
      for (var dep of deps) {
        loadAllDeps(dep, () => {
          count++;
          if (count == deps.length) {
            cb();
          }
        });
      }
    } else {
      cb();
    }
  });
}

function loadAllDeps(entryFile) {
  //同步版本
  var entryCode = readFile(entryFile);
  var deps = getAllDeps(entryCode);
  deps.map(loadAllDeps);
}

