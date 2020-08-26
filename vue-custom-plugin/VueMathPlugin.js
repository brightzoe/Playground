export default {
  install: function (Vue) {
    Vue.directive("square", function (el, binding) {
      //用自定义指令，实现一个插件
      el.innerHTML = Math.pow(binding.value, 2);
    });
    Vue.directive("sqrt", function (el, binding) {
      el.innerHTML = Math.sqrt(binding.value);
    });
    Vue.directive("sin", function (el, binding) {
      el.innerHTML = Math.sin(binding.value);
    });
    Vue.directive("cos", (el, binding) => {
      el.innerHTML = Math.cos(binding.value);
		});
		Vue.directive("tan", (el, binding) => {
      el.innerHTML = Math.tan(binding.value);
    });
  },
};
