<template>
    <div class="app-download">
        <h1 class="app-logo">国科服务</h1>
        <div class="app-download-btn">
            <span class="app-download-btn__wxopen" v-if="isCanWxtag">
                <span class="button">
                    <wx-open-launch-app
                        id="wxopen-tag"
                        class="wxopen-tag"
                        appid="wx4973a8b575999262"
                        >
                        <script type="text/wxtag-template">
                            <style>.wxtag-btn {display: inline-block; width: 100%; height: 3.75rem; line-height: 3.4rem; text-align: center; font-family: "Microsoft YaHei", sans-serif; font-size: 16px; color: #097AE3;}</style>
                            <div class="wxtag-btn">打开APP</div>
                        </script>
                    </wx-open-launch-app>
                </span>
            </span>
            <span class="app-download-btn__open" v-else>
                <button @click="openApp">打开APP</button>
            </span>
            <span class="app-download-btn__download"><button @click="downloadApp">立即下载</button></span>
        </div>
        <h2 class="app-download-title">传递亲情，助力帮教</h2>
        <section class="app-download-content">
            <h3><span class="app-download-content-sp">AI智能识别</span></h3>
            <p>人脸识别、 声纹识别家属身份</p>
            <h3><span class="app-download-content-sp">设备安装简单</span></h3>
            <p>无需技术人员到现场安装</p>
            <h3><span class="app-download-content-sp">线上可视预约，线上可视通话</span></h3>
            <p>从申请探视到可视通话，所有流程线上完成</p>
        </section>
        <div class="app-download-modal" id="app-download-modal" :style="{display: isShowModal ? 'block' : 'none'}">
            <div class="app-download-modal-mask"></div>
            <div class="app-download-modal-content" @click.stop>
                <h4>第一步</h4>
                <p>点击右上角菜单</p>
                <h4>第二步</h4>
                <p>选择在浏览器中打开</p>
                <h4>第三步</h4>
                <p>即可打开/下载国科服务APP</p>
            </div>
        </div>
    </div>
</template>

<script>
    import detect from '@/utils/detect'
    import help from '@/utils/helper'
    import weixin from '@/common/constants/weixin'
    import urlConfig from '@/api/urls'
    
    export default {
        data() {
            return {
                browser: detect(),
                isShowModal: false,
                isChecking: false,
                isCanWxtag: false
            }
        },
        methods: {
            checkWxVersion(version) {
                let v = version.split('.')
                v = v.map(n => parseInt(n))
                if (v[0] > 7) {
                    this.isCanWxtag = true
                }
                else if (v[0] === 7) {
                    if (v[1] > 0) {
                        this.isCanWxtag = true
                    }
                    else if (v[1] === 0) {
                        if (v[2] >= 12) {
                            this.isCanWxtag = true
                        }
                    }
                }
            },

            checkAppIsOpen() {
                return new Promise((resolve, reject) => {
                    let _checkTime = Date.now(),
                        _count = 0,
                        _checkInterval = setInterval(() => {
                            _count++
                            let _durTime = Date.now() - _checkTime
                            if (_count >= 100 || _durTime > 3200) {
                                clearInterval(_checkInterval)
                                if (_durTime > 3200 || document.hidden || document.webkitHidden) {
                                    resolve(true)
                                }
                                else {
                                    resolve(false)
                                }
                            }
                        }, 30)
                })
            },

            async openApp() {
                if (this.isChecking) {
                    return
                }
                if (this.browser.weixin) {
                    this.isShowModal = true
                }
                else {
                    this.isChecking = true
                    let appUrl, _isOpen
                    if (this.browser.iPhone || this.browser.iPad) {
                        appUrl = 'GKService://'
                    }
                    else if (this.browser.android) {
                        appUrl = 'com.gkzxhn://gkprison:8080/splash'
                    }
                    window.location.href = appUrl
                    _isOpen = await this.checkAppIsOpen()
                    this.isChecking = false
                    if (!_isOpen) {
                        this.downloadApp()
                    }
                }
            },

            downloadApp() {
                if (this.browser.weixin && this.browser.android) {
                    this.isShowModal = true
                    return
                }
                // else {
                //     if (this.browser.iPhone || this.browser.iPad) {
                //         window.location.href = 'https://itunes.apple.com/cn/app/%E7%8B%B1%E5%8A%A1%E9%80%9A/id1102307635?mt=8'
                //     }
                //     else if (this.browser.android) {
                //         window.location.href = 'https://www.yuwugongkai.com/app/yuwutong_f.apk?from=wechat'
                //     }
                // }
                if (this.browser.iPhone || this.browser.iPad) {
                    window.location.href = 'https://itunes.apple.com/cn/app/%E7%8B%B1%E5%8A%A1%E9%80%9A/id1102307635?mt=8'
                }
                else if (this.browser.android) {
                    window.location.href = 'https://www.yuwugongkai.com/app/yuwutong_f.apk?from=wechat'
                }
            }
        },

        created() {
            const wechat = navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i)
            if (wechat) {
                this.checkWxVersion(wechat[1])
            }
        },

        async mounted() {
            let _this = this
            if (this.browser.weixin) {
                if (!window.wx) {
                    await help.loadScript('https://res.wx.qq.com/open/js/jweixin-1.6.0.js')
                }
                let link = `${ urlConfig.apiHost }/h5/#/download`
                help.setWxConfig().then(data => {
                    wx.updateAppMessageShareData({
                        ...weixin.SHARE_DATA,
                        link
                    })

                    wx.updateTimelineShareData({
                        ...weixin.SHARE_DATA,
                        link
                    })
                })
                .catch(err => {
                    alert(err)
                })
            }
            document.querySelector('#app-download-modal').onclick = () => {
                this.isShowModal = false
            }

            if (this.isCanWxtag) {
                document.getElementById('wxopen-tag').addEventListener('error', function(e) {
                    if (e && e.detail && e.detail.errMsg) {
                        _this.downloadApp()
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .app-logo {
        width: 8.83rem;
        height: 8.83rem;
        margin: 2.41rem auto 1.16rem;
        background: #B7D9FA url(../../../assets/images/logo.png) no-repeat left top;
        background-size: 100% auto;
        font-size: 0;
        color: #264C90;
        text-indent: -99px;
    }
    .app-download {
        width: 100%;
        height: 59.1rem;
        background: #B7D9FA url(../../../assets/images/download-bg.png) no-repeat left top;
        background-size: 100% auto;
        overflow: hidden;

        &-btn {
            width: 100%;
            margin-bottom: 9rem;
            vertical-align: top;
            text-align: center;

            &__open,
            &__wxopen,
            &__download {
                display: inline-block;
                width: 11.25rem;
                height: 4.58rem;
                text-align: center;
                border: none;
                vertical-align: top;

                button, .button {
                    display: inline-block;
                    width: 100%;
                    height: 3.75rem;
                    font-size: 16px;
                    background: none;
                    border: none;
                    appearance: none;
                    tap-highlight-color: transparent;
	                touch-callout: none;
	                user-select: none;

                    &:focus,
                    &:active {
                        outline: none;
                    }
                }
            }

            &__open,
            &__wxopen {
                button, .button {
                    color: #097AE3;
                }
                margin-right: 1.16rem;
                background: #B7D9FA url(../../../assets/images/btn-open-bg.png) no-repeat left top;
                background-size: 100% auto;
            }

            &__download {
                button {
                    color: #fff;
                }
                background: #B7D9FA url(../../../assets/images/btn-download-bg.png) no-repeat left top;
                background-size: 100% auto;
            }

            &__wxopen {
                .button {
                    position: relative;
                    .wxopen-tag {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        text-align: center;
                    }
                }
            }
        }

        &-title {
            width: 19.8rem;
            height: 3.04rem;
            margin: 0 auto 2.5rem;
            font-size: 0;
            text-indent: -999px;
            background: url(../../../assets/images/download-title-bg.png) no-repeat left top;
            background-size: 100% auto;
        }

        &-content {
            width: 24.16rem;
            height: 23.08rem;
            padding-left: 1.45rem;
            padding-top: 2.3rem;
            margin: 0 auto;
            background: url(../../../assets/images/download-con-bg.png) no-repeat left top;
            background-size: 100% auto;
            overflow: hidden;

            h3 {
                margin: 0;
                margin: 0 0 1.25rem;
                vertical-align: top;
            }

            p {
                padding-left: 1.25rem;
                margin: 0 0 2rem;
            }
            
            &-sp {
                background-color: #0A7AE3;
                font-size: 14px;
                font-weight: 400;
                border-radius: 1.7rem;
                padding: .5rem 1.5rem;
                color: #fff;
                display: inline-block;
            }
            
        }

        &-modal {
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 999;

            &-mask {
                position: absolute;
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, .8)
            }

            &-content {
                position: absolute;
                top: 1rem;
                right: 1rem;
                width: 21.6rem;
                height: 15.41rem;
                padding: 2.5rem 0 0 1.25rem;
                background: url(../../../assets/images/download-modal-con-bg.png) no-repeat left top;
                background-size: 100% auto;
                overflow: hidden;

                h4 {
                    font-size: 12px;
                    font-weight: 400;
                    color: #999;
                    margin:  0 0 .2rem;
                }

                p {
                    margin:  0 0 1rem;
                    font-size: 14px;
                }
            }
        }
    }
    
</style>