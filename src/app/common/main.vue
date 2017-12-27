<template>
<el-container>
  <el-header>
       <v-header></v-header>
  </el-header>
  <el-container>
    <el-aside width="200px">
        <v-aside></v-aside>
    </el-aside>
    <el-container>
        <el-main>
            <transition name="router-fade" mode="out-in">
                <router-view :api="apiList"></router-view>
            </transition>
        </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</el-container>
        <!-- <el-container>
            <v-header></v-header>
            <el-container>
                <v-aside></v-aside>
                <el-container>
                    <v-breadcrumb></v-breadcrumb>
                    <el-main>
                        <transition name="router-fade" mode="out-in">
                            <router-view :api="apiList"></router-view>
                        </transition>
                    </el-main>
                    <v-footer></v-footer>
                </el-container>
            </el-container>
        </el-container> -->
</template>
<script>
import vHeader from './header'
import vFooter from './footer'
import vAside from './sidebar'
import vBreadcrumb from './breadcrumb'
import apiList from '@/api/api'
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
