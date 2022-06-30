// 一个小区里有n个居民，第一天有k个传染病感染者，感染者需要转运到医院隔离和治疗，该小区第一天的转运感染者的能力是p个人，第二天转运能力是p-1人，第三天转运能力是p-2人，以此类推。如果感染者当天没有转运出小区，则每一个感染者会在当天午夜12点感染1个人。请问这个小区需要多少天感染者能清零。用Java/JS/TS/C++语言实现求清零天数函数。
// 要求：
// (1) 命名一个合适的函数名称，实现完整的函数
// (2) 按照你平时的编程习惯，在你认为需要注释处写上相应的注释
// (3) 代码行数尽可能少，代码运行复杂度尽可能小
// (4) 写出你实现代码的算法复杂度o(n)

function cleaningDays(n, k, p) {
  if (p >= k) {
    // 第一天全转运走
    return 2;
  }

  //1 remain = k - p
  //2 remain = remain * 2 - (p - 1)
  //3 remain = remain * 2 - (p - 2)
  let res = 1; //第几天
  let remainInfectors = k - p; // 转运后剩余感染者
  let pollNumber = p; // 被拉走的人
  while (remainInfectors > 0) {
    res++;
    pollNumber += p - res + 1;
    let remainHealth = n - remainInfectors - pollNumber >= 0 ? n - remainInfectors - pollNumber : 0; // 剩余健康人

    if (remainInfectors <= remainHealth) {
      // 是否有足够的健康人被感染
      remainInfectors = remainInfectors * 2 - (p - res + 1);
    } else {
      remainInfectors = remainInfectors + remainHealth;
    }
    if (remainInfectors <= p - res + 1) {
      // 当天可以全拉走
      break;
    }
  }
  return res;
}

// O(n) = n* log(n)
// cleaningDays(500, 30, 5);
