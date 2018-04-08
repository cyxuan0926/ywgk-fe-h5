<template>
    <div class="detail">
      <div class="loading" v-if="loading"></div>
      <!-- <div class="content" v-else> -->
        <!-- <h3>{{ law.title }}</h3> -->
        <div class="content" v-html="law.contents"></div>
      <!-- </div> -->
    </div>
</template>
<script>
export default {
    props: ['api'],
    data() {
        return {
            loading: true,
            law: {}
        }
    },
    mounted() {
        this.render()
    },
    methods: {
        render() {
            // 调接口的方式，记住在前面加props: ['api']
            if (!this.$route.params.id) return
            this.api.getLawDetail(this.$route.params.id).then(res => {
                if (res && res.code === 200) {
                    this.law = res.laws[0]
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
  overflow-x: hidden;
}
.content{
  background: #fff;
  border-radius: 0.1rem;
  // box-shadow: 0 0 5px #aaa;
  padding: 1rem 0.3rem;
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  color: #666;
}
</style>
