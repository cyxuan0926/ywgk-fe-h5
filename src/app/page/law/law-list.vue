<template>
  <div :class="[
    { 'loading' : fullLoading },
    { 'no-content' : !fullLoading && !lawList.length }
  ]">
    <template v-if="!fullLoading && lawList.length">
      <ul
        v-for="(item, index) in lawList"
        :key="index"
        class="tab-view">
        <template v-for="(law, order) in item">
          <li
            :key="order"
            @click="onNavigate(law.id, law.tag)">
            <img
              class="image"
              :src="law.image_url + '?token=523b87c4419da5f9186dbe8aa90f37a3876b95e448fe2a'" alt="">
            <span>{{ law.title }}</span>
          </li>
        </template>
      </ul>
    </template>
  </div>
</template>
<script>
export default {
    props: ['api', 'fullLoading'],
    data() {
        return {
            lawList: []
        }
    },
    mounted() {
        this.render()
    },
    methods: {
        render() {
            this.api.getLawRelated(this.$route.query.prisonerId).then(res => {
                if (!res) return
                let lawList = []
                res.laws.forEach((item, index) => {
                    if (index % 3 === 0) {
                        lawList.push([])
                    }
                    lawList[parseInt(index / 3)].push(item)
                })
                this.lawList = lawList
            })
        },
        onNavigate(e, tag) {
            this.$router.push({ path: `/law/detail/${ e }`, query: { tag: tag } })
        }
    }
}
</script>
<style lang="scss" scoped>
$text-color: #262626;
.tab-view{
  padding: 0.4rem 0.8rem;
  overflow: hidden;
  box-sizing: border-box;
  li{
    width: 33.333333%;
    float: left;
    padding: 0.5rem 1rem;
    margin-bottom: 0.3rem;
    box-sizing: border-box;
    span{
      width: 100%;
      display: block;
      margin-top: 0.5rem;
      line-height: 1.2rem;
      text-align: center;
      box-sizing: border-box;
    }
  }
  .image{
    height: 6rem;
    width: 4.6rem;
    display: block;
    margin: auto;
    box-shadow: 0 0 0.2rem #999;
  }
}
.no-content{
  line-height: 10rem;
  text-align: center;
  width: 100%;
}

</style>
