import * as types from '../types'

const state = {
    fullLoading: true
}

const actions = {
    showLoading({ commit }) {
        commit(types.SET_LOADING, true)
    },
    hideLoading({ commit }) {
        commit(types.SET_LOADING, false)
    }
}

const getters = {
    fullLoading: state => state.fullLoading
}

const mutations = {
    [types.SET_LOADING](state, params) {
        state.fullLoading = params
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}
