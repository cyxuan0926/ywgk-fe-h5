<template>
    <el-container>
        <el-header>
            <v-header></v-header>
        </el-header>
        <el-container>
            <vAside> </vAside>
            <el-container>
                <el-main>
                    <!-- <router-view></router-view> -->
                     <transition name="router-fade" mode="out-in">
                        <router-view :api="apiList"></router-view>
                    </transition>
                </el-main>
            </el-container>
        </el-container>
    </el-container>
</template>
<script>
import vHeader from './header'
import vFooter from './footer'
import vAside from './side-menu'
import vBreadcrumb from './breadcrumb'
// import apiList from '@/api/api'
import { apiList } from '@/api'
export default {
    data() {
        return {
            // loginState: true
            apiList
        }
    },
    components: { vHeader, vFooter, vAside, vBreadcrumb },
    mounted() {
    }
}

</script>
<style lang="scss" scoped>
</style>
