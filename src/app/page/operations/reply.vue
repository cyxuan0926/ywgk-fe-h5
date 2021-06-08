<template>
    <div class="operation-reply">
        <van-cell-group>
            <van-cell title="我的回复：" />
            <van-cell>
                <template #title>
                    <van-field
                        class="operation-textarea"
                        v-model="context"
                        rows="5"
                        autosize
                        type="textarea"
                        maxlength="300"
                        placeholder="请输入回复内容"
                        show-word-limit />
                </template>
            </van-cell>
        </van-cell-group>
        <div class="app-layout-btns" style="background-color: #fff;">
            <van-button class="app-btn-info" :loading="loading" type="info" size="large" loading-type="spinner" loading-text="提交中..." block @click="handleClick">提 交</van-button>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import { apiList } from '@/api/index'
    import moment from 'moment'
    export default {
        data() {
            return {
                loading: false,
                context: ''
            }
        },

        computed: {
            ...mapGetters(['operationData', 'userId'])
        },

        methods: {
            ...mapActions(['setOperation']),
            // 提交回复
            async handleClick() {
                if (this.loading) {
                    return
                }
                if (!this.context) {
                    this.$toast('请输入回复内容')
                    return
                }
                this.loading = true
                let { data } = await apiList.addReplys({
                    userId: this.userId,
                    pid: this.operationData.problemId,
                    context: this.context
                })
                if (data) {
                    this.$toast({
                        type: 'success',
                        message: '提交成功',
                        onClose: () => {
                            let clone = JSON.parse(JSON.stringify(this.operationData))
                            clone.replyList.push({
                                id: `${ Math.random() }`.replace('.', ''),
                                pid: this.operationData.problemId,
                                context: this.context,
                                createTime: moment().format('YYYY-MM-DD HH:mm:ss')
                            })
                            this.setOperation(clone)
                            this.$router.back()
                        }
                    })
                }
                else {
                    this.$toast('提交失败')
                }
                this.loading = false
            }
        }
    }
</script>

<style lang="scss" scoped>
    .operation-reply {
        .operation-textarea {
            padding: 0 !important;
        }
        /deep/ .van-cell-group {
            margin-bottom: 1rem;
        }
        /deep/ .van-field__control {
            background-color: #F4F6F7;
            padding: .5rem 1rem;
        }
        /deep/ .van-cell::after {
            display: none;
        }

        /deep/ [class*=van-hairline]::after {
            display: none;
        }
    } 
</style>