import mutations from './mutations'
// import test from '@/app/test/vuex/store'
import actions from './actions'
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
// console.log(stores)
let store = new Vuex.Store({
    modules: {
        mutations
    },
    actions
})
export default store
