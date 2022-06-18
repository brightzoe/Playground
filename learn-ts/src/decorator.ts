// function testDecoractor(flag: boolean) {
//   // 工厂模式装饰器
//   if (flag) {
//     return function (constructor: any) {
//       console.log("testDecoractor");

//       constructor.prototype.getName = function () {
//         console.log("im name");
//       };
//     };
//   }
//   return function () {};
// }

// function testDecoractor1(constructor: any) {
//   console.log("testDecoractor1");
// }

// @testDecoractor(true) // 接收参数
// @testDecoractor1
// class Test {}

// const test1 = new Test();
// (test1 as any).getName();

//---------------- 复杂标准装饰器
function testDecoractor() {
  return function <T extends new (...args: any[]) => any>(constructor: T) {
    console.log("testDecoractor");
    return class extends constructor {
      name = "zzz";
      getName() {
        console.log(this.name);
        return this.name;
      }
    };
  };
}

const Test = testDecoractor()(
  class {
    constructor(public name: string) {}
  }
);

const test1 = new Test("hh");
test1.getName();

//---------------
