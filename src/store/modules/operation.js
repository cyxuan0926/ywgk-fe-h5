/* eslint-disable import/no-duplicates */
import * as types from '../types'
import { getOperationStorage, setOperationStorage, getUserId, setUserId } from '@/utils/store'

const state = {
    userId: getUserId(),
    operationData: getOperationStorage()
}

const actions = {
    setOperation({ commit }, params) {
        setOperationStorage(params)
        commit(types.SET_OPERATION, params)
    },
    setUserId({ commit }, params) {
        setUserId(params)
        commit(types.SET_USERID, params)
    }
}

const getters = {
    operationData: state => state.operationData,
    userId: state => state.userId
}

const mutations = {
    [types.SET_OPERATION](state, payload) {
        state.operationData = payload
    },
    [types.SET_USERID](state, payload) {
        state.userId = payload
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}
