var string = process.argv[2];
var num = Number(string);
var primefactors = factorize(num);
console.log(string + ": " + primefactors.join(" "));

function factorize(num) {
  //质因数分解
  var res = [];
  for (let i = 2; i <= num; i++) {
    if (num % i == 0) {
      res.push(i);
      num = num / i--;
      if (num === 1) {
        return res;
      }
    }
  }
}
