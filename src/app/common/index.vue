<template>
  <ul class="error">
    <li @click="goPage('/law/list?prisonerId=88')">法律法规</li>
    <li @click="goPage('/news/detail/1')">新闻详情</li>
    <li @click="goPage('/prison/detail/104')">监狱详情</li>
    <li @click="goPage('/affairs/detail/1331070721997697026')">工作动态详情</li>
    <li @click="goPage('/guidance/guidance-detail')">自启动权限设置引导</li>
    <li @click="goPage('/meeting-notification/detail')">会见告知书</li>
    <li @click="goPage('/download')">下载页</li>
    <li @click="goPage('/operations/list')">国科运维</li>
    <li @click="goPage('/operations/static?uid=GXRRh13YRuUqRQHFa_rbmk&auditSection=2021-12&auditType=3&appVersion=312')">国科运维-审计统计</li>
    <li @click="goPage('/language/all')">国科学习（/language/stu 学员端 /language/adm 管理端 /language/oper 国科运维操作指南）</li>
    <li @click="goPage('/conference/sign-up')">国科会务报名</li>
    <li @click="goPage('/terminal/charge-config/65')">终端亲情电话-收费标准</li>
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
