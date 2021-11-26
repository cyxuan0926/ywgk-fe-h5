<template>
  <div class="province-notices">
      <img :src="url" alt="广告图片">
  </div>
</template>

<script>
import { ImgSwitchId } from '../constants/const'

export default {
    data() {
        return {
            url: ''
        }
    },

    created() {
        const { id } = this.$route.params
        const result = ImgSwitchId.filter(item => +item.id === +id)[0]
        this.url = result.url
    }
}
</script>

<style lang="scss" scoped>
.province-notices {
    text-align: center;
}
</style>