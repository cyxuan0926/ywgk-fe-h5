/* eslint-disable import/no-duplicates */
import Vue from 'vue'
import Vuex from 'vuex'

import img from './modules/img'
import loading from './modules/loading'
import operation from './modules/operation'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        img,
        loading,
        operation
    }
})
export default store
