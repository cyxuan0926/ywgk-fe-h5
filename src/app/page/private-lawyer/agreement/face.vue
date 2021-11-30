<template>
    <div class="face-container">
        <p>私人律师脸部图像采集协议正在定制中...</p> 
    </div>
</template>

<script>
import { reactive, toRefs } from '@vue/composition-api'

export default {
    setup() {
        const state = reactive({
            count: 0
        })
        return {
            ...toRefs(state)
        }
    }
}
</script>

<style lang="scss" scoped>
    .face-container {
        width: 100%;
        height: 60rem;
        background: url('../../../../assets/images/download-bg-bak-1018.png') no-repeat 0 0;
        background-size: 100% auto;

        p {
            font-size: 14px;
            color: #999;
            text-align: center;
            padding-top: 9rem;
            margin: 0;
        }
    }
</style>