<template>
  <div>
    <div class="loading" v-if="loading"></div>
    <ul v-else class="tab-view">
      <li v-if="lawList.length==0" class="no-content">暂无相关信息</li>
      <template v-else>
        <li v-for="(item, index) in lawList" :key="index" @click="onNavigate(item.id)">
          <img class="image" :src="'https://www.yuwugongkai.com' + item.image" alt="">
          <span>{{ item.title }}</span>
        </li>
      </template>
    </ul>
  </div>
</template>
<script>
export default {
    props: ['api'],
    data() {
        return {
            lawList: [],
            loading: true
        }
    },
    mounted() {
        this.render()
    },
    methods: {
        render() {
            this.api.getLawList().then(res => {
                if (res && res.code === 200) {
                    this.lawList = res.laws
                    this.loading = false
                }
            })
        },
        onNavigate(e) {
            this.$router.push(`/law-detail?id=${ e }`)
        }
    }
}
</script>
<style lang="scss" scoped>
$text-color: #262626;
.tab-view{
  padding: 0.8rem;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  box-sizing: border-box;
  li{
    width: 33.333%;
    flex-shrink: 0;
    padding: 0.5rem 1rem;
    margin-bottom: 0.3rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    span{
      width: 100%;
      margin-top: 0.5rem;
      line-height: 1.2rem;
      text-align: center;
      box-sizing: border-box;
      flex-shrink: 0;
    }
  }
  .image{
    height: 6rem;
    width: 4.6rem;
    flex-shrink: 0;
    box-shadow: 0 0 0.2rem #999;
  }
  .no-content{
    height: 10rem;
    text-align: center;
    float: none;
    width: 100%;
  }
}
</style>
