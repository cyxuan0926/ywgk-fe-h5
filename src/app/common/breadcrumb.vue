<template>
    <div>
        <el-breadcrumb>
            <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="index" v-if="item.name">{{ item.name }}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>
<script>
export default {
    data() {
        return {
            breadcrumbs: []
        }
    },
    methods: {
        render() {
            this.breadcrumbs = this.$route.matched
        }
    },
    watch: {
        $route(to, from) {
            this.breadcrumbs = to.matched
        }
    },
    mounted() {
        this.render()
    }
}
</script>
<style lang="scss">
</style>
