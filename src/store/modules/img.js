import * as types from '../types'

const state = {
    imgToken: '523b87c4419da5f9186dbe8aa90f37a3876b95e448fe2a'
}

const actions = {
    getImgToken({ commit }, imgToken) {
        commit(types.GET_IMG_TOKEN, imgToken)
    }
}

const getters = {
    imgToken: state => state.imgToken
}

const mutations = {
    [types.GET_IMG_TOKEN](state, view) {
        state.imgToken = '523b87c4419da5f9186dbe8aa90f37a3876b95e448fe2a'
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}
