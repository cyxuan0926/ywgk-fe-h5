export default () => {
    const ua = navigator.userAgent
    return {
        ios: !!ua.match(/\(i[^;]+;(U;)? CPU.+Mac OS X/), // ios终端
        mobile: !!ua.match(/AppleWebKit.*Mobile.*/), // 是否为移动端
        android: ua.indexOf('Android') > -1, // 安卓终端或者UC浏览器
        iPhone: ua.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
        iPad: ua.indexOf('iPad') > -1, // 是否为iPad,
        weixin: !!ua.match(/MicroMessenger/)
    }
}
