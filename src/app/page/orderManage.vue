<template>
    <div>
        <el-tabs v-model="message" @tab-click="handleClickTab">
            <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
            <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
            <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
export default {
    date() {
        return {
            message: 'second'
        }
    },
    methods: {
        handleClickTab(tab, event) {
            console.log(tab, event)
        }
    }
}
</script>
<style lang="scss" scoped>
    el-tabs{
        width:100%;
    }
</style>


