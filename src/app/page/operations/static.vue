<template>
    <div class="charge-config-container">
        <dl class="charge-config-info">
            <dt><h3>{{ projectName }}</h3></dt>
        </dl>
        <dl class="charge-config-info">
            <dd>
                <div class="charge-config-info-table">
                    <div class="charge-config-info-row charge-config-info-thead">
                        <div class="charge-config-info-cell">问题总数</div>
                        <div class="charge-config-info-cell">回答数</div>
                        <div class="charge-config-info-cell">回复数</div>
                        <div class="charge-config-info-cell">未回复数</div>
                        <div class="charge-config-info-cell">完成率</div>
                    </div>
                    <div class="charge-config-info-row">
                        <div class="charge-config-info-cell">{{ auditSummary.requestNum }}</div>
                        <div class="charge-config-info-cell">{{ auditSummary.answerNum }}</div>
                        <div class="charge-config-info-cell">{{ auditSummary.replyNum }}</div>
                        <div class="charge-config-info-cell">{{ auditSummary.notReplyNum }}</div>
                        <div class="charge-config-info-cell">{{ auditSummary.completionRatio }}</div>
                    </div>
                </div>
            </dd>
        </dl>
        <dl class="charge-config-info">
            <dd>
                <div class="charge-config-info-table">
                    <div class="charge-config-info-row charge-config-info-thead">
                        <div class="charge-config-info-cell" style="width: 100px;">姓名</div>
                        <div class="charge-config-info-cell">回答数</div>
                        <div class="charge-config-info-cell">回复数</div>
                    </div>
                    <div class="charge-config-info-row" v-for="a in auditDetailList" :key="a.id">
                        <div class="charge-config-info-cell">{{ a.name }}</div>
                        <div class="charge-config-info-cell">{{ a.rpAnswerNum }}</div>
                        <div class="charge-config-info-cell">{{ a.rpRplyNum }}</div>
                    </div>
                </div>
                <div v-if="!auditDetailList.length" class="charge-config-info-table charge-config-info-none">
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
                projectName: '',
                auditSummary: {},
                auditDetailList: []
            }
        },
        created() {
            let { uid, auditSection, auditType, appVersion } = this.$route.query || {}
            this.getAuditDetail({
                uid,
                auditSection,
                auditType,
                appVersion
            })
        },
        methods: {
            async getAuditDetail(params) {
                let res = await apiList.getAuditDetail(params)
                if (res && res.result) {
                    let { auditSummary, auditDetail } = res.result
                    this.projectName = auditSummary && auditSummary.projectName
                    this.auditSummary = auditSummary || {}
                    this.auditDetailList = auditDetail || []
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .charge-config {
        &-container {
            padding: 30px 16px 0;
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
                    color: #333;
                    font-weight: 600;
                    text-align: center;
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
                border: 1px solid #ddd;
                width: 100%;
            }
            &-row {
                display: table-row;
            }
            &-cell {
                // width: 130px;
                display: table-cell;
                padding: 8px 6px;
                color: #666;
                font-size: 14px;
                text-align: center;
            }
            &-thead {
                background-color: rgba(6, 117, 255, .15);
                .charge-config-info-cell {
                    color: #0675FF;
                }
            }
            &-none {
                margin-top: -1px;
                .charge-config-info-cell {
                    color: #999;
                    text-align: center;
                    padding: 20px 0;
                }
            }
        }
    }
</style>