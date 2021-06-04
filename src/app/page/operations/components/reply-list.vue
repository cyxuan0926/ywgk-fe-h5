<template>
    <dd class="operation-reply-list">
        <dl class="operation-reply-item" v-for="item in list" :key="item.id">
            <dt>
                <router-link v-if="item.userId == '安帮客服001'" :to="`/operations/reply/${ item.pid }`">客服回复：</router-link>
                <span>我的回复：</span>
            </dt>
            <dd>
                <p>{{ item.context }}</p>
                <p class="operation-reply-item-time">{{ item.createTime }}</p>
            </dd>
        </dl>
    </dd>
</template>

<script>
    export default {
        props: {
            list: {
                type: Array,
                default: []
            }
        }
    }
</script>

<style lang="scss" scoped>
    dd.operation-reply-list {
        padding: .8rem;
        background-color: #F4F6F7;

        .operation-reply-item {
            display: flex;
            margin: 0;
            dt {
                width: 75px;
                a {
                    color: #127BF3;
                }
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