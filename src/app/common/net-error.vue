<template>
  <div class="error">
    <img src="@/assets/images/net-error.png" alt="">
    <span @click="goBack">网络异常，点击重试</span>
  </div>
</template>

<script>
export default {
    methods: {
        goBack() {
            this.$router.replace(this.$route.query.r)
        }
    }
}
</script>

<style lang="scss" scoped>
.error{
  text-align: center;
  font-size: 1rem;
  width: 100%;
  height: 100%;
  padding-top: 6rem;
  // position: fixed;
  background: #F9F8FD;
  color: #666;
  img{
    height: 12.5rem;
    display: block;
    margin: auto;
    // margin-top: 6rem;
    margin-bottom: 2.5rem;
  }
}
</style>
