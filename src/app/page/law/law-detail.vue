<template>
    <div class="law-box">
      <div v-if="loading" class="loading"></div>
      <div v-else-if="law.contents" class="law-content" v-html="law.contents"></div>
      <div v-else class="no-content"></div>
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
                if (!res) return
                res.law.contents = res.law.contents.replace(this.$route.query.tag, `<span id="tag">${ this.$route.query.tag }</span>`)
                this.law = res.law
                this.loading = false
                this.$router.replace({ hash: 'tag', query: this.$route.query })
            })
        }
    }
}
</script>
<style lang="scss" scoped>
</style>
