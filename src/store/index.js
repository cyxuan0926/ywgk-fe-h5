import Vue from 'vue'
import Vuex from 'vuex'

import img from './modules/img'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        img
    }
})

export default store
