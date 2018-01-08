<template>
<el-aside width="200px">
    <el-menu>
        <template v-for="(menu, index) in menus">
            <el-submenu :index="menu.index" :key="index">
                <template slot="title">{{menu.name}}</template>
                <template v-if="menu.children" v-for="child in menu.children">
                    <el-menu-item :key="child.index" :index="child.index" @click="goPage(child.path)">
                        <template slot="title">{{child.name}}</template>
                    </el-menu-item>
                </template>      
            </el-submenu>
        </template>
    </el-menu> 
</el-aside>
</template>
<script>
import menus from './menu'
export default {
    data() {
        return {
            menus: menus
        }
    },
    methods: {
        goPage(path) {
            this.$router.push(path)
        }
    }
}
</script>
