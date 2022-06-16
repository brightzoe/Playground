function sayHello(person: string) {
  return "Hello, " + person;
}

let user = "hh";
console.log(sayHello(user));

const func2 = (a: number, b: number) => {
  return a + b + "foo";
};
const func: (str: string) => number = (str) => {
  return parseInt(str);
};
function sum(...args: number[]) {
  //确保传过来的参数都是数字，不用单独进行类型判断。可靠。
  return args.reduce((prev, curr) => prev + curr, 0);
}

const tuple: [number, string] = [18, "foo"];
const [age, useName] = tuple;

interface EatAndRun {
  //都有这些能力
  eat(food: string): void;
  run(distance: number): void;
}

//类是这个接口的实现
class Person implements EatAndRun {
  eat(food: string): void {
    console.log(`优雅地吃饭饭：${food}`);
  }
  run(distance: number): void {
    console.log(`跑步：${distance}`);
  }
}


class Animal implements EatAndRun {
  eat(food: string): void {
    console.log(`呼噜呼噜了：${food}`);
  }
  run(distance: number): void {
    console.log(`爬了：${distance}`);
  }
}
