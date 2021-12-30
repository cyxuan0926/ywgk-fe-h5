<template>
    <section :class="['evaluate-item', type === 'index' ? 'evaluate-item-index' : '']">
        <van-cell-group>
            <van-cell>
                <template slot="title">
                    <span class="evaluate-item-label">服务：</span>
                    <van-rate v-model="star" color="#E8A341" void-color="#E8A341" readonly />
                </template>
            </van-cell>
            <van-cell>
                <template slot="title">
                    <span class="evaluate-item-label">评价：</span>
                    <span class="evaluate-item-text">{{ econtext }}</span>
                </template>
            </van-cell>
            <van-cell>
                <template slot="title">
                    <span class="evaluate-item-label">是否解决问题：</span>
                    <span class="evaluate-item-text">{{ estate == '1' ? '是' : '否'}}</span>
                </template>
            </van-cell>
        </van-cell-group>
    </section>
</template>

<script>
    export default {
        props: {
            type: {
                type: String,
                default: ''
            },
            star: {
                type: Number,
                default: 0
            },
            econtext: {
                type: String,
                default: ''
            },
            estate: {
                type: String,
                default: '1'
            }
        }
    }
</script>

<style lang="scss" scoped>
    .evaluate-item {
        /deep/ .van-cell__title {
            display: flex;
        }

        /deep/ .van-cell::after {
            display: none;
        }

        /deep/ [class*=van-hairline]::after {
            display: none;
        }

        &-label {
            min-width: 50px;
            margin-right: .5rem;
        }

        &-text {
            color: #999;
        }
    }
    .evaluate-item-index {
        padding-top: 1rem;
        /deep/ .van-cell {
            padding: 3px 0;
        }
    }
</style>