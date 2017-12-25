// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import routes from './router'
import Router from 'vue-router'
import store from './store/'
import ElementUI from 'element-ui'
import components from './components'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/scss/style.scss'
Vue.config.productionTip = false
Vue.use(Router)
Vue.use(ElementUI)

Object.keys(components).forEach(item => {
    let name = item.replace(/(\w)/, (v) => v.toUpperCase())
    Vue.component(`my${ name }`, components[item])
})
window.router = new Router({
    routes,
    mode: 'history',
    // mode: 'hash',
    scrollBehavior(to, from, savedPosition) {
        window.scrollTo(0, 0)
        if (to.hash) {
            return {
                selector: to.hash
            }
        }
    },
    linkActiveClass: 'active'
})
router.beforeEach((to, from, next) => {
    document.title = to.name
    next()
})
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
