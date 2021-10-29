<template>
    <div>
        {{ rname }}
    </div>
</template>

<script>
import { ref } from '@vue/composition-api'

export default {
    setup() {
        const rname = ref('hubi')
        return {
            rname
        }
    }
}
</script>

<style lang="scss" scoped>

</style>