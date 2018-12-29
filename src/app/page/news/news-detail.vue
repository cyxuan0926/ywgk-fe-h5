<template>
    <div
      class="detail"
      :class="[
        { 'loading' : fullLoading },
        { 'no-content' : !fullLoading && (!news || !news.createdAt) }
      ]">
      <div
        v-if="news && news.createdAt"
        class="content inner-content">
          <h3 class="title">{{ news.title }}</h3>
          <p class="time">{{ news.jailName }}&nbsp;发布于&nbsp;{{ news.updatedAt || news.createdAt | formatDate }}</p>
          <video
            v-if="news.videoPath"
            controls
            poster="@/assets/images/video-background.png"
            style="">
            <source
              :src="news.videoPath + '?token=' + $store.state.img.imgToken"
              type='video/mp4'>
            <source
              :src="news.videoPath + '?token=' + $store.state.img.imgToken"
              type='video/webm'>
            <source
              :src="news.videoPath + '?token=' + $store.state.img.imgToken"
              type='video/ogg'>您的浏览器不支持Video标签。
          </video>
          <img v-if="news.imageUrl" :src="news.imageUrl + '?token=' + $store.state.img.imgToken" alt="">
          <m-audio
            :value="news.audioPath + '?token=' + $store.state.img.imgToken"
            width="100%" />
          <div v-html="news.contents"></div>
      </div>
    </div>
</template>
<script>
export default {
    props: ['api', 'fullLoading'],
    data() {
        return {
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
  word-break:break-all;
  .title{
    font-size: 1.3rem;
    color: #444;
  }
  .time{
    color: #999;
  }
  video, image, audio{
    margin-bottom: 0.8rem;
  }
}
.content{
  background: #fff;
  padding: 0 0.3rem 1rem;
}
</style>
