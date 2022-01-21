<template>
    <div class="charge-config-container">
        <dl class="charge-config-info">
            <dt><h3>一、收费说明</h3></dt>
            <dd>亲情电话和可视电话以分钟为计费单位，通话时长不足1分钟按1分钟收取费用。</dd>
        </dl>
        <dl class="charge-config-info">
            <dt><h3>二、亲情电话收费标准</h3></dt>
            <dd>
                <div class="charge-config-info-table">
                    <div class="charge-config-info-row charge-config-info-thead">
                        <div class="charge-config-info-cell" style="width: 100px;">目的地</div>
                        <div class="charge-config-info-cell">基础通话时长（分钟）</div>
                        <div class="charge-config-info-cell">基础通话收费（元）</div>
                        <div class="charge-config-info-cell">基础时长后每分钟费用（元）</div>
                    </div>
                    <div class="charge-config-info-row" v-for="c in chargeList" :key="c.id">
                        <div class="charge-config-info-cell">{{ c.destinationName }}</div>
                        <div class="charge-config-info-cell charge-config-info-center">{{ c.startMinutesVoice }}</div>
                        <div class="charge-config-info-cell charge-config-info-center">{{ c.startMoneyVoice }}</div>
                        <div class="charge-config-info-cell charge-config-info-center">{{ c.fixedMoneyVoice }}</div>
                    </div>
                </div>
                <div v-if="!chargeList.length" class="charge-config-info-table charge-config-info-none">
                    <div class="charge-config-info-row">
                        <div class="charge-config-info-cell">暂无数据</div>
                    </div>
                </div>
            </dd>
        </dl>
        <dl class="charge-config-info">
            <dt><h3>三、可视电话收费标准</h3></dt>
            <dd>
                <div class="charge-config-info-table">
                    <div class="charge-config-info-row charge-config-info-thead">
                        <div class="charge-config-info-cell" style="width: 100px;">目的地</div>
                        <div class="charge-config-info-cell">基础通话时长（分钟）</div>
                        <div class="charge-config-info-cell">基础通话收费（元）</div>
                        <div class="charge-config-info-cell">基础时长后每分钟费用（元）</div>
                    </div>
                    <div class="charge-config-info-row" v-for="c in chargeList" :key="c.id">
                        <div class="charge-config-info-cell">{{ c.destinationName }}</div>
                        <div class="charge-config-info-cell charge-config-info-center">{{ c.startMinutesVisual }}</div>
                        <div class="charge-config-info-cell charge-config-info-center">{{ c.startMoneyVisual }}</div>
                        <div class="charge-config-info-cell charge-config-info-center">{{ c.fixedMoneyVisual }}</div>
                    </div>
                </div>
                <div v-if="!chargeList.length" class="charge-config-info-table charge-config-info-none">
                    <div class="charge-config-info-row">
                        <div class="charge-config-info-cell">暂无数据</div>
                    </div>
                </div>
            </dd>
        </dl>
    </div>
</template>

<script>
    import { apiList } from '@/api/index'
    export default {
        data() {
            return {
                chargeList: []
            }
        },
        created() {
            this.getChargeConfig()
        },
        methods: {
            async getChargeConfig() {
                let res = await apiList.getChargeConfig(this.$route.params && this.$route.params.id)
                // 中国大陆 86 中国香港 852 中国澳门 853 中国台湾 886
                let codes = ['86', '852', '853', '886']
                if (res && res.data) {
                    let _first = []
                    let _res = []
                    res.data.forEach(d => {
                        codes.includes(d.destinationCode) ? _first.push(d) : _res.push(d)
                    })
                    _first.sort((a, b) => parseInt(b) - parseInt(a))
                    this.chargeList = [ ..._first, ..._res ]
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .charge-config {
        &-container {
            padding: 16px;
            background-color: #fff;
        }
        &-info {
            margin: 0;
            & + & {
                margin-top: 24px;
            }
            dt {
                margin: 0;
                h3 {
                    margin: 0 0 10px;
                    font-size: 16px;
                    color: #158CF1;
                    font-weight: 600;
                }
            }
            dd {
                margin: 0;
                font-size: 14px;
                color: #333;
            }
            &-table {
                display: table;
                table-layout: auto;
                border-right: 1px solid #ddd;
            }
            &-row {
                display: table-row;
            }
            &-cell {
                // width: 130px;
                display: table-cell;
                padding: 8px 6px;
                border-left: 1px solid #ddd;
                border-bottom: 1px solid #ddd;
                color: #666;
                font-size: 14px;
            }
            &-center {
                text-align: center;
            }
            &-thead {
                background-color: #E8E8E8;
                .charge-config-info-cell {
                    color: #333;
                }
            }
            &-none {
                width: 588px;
                .charge-config-info-cell {
                    color: #999;
                    text-align: center;
                    padding: 20px 0;
                }
            }
        }
    }
</style>