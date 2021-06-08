<template>
    <div class="app-layout">
        <van-list
            class="operation-list"
            v-model="loading"
            :finished="finished"
            :immediate-check="false"
            finished-text="没有更多了"
            @load="handleLoad">
            <template v-if="list.length">
                <dl class="operation-item" v-for="item in list">
                    <dt class="operation-item-title" @click="toDetail(item)">{{ item.context }}</dt>
                    <dd v-if="item.uploadProblemFiles && item.uploadProblemFiles.length" class="operation-item-images clearfix" @click="toDetail(item)">
                        <div class="operation-item-images-viewer" v-for="f in item.uploadProblemFiles" :key="f.id">
                            <img :src="`${ imgUrl }/readPartImage?url=${ f.filePath }${ f.uploadFileName }`" :alt="f.uploadFileName">
                        </div>
                    </dd>
                    <dd class="clearfix">
                        <span class="pull-right" @click="toDetail(item)">全文</span>
                        <span class="operation-item-time">{{ item.createTime }}</span>
                    </dd>
                    <reply-list v-if="item.replyList.length" :list="item.replyList" :data="item" />
                    <template v-if="item.replyList.length && item.state != '4'">
                        <dd class="clearfix">
                            <van-button class="operation-item-comment pull-right" type="info" size="small" icon="comment-o" plain @click="toDetail(item)">立即评价</van-button>
                        </dd>
                    </template>
                    <template v-if="item.state == '4'">
                        <evaluate-item :star="item.star" :econtext="item.econtext" :estate="item.estate" type="index" />
                    </template>
                </dl>
            </template>
            <template v-else>
                <div class="app-list-none">
                    <img width="60%" src="../../../assets/images/none-data.png" alt="">
                </div>
            </template>
        </van-list>
        <div class="app-layout-btns">
            <van-button class="app-btn-info" type="info" size="large" block @click="handleClick">创建工单</van-button>
        </div>
    </div>
    
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import { opeartionBaseUrl, apiList } from '@/api/index'
    import replyList from './components/reply-list.vue'
    import evaluateItem from './components/evaluate-item.vue'
    import help from '@/utils/helper'
    export default {
        components: {
            replyList,
            evaluateItem
        },

        computed: {
            ...mapGetters(['operationData', 'userId'])
        },

        data() {
            return {
                imgUrl: opeartionBaseUrl,
                pageIndex: 0,
                pageSize: 10,
                list: [],
                loading: false,
                finished: false
            }
        },

        created() {
            if (!this.userId) {
                this.setUserId(this.$route.query.userId || help.generateId())
            }
            this.handleLoad()
        },

        methods: {
            ...mapActions(['setOperation', 'setUserId']),
            // 查询列表
            async handleLoad() {
                let { data } = await apiList.getOperationsList({
                    userId: this.userId,
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize
                })
                if (data.list && data.list.length) {
                    this.list = [...this.list, ...data.list]
                    this.pageIndex++
                }
                if (this.list.length >= data.total) {
                    this.finished = true
                }
                this.loading = false
            },
            // 跳转到创建工单
            handleClick() {
                this.$router.push({ path: '/operations/add' })
            },
            // 跳转到工单详情
            toDetail(data) {
                this.setOperation(JSON.parse(JSON.stringify(data)))
                this.$router.push({ path: '/operations/detail' })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .operation-list {
        flex: 1;
        overflow: auto;
    }
    .operation-item {
        margin: 0;
        padding: 1rem;
        background-color: #fff;
        margin-bottom: 1.25rem;

        &-title {
            font-size: 14px;
            line-height: 22px;
            color: #333;
            display: -webkit-box; 
            display: -moz-box;  
            white-space: pre-wrap; 
            word-wrap: break-word;
            overflow: hidden; 
            text-overflow: ellipsis; 
            -webkit-box-orient: vertical; 
            -webkit-line-clamp:2;
        }

        dd {
            margin: 0;
            margin-top: 1rem;

            .pull-right {
                color: #127BF3;
            }
        }

        &-images {
            overflow: hidden;

            &-viewer {
                float: left;
                width: 6.25rem;
                height: 6.25rem;
                overflow: hidden;
                border-radius: 4px;
                background-color: #ccc;

                & + & {
                    margin-left: 1rem;
                }
            }
        }

        &-time {
            color: #999;
        }
        
        &-comment {
            border: none;
            height: 20px;
            line-height: 1;

            /deep/ .van-icon {
                margin-top: 4px;
            }
        }
    }
    .app-list-none {
        img {
            display: block;
            margin: 20% auto 0;
        }
    }
</style>