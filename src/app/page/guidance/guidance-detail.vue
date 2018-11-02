<template>
    <div class="guidance-detail">
        <div class="guidance-detail-content">
            <div class="first-step" style="padding-bottom: 1.8rem">
                <div class="circle"></div>
                <div style="margin-right: 2.5rem;padding-left: .6rem">
                    <p class="left-cirle">第1步</p>
                    <p style="width: 11.2rem;">进入“设置” 点击“更多应用”，进入应用管理</p>
                </div>
                <div>
                 <img src="@/assets/images/first-step.png">
                </div>
            </div>
            <div class="second-step" style="padding: 1.6rem 0 1.8rem">
                <div>
                    <img src="@/assets/images/second-step.png">
                </div>
                <div style="margin-left: 1.7rem;padding-right: .6rem">
                    <p style="text-align: right">第2步</p>
                    <p style="width: 11rem;">定位至“狱务通”应用，点击进入应用详情</p>
                </div>
                <div class="circle" style="margin-top: .3rem"></div>
            </div>
            <keep-alive>
                <component :is="showComponent"></component>
            </keep-alive>
        </div>
        <div class="guidance-detail-button">
            <div class="button" @click="goForwordSet">继续</div>
        </div>
    </div>
</template>

<script>
import components from './components/index'
export default {
    data() {
        return {
            showComponent: ''
        }
    },
    methods: {
        goForwordSet() {
            window.JSInterface.goSetting()
        }
    },
    components: {
        'HUAWEI': components.huaWei,
        'OppoVivo': components.OppoVivo,
        'Coolpad': components.coolPad,
        'Meizu': components.meiZu,
        'Xiaomi': components.xiaoMi,
        'samsung': components.samsung,
        'Sony': components.sony,
        'LG': components.LG,
        'others': components.others
    },
    mounted() {
        // let val = this.$route.query.devicename.toLocaleLowerCase()
        let val = window.location.href.substring(window.location.href.lastIndexOf('=') + 1).toLocaleLowerCase()
        if (val) {
            if (val === 'oppo' || val === 'vivo') {
                this.showComponent = 'OppoVivo'
            }
            else if (val === 'meizu') {
                this.showComponent = 'Meizu'
            }
            else {
                this.showComponent = 'others'
            }
        }
        else {
            this.showComponent = 'others'
        }
    }
}
</script>

<style lang="scss" scoped>
.guidance-detail {
    box-sizing: border-box;
    .guidance-detail-button {
        padding: 3.6rem 1.1rem 1.9rem 1.7rem;
        .button {
            line-height: 4rem;
            text-align: center;
            background:linear-gradient(-90deg,rgba(255,255,255,1) 0%,rgba(56,87,144,1) 0%,rgba(102,102,102,1) 0%,rgba(100,140,214,1) 0%,rgba(83,119,185,1) 100%);
            border-radius:.4rem;
            font-size:1.3rem;
            font-family:PingFang-SC-Medium;
            font-weight:500;
            color:rgba(255,255,255,1);
        }
    }
}
</style>

