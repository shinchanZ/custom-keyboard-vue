import Vue from 'vue'
import App from './App.vue'
// 导入组件库
import customKeyboard from './../packages/index.js'
// 注册组件库
Vue.use(customKeyboard)
Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')
