<template>
    <dd class="operation-reply-list">
        <dl class="operation-reply-item" v-for="item in list" :key="item.id">
            <dt>
                <span v-if="item.userId == '安帮客服001'" class="operation-reply-link" @click="handleToReply(item.pid)">客服回复：</span>
                <span v-else>我的回复：</span>
            </dt>
            <dd>
                <p>{{ item.context }}</p>
                <p class="operation-reply-item-time">{{ item.createTime }}</p>
            </dd>
        </dl>
    </dd>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    export default {
        props: {
            data: {
                type: Object,
                default() {
                    return {}
                }
            },
            list: {
                type: Array,
                default() {
                    return []
                }
            }
        },

        computed: {
            ...mapGetters(['operationData'])
        },

        methods: {
            ...mapActions(['setOperation']),
            // 点击客服回复
            handleToReply(id) {
                if (!this.operationData.reply) {
                    this.setOperation(JSON.parse(JSON.stringify(this.data)))
                }
                this.$router.push({ path: `/operations/reply/${ id }` })
            }
        }
    }
</script>

<style lang="scss" scoped>
    dd.operation-reply-list {
        padding: .8rem;
        background-color: #F4F6F7;

        .operation-reply-link {
            color: #127BF3;
        }

        .operation-reply-item {
            display: flex;
            margin: 0;
            dt {
                width: 75px;
            }
            dd {
                flex: 1;
                margin: 0;
                color: #666;

                p {
                    margin: 0;
                }
            }
            & + .operation-reply-item {
                margin-top: .5rem;
            }
            &-time {
                font-size: 12px;
                color: #999;
                margin-top: .25rem !important;
            }
        }
    }
</style>