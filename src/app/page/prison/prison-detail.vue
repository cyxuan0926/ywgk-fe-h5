<template>
    <div class="detail">
      <div class="loading" v-if="loading"></div>
      <div class="content inner-content" v-else>
        <template v-if="prison && prison.createdAt">
          <h3 class="title">{{ prison.title }}</h3>
          <p class="time">发布于  {{ prison.createdAt | formatDate }}</p>
          <img v-if="prison.imageUrl" :src="prison.imageUrl + '?token=' + $store.state.img.imgToken" alt="">
          <div v-html="prison.description"></div>
        </template>
        <template v-else>
          <p class="time" style="text-align: center;">暂无内容</p>
        </template>
      </div>
    </div>
</template>
<script>
export default {
    props: ['api'],
    data() {
        return {
            loading: true,
            prison: {}
        }
    },
    mounted() {
        this.render()
    },
    methods: {
        render() {
            if (!this.$route.params.id) return
            this.api.getPrisonDetail(this.$route.params.id).then(res => {
                if (res && res.code === 200) {
                    this.prison = res.data.jails
                    this.loading = false
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.detail{
  padding: 0.3rem;
  box-sizing: border-box;
  .title{
    font-size: 1.3rem;
    color: #444;
  }
  .time{
    color: #999;
  }
}
.content{
  background: #fff;
  border-radius: 0.1rem;
  padding: 0 0.3rem 1rem;
}
</style>
