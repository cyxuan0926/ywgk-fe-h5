<template>
    <div>
        <transition name="router-fade" mode="out-in">
            <router-view :api="api"></router-view>
        </transition>
    </div>
</template>
<script>
export default {
    data() {
        return {
        }
    },
    props: ['api']
}
</script>
<style lang="scss" scoped>
</style>
