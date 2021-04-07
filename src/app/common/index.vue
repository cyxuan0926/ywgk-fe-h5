<template>
  <ul class="error">
    <li @click="goPage('/law/list?prisonerId=88')">法律法规</li>
    <li @click="goPage('/news/detail/1')">新闻详情</li>
    <li @click="goPage('/prison/detail/104')">监狱详情</li>
    <li @click="goPage('/affairs/detail/1331070721997697026')">工作动态详情</li>
    <li @click="goPage('/guidance/guidance-detail')">自启动权限设置引导</li>
    <li @click="goPage('/meeting-notification/detail')">会见告知书</li>
    <li @click="goPage('/download')">下载页</li>
  </ul>
</template>

<script>
export default {
    methods: {
        goPage(e) {
            this.$router.push(e)
        }
    }
}
</script>

<style lang="scss" scoped>
.error{
  line-height: 5rem;
  text-align: center;
  width: 100%;
  height: 100%;
  background: #F9F8FD;
  color: blue;
  text-decoration: underline;
}
</style>
