<template>
    <div
      class="law-box"
      :class="[
        { 'loading' : fullLoading },
        { 'no-content' : !fullLoading && !law.contents }
      ]">
      <div
        v-if="!fullLoading && law.contents"
        class="law-content"
        v-html="law.contents"></div>
    </div>
</template>
<script>
export default {
    props: ['api', 'fullLoading'],
    data() {
        return {
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
                if (!res.law) return
                let tag = this.$route.query.tag.split('**')[0]
                res.law.contents = res.law.contents.replace(tag, `<span id="tag">${ tag }</span>`)
                this.law = res.law
                this.$router.replace({ hash: 'tag', query: this.$route.query })
            })
        }
    }
}
</script>
<style lang="scss" scoped>
</style>
