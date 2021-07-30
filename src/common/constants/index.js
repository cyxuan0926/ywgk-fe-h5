// import config from '@/api/urls'
const path = require('path')

export const initStore = {
    APP_OPERATION_DATA() {
        return {}
    },
    APP_USERID() {
        return ''
    }
}

const manualLazyUrls = require.context('@/assets/images/manual')
const languageLazyUrls = {
    stu: [],
    adm: [],
    all: []
}
manualLazyUrls.keys().forEach(f => {
    f = path.join(``, manualLazyUrls(f))
    if (f.includes('stu')) {
        languageLazyUrls.stu.push(f)
    }
    else if (f.includes('adm')) {
        languageLazyUrls.adm.push(f)
    }
    else {
        languageLazyUrls.all.push(f)
    }
})

export { languageLazyUrls }
