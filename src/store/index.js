/* eslint-disable import/no-duplicates */
import Vue from 'vue'
import Vuex from 'vuex'

import img from './modules/img'
import loading from './modules/loading'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        img,
        loading
    }
})
export default store
