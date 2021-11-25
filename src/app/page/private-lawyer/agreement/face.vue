<template>
    <div>
        私人律师脸部图像采集协议
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

</style>