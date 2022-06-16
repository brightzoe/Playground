function sayHello(person) {
    return "Hello, " + person;
}
var user = "hh";
console.log(sayHello(user));
var func2 = function (a, b) {
    return a + b + "foo";
};
var func = function (str) {
    return parseInt(str);
};
function sum() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    //确保传过来的参数都是数字，不用单独进行类型判断。可靠。
    return args.reduce(function (prev, curr) { return prev + curr; }, 0);
}
var tuple = [18, "foo"];
var age = tuple[0], useName = tuple[1];
function getName(person) {
    return person.name;
}
var lily = { name: "lily", gender: "female" };
console.log(getName(lily));
var funcSay = function (word) {
    return word;
};
