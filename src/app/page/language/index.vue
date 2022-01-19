<template>
    <div :class="[ 'language-container', isOper ? 'bg-oper' : 'bg-lan' ]">
        <van-image v-for="url in urls" :key="url" :src="url" width="100%" lazy-load />
    </div>
</template>

<script>
    import { languageLazyUrls } from '@/common/constants'
    export default {
        data() {
            return {
                isOper: this.$route.path.includes('oper'),
                urls: languageLazyUrls[this.$route.params.type]
            }
        }
    }
</script>

<style lang="scss" scoped>
    .language-container {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding-bottom: 16px;
        overflow-x: hidden;
        overflow-y: auto;
        &.bg-lan {
            background-color: #E9FEED;
        }
        &.bg-oper {
            background-color: #45B9F5;
        }
        /deep/ .van-image {
            display: block;
            overflow: hidden;
        }
    }
</style>