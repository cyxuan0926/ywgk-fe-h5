<template>
    <div>
        私人律师操作指南
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