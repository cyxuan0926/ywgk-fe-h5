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
          <div v-html="prison.desc"></div>
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
    },
    methods: {
        render() {
            if (!this.$route.params.id) return
            this.api.getPrisonDetail(this.$route.params.id).then(res => {
                if (res && res.code === 200) {
                    let description = res.data.jails.description
                    console.log(description)
                    description.replace('<video', '<video preload="auto"')
                    res.data.jails.desc = description
                    console.log(res.data.jails.desc)
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
