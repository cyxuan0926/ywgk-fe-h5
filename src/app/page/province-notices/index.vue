<template>
  <div class="province-notices">
      <img :src="url" alt="广告图片">
  </div>
</template>

<script>
import { noticeImgSwitchJaild } from '@/common/constants/const'

export default {
    data() {
        return {
            url: {}
        }
    },

    created() {
        const { jaild } = this.$route.query

        const result = (noticeImgSwitchJaild.filter(item => +item.jaild === +jaild))[0]

        const url = result ? result.url : ''

        this.url = url
    }
}
</script>

<style lang="scss" scoped>
.province-notices {
    text-align: center;
}
</style>