import { initStore } from '@/common/constants/index'
// const _local = window.localStorage
const _session = window.sessionStorage
const getItem = (store, key, isParse) => {
    if (store) {
        let _data = store.getItem(key)
        if (_data) {
            return isParse ? JSON.parse(_data) : _data
        }
    }
    return initStore[key] && initStore[key]()
}
const setItem = (store, key, value) => {
    if (store) {
        store.setItem(key, typeof value === 'string' ? value : JSON.stringify(value))
    }
}

// 国科运维-工单
export const getOperationStorage = () => getItem(_session, 'APP_OPERATION_DATA', true)
export const setOperationStorage = (val) => setItem(_session, 'APP_OPERATION_DATA', val)

// 国科运维-userid
export const getUserId = () => getItem(_session, 'APP_USERID')
export const setUserId = (val) => setItem(_session, 'APP_USERID', val)
