<template>
    <div class="detail">
      <div class="loading" v-if="loading"></div>
      <div class="content inner-content" v-else>
        <template v-if="news && news.createdAt">
          <h3 class="title">{{ news.title }}</h3>
          <p class="time">发布于  {{ news.createdAt | formatDate }}</p>
          <img v-if="news.imageUrl" :src="news.imageUrl + '?token=' + $store.state.img.imgToken" alt="">
          <div v-html="news.contents"></div>
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
            news: {}
        }
    },
    mounted() {
        this.render()
    },
    methods: {
        render() {
            if (!this.$route.params.id) return
            this.api.getNewsDetail(this.$route.params.id).then(res => {
                if (res && res.code === 200) {
                    this.news = res.data
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
