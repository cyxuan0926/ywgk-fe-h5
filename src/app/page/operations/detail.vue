<template>
    <div class="app-layout">
        <div class="operation-detail">
            <div class="operation-detail-content">
                <dl class="operation-detail-item">
                    <dt>{{ operationData.context }}</dt>
                    <dd class="operation-detail-image" v-for="f in operationData.uploadProblemFiles" :key="f.id">
                        <img :src="`${ imgUrl }/readPartImage?url=${ f.filePath }${ f.uploadFileName }`" :alt="f.uploadFileName">
                    </dd>
                    <dd class="operation-detail-time">{{ operationData.createTime }}</dd>
                    <reply-list v-if="operationData.replyList && operationData.replyList.length" :list="operationData.replyList" />
                </dl>
            </div>
            <div class="operation-detail-content" style="padding: .5rem 0;" v-if="operationData.replyList && operationData.replyList.length">
                <template v-if="operationData.state != '4'">
                    <van-cell-group>
                        <van-cell>
                            <template slot="title">
                                <span class="operation-detail-label">服务：</span>
                                <van-rate v-model="operationData.star" color="#E8A341" void-color="#E8A341" />
                            </template>
                        </van-cell>
                        <van-cell>
                            <template slot="title">
                                <van-field
                                    class="operation-textarea"
                                    v-model="operationData.econtext"
                                    rows="5"
                                    autosize
                                    type="textarea"
                                    maxlength="500"
                                    placeholder="请填写本次服务评价"
                                    show-word-limit />
                            </template>
                        </van-cell>
                        <van-cell>
                            <template slot="title">
                                <span class="operation-detail-label">是否解决问题：</span>
                                <van-radio-group v-model="operationData.estate" direction="horizontal">
                                    <van-radio name="1" shape="square" icon-size="16px">是</van-radio>
                                    <van-radio name="2" shape="square" icon-size="16px">否</van-radio>
                                </van-radio-group>
                            </template>
                        </van-cell>
                    </van-cell-group>
                </template>
                <template v-else>
                    <evaluate-item :star="operationData.star" :econtext="operationData.econtext" :estate="operationData.estate" />
                </template>
            </div>
        </div>
        <div class="app-layout-btns">
            <van-button class="app-btn-info" v-if="operationData.replyList && operationData.replyList.length && operationData.state != '4'" :loading="loading" type="info" size="large" loading-type="spinner" loading-text="提交中..." block @click="handleClick">提 交</van-button>
            <van-button class="app-btn-info" v-else type="info" size="large" to="/operations/list" block>返 回</van-button>
        </div>  
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import { opeartionBaseUrl, apiList } from '@/api/index'
    import replyList from './components/reply-list.vue'
    import evaluateItem from './components/evaluate-item.vue'
    export default {
        components: {
            replyList,
            evaluateItem
        },

        data() {
            return {
                imgUrl: opeartionBaseUrl,
                loading: false
            }
        },

        computed: {
            ...mapGetters(['operationData', 'userId'])
        },

        created() {
            if (this.operationData.state !== '4') {
                this.operationData.estate = '1'
            }
        },

        methods: {
            ...mapActions(['setOperation']),
            // 提交评价
            async handleClick() {
                if (this.loading) {
                    return
                }
                if (!this.operationData.econtext) {
                    this.$toast('请填写服务评价')
                    return
                }
                this.loading = true
                let { problemId, star, econtext, estate } = this.operationData
                star = star || 5
                let { data } = await apiList.addEvaluates({
                    userId: this.userId,
                    pid: problemId,
                    star,
                    econtext,
                    estate
                })
                if (data) {
                    this.$toast({
                        type: 'success',
                        message: '提交成功',
                        onClose: () => {
                            this.loading = false
                            this.operationData.state = '4'
                            this.operationData.star = star
                            this.setOperation(JSON.parse(JSON.stringify(this.operationData)))
                        }
                    })
                }
                else {
                    this.loading = false
                    this.$toast('提交失败')
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .operation-detail {
        flex: 1;
        overflow: auto;

        &-content {
            background-color: #fff;
            padding: 1rem;
            margin-bottom: 1.25rem;
        }

        &-time {
            color: #999;
        }

        /deep/ &-content .van-cell__title {
            display: flex;
        }

        /deep/ &-content .van-cell::after {
            display: none;
        }

        /deep/ &-content [class*=van-hairline]::after {
            display: none;
        }

        /deep/ &-content .van-field__control {
            background-color: #F4F6F7;
            padding: .5rem 1rem;
        }

        &-item {
            margin: 0;
            dd {
                margin: 0;
                margin-top: 1rem;
            }
        }

        &-label {
            min-width: 50px;
            margin-right: .5rem;
        }
    }
    .operation-textarea {
        padding: 0 !important;
    }
</style>