import imgUrl from '@/assets/images/wx_share_new.png'
import urlConfig from '@/api/urls'
export default {
    AppId: 'wx4973a8b575999262',
    SHARE_DATA: {
        title: '国科服务',
        desc: '立足科技创新 服务智慧司法',
        imgUrl: `${ urlConfig.apiHost }${ imgUrl }`
    }
    // SHARE_DATA: {
    //     title: '新国科服务',
    //     desc: '缔造政府服务百姓的纽带，构建城乡优势互补的桥梁',
    //     imgUrl: `${ urlConfig.apiHost }${ imgUrl }`
    // }
}
