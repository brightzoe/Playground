import Vue from  'vue/dist/vue.js'
import VueMathPlugin from './VueMathPlugin.js'
Vue.use(VueMathPlugin)
//引用插件
new Vue({
	el: '#app',
	data:{item:49}
})