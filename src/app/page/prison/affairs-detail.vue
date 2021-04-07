<template>
    <section class="affairs-detail">
        <div class="affairs-detail-title" v-if="affairsData.headline">
            <h3>{{affairsData.headline}}</h3>
        </div>
        <div class="affairs-detail-subhead" v-if="affairsData.subhead">
            <h4>{{affairsData.subhead}}</h4>
        </div>
        <div class="affairs-detail-createtime">发布于 {{affairsData.createTime}}</div>
        <div class="affairs-detail-content" v-if="affairsData.videoUrl">
            <video :src="affairsData.videoUrl" poster="http://qa-ywgk.yuwugongkai.com/static/images/video-cover.png" controls="controls" width="100%"></video></p>
        </div>
        <div class="affairs-detail-content" v-html="affairsData.content"></div>
    </section>
</template>
<script>
import { apiList } from '@/api/index'
export default {
    data() {
        return {
            affairsData: {
                headline: '',
                subhead: '',
                createTime: '',
                content: '',
                videoUrl: ''
            }
        }
    },
    async created() {
        let { data } = await apiList.getAffairsDetail(this.$route.params.id)
        if (data) {
            this.affairsData = {
                headline: data.headline,
                subhead: data.subhead,
                createTime: data.createTime,
                content: data.content,
                videoUrl: data.videoUrl
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .affairs-detail {
        padding: 1rem;
        &-title {
            h3 {
                font-size: 16px;
                font-weight: 600;
                margin: 0;
                color: #333;
            }
        }
        &-subhead {
            h4 {
                font-size: 14px;
                font-weight: 400;
                margin: 5px 0 0;
                color: #555;
            }
        }
        &-createtime {
            font-size: 12px;
            color: #999;
            margin-top: 5px;
        }
        &-content {
            font-size: 14px;
            padding: 1rem 0;
            color: #777;
        }

    }
</style>
