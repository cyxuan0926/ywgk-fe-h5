<template>
  <ul class="error">
    <li @click="goPage('/law/list?prisonerId=88')">法律法规</li>
    <li @click="goPage('/news/detail/1')">新闻详情</li>
    <li @click="goPage('/prison/detail/98')">监狱详情</li>
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
