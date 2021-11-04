<template>
    <div class="app-layout signresult-layout">
        <div class="app-layout-contents">
            <div class="signresult-layout-card">
                <img class="signresult-layout-img" :src="signResult.src" :alt="signResult.message">
                <p class="signresult-layout-text text-result">{{ signResult.message }}</p>
                <van-button v-if="!isOk && !isExpire" class="btn-clear" size="small" type="info" @click="handleClick">点击返回</van-button>
            </div>
            <div class="signresult-layout-card signresult-layout-download">
                <img class="signresult-layout-img download-logo" src="../../../assets/images/sign-result-logo.png">
                <p class="signresult-layout-text">免费安装“国科服务APP”高效管理线下会议</p>
                <van-button class="download-btn" type="info" block to="/download">一键下载安装</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from '@vue/composition-api'

export default {
    setup() {
        let _router = window.router && window.router.currentRoute
        let _query = (_router && _router.query) || {}
        let _code = _query.code && parseInt(_query.code)
        const isOk = ref(_code === 200)
        const isExpire = ref(_code === 999)
        const signResult = reactive({
            src: require(`../../../assets/images/sign-result-${ isOk.value ? 'success' : isExpire.value ? 'expire' : 'error' }.png`),
            message: _query.message
        })

        const handleClick = () => {
            window.router && window.router.go(-1)
        }

        return {
            isOk,
            isExpire,
            signResult,
            handleClick
        }
    }
}
</script>

<style lang="scss" scoped>
    .signresult-layout {
        background: #F3F5F8 url('../../../assets/images/sign-up-bg.png') no-repeat left top;
        background-size: 100% auto;

        .app-layout-contents {
            padding: 3.6rem 1.25rem 2.3rem;
        }

        &-card {
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: #fff;
            border-radius: .5rem;
            padding: 4.5rem 1.25rem;
            margin-bottom: 1rem;

            .text-result {
                margin: 1rem 0 0;
                font-size: 16px;
                font-weight: 600;
            }

            .btn-clear {
                border: none;
                background: none;
                color: #1989fa;
                margin-top: .75rem;
            }

            .btn-clear:active::before {
                opacity: 0;
            }
        }

        &-img {
            display: block;
            width: 6.25rem;
            height: 7.08rem;
        }

        &-download {
            .download-logo {
                width: 6.5rem;
                height: 6.5rem;
            }

            p {
                color: #666;
                margin: 2rem 0 3.5rem;
            }

            .download-btn {
                width: 70%;
            }
        }
    }
</style>