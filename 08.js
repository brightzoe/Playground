new jQuery("div p");
$("div");
$("<div></div>");
$(document.body);
$([document.body, document.head]);

//模块化
//导出 export func(){}
//可以在js末尾统一导出 export{funcName,funcName...}

//导入的script 的 type:module
import { funcName, funcName } from "url";
import * as xx from "url";
//默认导出
//export default func;
//import name(随便起),以及非默认func from "xxx"




function requireFile(filename) {
  var xhr = new XMLHttpRequest();
  xhr.open("get", filename, false);
  xhr.send();
  return xhr.responseText;
}

function require(filename) {
  if (caches.hasOwnProperty(filename)) {
    return caches.filename
  }
  var module = {{exports:{}}}
  var fileContent = requireFile(filename);
  var modFunc = new Function(fileContent);
  return modFunc() ;
}


