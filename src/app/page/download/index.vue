<template>
    <div class="app-download">
        <h1 class="app-logo">国科服务</h1>
        <div class="app-download-btn">
            <span class="app-download-btn__open"><button @click="openApp">打开APP</button></span>
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
    import detect from '@/utils/detect.js'
    export default {
        data() {
            return {
                browser: detect(),
                isShowModal: false,
                isChecking: false
            }
        },
        methods: {
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
        mounted() {
            document.querySelector('#app-download-modal').onclick = () => {
                this.isShowModal = false
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
            &__download {
                display: inline-block;
                width: 11.25rem;
                height: 4.58rem;
                text-align: center;
                border: none;

                button {
                    width: 100%;
                    height: 3.75rem;
                    font-size: 16px;
                    background: none;
                    border: none;
                    appearance: none;

                    &:focus,
                    &:active {
                        outline: none;
                    }
                }
            }

            &__open {
                button {
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
            padding-top: 2.7rem;
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
                margin: 0 0 1.9rem;
            }
            
            &-sp {
                background-color: #0A7AE3;
                font-size: 16px;
                font-weight: 400;
                border-radius: 1.25rem;
                padding: .58rem 1.25rem;
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
                    margin:  0 0 .4rem;
                }

                p {
                    margin:  0 0 1rem;
                    font-size: 14px;
                }
            }
        }
    }
    
</style>