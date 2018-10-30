<template>
    <div class="detail">
        <div class="detail-content">
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
            <div class="second-step" style="padding: 1.6rem 0 1.6rem">
                <div>
                    <img src="@/assets/images/third-step.png">
                </div>
                <div style="margin-left: 1.7rem;padding-right: .6rem">
                    <p style="text-align: right">第2步</p>
                    <p style="width: 11rem;">定位至“狱务通”应用，点击进入应用详情</p>
                </div>
                <div class="circle" style="margin-top: .3rem"></div>
            </div>
            <div class="third-step" style="padding: 1.6rem 0 1.8rem">
                <div class="circle"></div>
                <div style="margin-right: 3.7rem;padding-left: .6rem">
                    <p>第3步</p>
                    <p style="width:9rem;">将“自启动”权限打开</p>
                </div>
                <div>
                    <img src="@/assets/images/second-step.png">
                </div>
            </div>
            <div class="fourth-step" style="border-bottom: none;padding: 1.6rem 0 0">
                <div >
                    <img src="@/assets/images/fourth-step.png">
                </div>
                <div style="margin-left: 7.7rem;padding-right: .8rem">
                    <p style="text-align: right;width: 3rem;">第4步</p>
                    <p style="text-align: right;width: 3rem;">完成</p>
                </div>
                <div class="circle"></div>
            </div>
        </div>
        <div class="detail-button">
            <div class="button" @click="goForwordSet">继续</div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        goForwordSet() {
            window.JSInterface.goSetting()
        }
    }
}
</script>

<style lang="scss" scoped>
.detail {
    box-sizing: border-box;
    .detail-content{
        padding: 2.3rem 2.1rem 0 2.2rem;
        .first-step,.second-step,.third-step,.fourth-step {
            display: flex;
            flex-wrap: nowrap;
            justify-content: center;
            border-bottom: .09rem solid #EAEBEE;
            p,span {
                font-size: 0.9rem;
                font-family:PingFang-SC-Medium;
                font-weight:500;
                color:rgba(102,102,102,1);
                padding: 0;
                margin: 0;
            }
            .circle {
                width: .37rem;
                height: .37rem;
                border: .1rem solid #264C90;
                border-radius: 50%;
                margin-top: .4rem;
            }
        }
        img {
            width: 15.9rem;
            height: 17.3rem;
        }
    }
    .detail-button {
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

