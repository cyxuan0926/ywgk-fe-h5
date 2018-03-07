<template>
  <div>
    <div class="loading" v-if="loading"></div>
    <ul v-else class="tab-view">
      <li v-for="(item, index) in lawList" :key="index" @click="onNavigate(item.id)">
        <span>{{ item.title }}</span>
        <i class="iconfont icon-iconfontjiantou5"></i>
      </li>
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
