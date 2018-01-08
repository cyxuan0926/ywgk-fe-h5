<template>
      <el-aside width="200px">
          <el-menu>
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-message"></i>我的店铺</template>
                        <el-menu-item-group>
                            <el-menu-item index="1-1">店铺设置</el-menu-item>
                            <el-menu-item index="1-2">运费模板</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-menu"></i>会员管理</template>
                        <el-menu-item-group>
                            <el-menu-item index="2-1">会员列表</el-menu-item>
                            <el-menu-item index="2-2">等级管理</el-menu-item>
                            <el-menu-item index="2-3">积分管理</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title"><i class="el-icon-setting"></i>账号管理</template>
                        <el-menu-item-group>
                            <el-menu-item index="3-1">角色管理</el-menu-item>
                            <el-menu-item index="3-2">人员角色管理</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title"><i class="el-icon-setting"></i>供应商管理</template>
                        <el-menu-item-group>
                            <el-menu-item index="4-1">供应商列表</el-menu-item>
                            <el-menu-item index="4-2">入库</el-menu-item>
                            <el-menu-item index="4-3">供应商模块</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="5">
                        <template slot="title"><i class="el-icon-setting"></i>订单管理</template>
                        <el-menu-item-group>
                            <el-menu-item index="5-1">订单列表管理</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="6">
                        <template slot="title"><i class="el-icon-setting"></i>售后管理</template>
                        <el-menu-item-group>
                            <el-menu-item index="6-1">售后列表管理</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="7">
                        <template slot="title"><i class="el-icon-setting"></i>商品管理</template>
                        <el-menu-item-group>
                            <el-menu-item index="7-1">商品管理</el-menu-item>
                            <el-menu-item index="7-1">分类管理</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="8">
                        <template slot="title"><i class="el-icon-setting"></i>客服管理</template>
                        <el-menu-item-group>
                            <el-menu-item index="8-1">客服账号</el-menu-item>
                            <el-menu-item index="8-1">评价管理</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="9">
                        <template slot="title"><i class="el-icon-setting"></i>消息中心</template>
                        <el-menu-item-group>
                            <el-menu-item index="9-1">广告推送</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="10">
                        <template slot="title"><i class="el-icon-setting"></i>模块设置</template>
                        <el-menu-item-group>
                            <el-menu-item index="10-1">首页楼层</el-menu-item>
                            <el-menu-item index="10-2">活动商品设置</el-menu-item>
                            <el-menu-item index="10-3">广告图片设置</el-menu-item>
                            <el-menu-item index="10-4">促销公告设置</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="11">
                        <template slot="title"><i class="el-icon-setting"></i>营销中心</template>
                        <el-menu-item-group>
                            <el-menu-item index="11-1">满减满送</el-menu-item>
                            <el-menu-item index="11-2">限时限购</el-menu-item>
                            <el-menu-item index="11-3">礼券中心</el-menu-item>
                            <el-menu-item index="11-4">订单评价送优惠</el-menu-item>
                            <el-menu-item index="11-5">会员折扣</el-menu-item>
                            <el-menu-item index="11-6">首件优惠</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="12">
                        <template slot="title"><i class="el-icon-setting"></i>规则说明</template>
                        <el-menu-item-group>
                            <el-menu-item index="12-1">购物指南</el-menu-item>
                            <el-menu-item index="12-2">特色服务</el-menu-item>
                            <el-menu-item index="12-3">支付方式</el-menu-item>
                            <el-menu-item index="12-4">关于医牧淘</el-menu-item>
                            <el-menu-item index="12-5">物流配送</el-menu-item>
                            <el-menu-item index="12-6">首页标签</el-menu-item>
                            <el-menu-item index="12-7">售后服务</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="13">
                        <template slot="title"><i class="el-icon-setting"></i>数据报表中心</template>
                        <el-menu-item-group>
                            <el-menu-item index="13-1">系统用户统计</el-menu-item>
                            <el-menu-item index="13-2">区域用户统计</el-menu-item>
                            <el-menu-item index="13-3">商品收藏统计</el-menu-item>
                            <el-menu-item index="13-4">访问量统计</el-menu-item>
                            <el-menu-item index="13-5">商品浏览量统计</el-menu-item>
                            <el-menu-item index="13-6">收入查询</el-menu-item>
                            <el-menu-item index="13-7">商品销售量统计</el-menu-item>
                            <el-menu-item index="13-8">支出查询</el-menu-item>
                            <el-menu-item index="13-9">商品销售额统计</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="14">
                        <template slot="title"><i class="el-icon-setting"></i>app端设置</template>
                        <el-menu-item-group>
                            <el-menu-item index="14-1">楼层图片设置</el-menu-item>
                            <el-menu-item index="14-2">轮播图设置</el-menu-item>
                            <el-menu-item index="14-3">分类商品配置</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu> 
      </el-aside>
</template>
<script>
export default {
    data() {
        return {
        }
    },
    computed: {
    },
    methods: {
    }
}
</script>
<style lang="scss" scoped>
</style>
