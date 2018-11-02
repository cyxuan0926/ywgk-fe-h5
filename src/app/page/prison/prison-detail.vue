<template>
    <div
      class="detail"
      :class="[
        { 'loading' : fullLoading },
        { 'no-content' : !fullLoading && (!prison || !prison.createdAt) }
      ]">
      <div class="content inner-content"  v-if="prison && prison.createdAt">
          <h3 class="title">{{ prison.title }}</h3>
          <p class="time">发布于  {{ prison.createdAt | formatDate }}</p>
          <img v-if="prison.imageUrl" :src="prison.imageUrl + '?token=' + $store.state.img.imgToken" alt="">
          <div class="prison-detail" v-html="prison.description"></div>
      </div>
    </div>
</template>
<script>
export default {
    props: ['api', 'fullLoading'],
    data() {
        return {
            prison: {}
        }
    },
    mounted() {
        this.render()
        // console.log(this.$route, location)
    },
    methods: {
        render() {
            if (!this.$route.params.id) return
            this.api.getPrisonDetail(this.$route.params.id).then(res => {
                if (res && res.code === 200) {
                    if (!res.data.jails) return
                    let description = res.data.jails.description.replace(/poster="\/static\/images\/video-cover.png"/g, `poster="${ location.pathname }static/images/video-cover.png"`).replace(/(<(\S*?)[^>]*)\sheight="\d*"/g, '$1')
                    res.data.jails.description = description
                    this.prison = res.data.jails
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.detail{
  padding: 0.3rem;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
  word-break:break-all;
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
