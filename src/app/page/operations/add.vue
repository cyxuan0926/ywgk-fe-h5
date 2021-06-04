<template>
    <van-form class="app-layout" validate-first @submit="handleSubmit">
        <div class="operation-form">
            <van-cell-group>
                <van-cell title="（单选）请选择需要运维的系统" />
                <van-cell>
                    <template #title>
                        <van-field name="xitongName">
                            <template #input>
                                <van-radio-group v-model="xitongName">
                                    <van-radio name="全国安置帮教工作信息系统">全国安置帮教工作信息系统</van-radio>
                                </van-radio-group>
                            </template>
                        </van-field>
                    </template>
                </van-cell>
            </van-cell-group>
            <van-cell-group>
                <van-cell required title="请补充详细问题和意见" />
                <van-cell>
                    <template #title>
                        <van-field
                            name="context"
                            class="operation-textarea"
                            v-model="context"
                            rows="5"
                            autosize
                            type="textarea"
                            maxlength="500"
                            placeholder="请输入不少于10个字的描述"
                            show-word-limit 
                            :rules="rules.context" />
                    </template>
                </van-cell>
            </van-cell-group>
            <van-cell-group>
                <van-cell title="请提供相关问题的截图或照片（最多4张）" />
                <van-cell>
                    <template #title>
                        <van-field name="uploader">
                            <template #input>
                                <van-uploader v-model="fileList" :max-count="4" :after-read="handleAfterRead" />
                            </template>
                        </van-field>
                    </template>
                </van-cell>
            </van-cell-group>
            <van-cell-group>
                <van-field
                    v-model="lianxiren"
                    required
                    clearable
                    name="lianxiren"
                    label="联系人"
                    maxlength="20"
                    placeholder="请输入联系人姓名"
                    :rules="rules.lianxiren" />
                <van-field
                    v-model="phone"
                    required
                    clearable
                    name="phone"
                    label="手机号"
                    maxlength="11"
                    placeholder="请输入手机号" 
                    :rules="rules.phone" />
                <van-field
                    readonly
                    required
                    is-link
                    name="area"
                    :value="area"
                    label="所在地区"
                    placeholder="请选择所在地区县、乡镇等"
                    @click="handleAreaShow"
                    :rules="rules.area" />
                <van-popup v-model="showAreaPicker" round position="bottom">
                    <van-cascader
                        v-model="areaValue"
                        title="请选择所在地区"
                        active-color="#127BF3"
                        :options="areaOptions"
                        :field-names="{'value': 'id'}"
                        @close="handleAreaClose"
                        @change="handleAreaChange"
                        @finish="handleAreaFinish" />
                </van-popup>
                <van-field
                    v-model="sbDanwei"
                    required
                    clearable
                    name="sbDanwei"
                    label="上报单位"
                    maxlength="50"
                    placeholder="请输入司法所/监狱单位名称"
                    :rules="rules.sbDanwei" />
            </van-cell-group>  
        </div>
        <div class="app-layout-btns">
            <van-button type="info" size="large" native-type="submit" block>提 交</van-button>
        </div>
    </van-form>
</template>

<script>
    import { apiList } from '@/api/index'
    export default {
        data() {
            return {
                xitongName: '全国安置帮教工作信息系统',
                context: '',
                fileList: [],
                lianxiren: '',
                phone: '',
                showAreaPicker: false,
                area: '',
                areaValue: '',
                areaCodes: [],
                areaOptions: [
                    {
                        text: '浙江省',
                        id: '330000',
                        children: [{ text: '杭州市', id: '330100' }]
                    },
                    {
                        text: '江苏省',
                        id: '320000',
                        children: [{ text: '南京市', id: '320100' }]
                    }
                ],
                sbDanwei: '',
                rules: {
                    context: [
                        {
                            validator: (val) => {
                                if (!val || val.length < 10) {
                                    this.$toast('请输入不少于10个字的描述')
                                    return false
                                }
                                return true
                            }
                        }
                    ],
                    lianxiren: [
                        {
                            validator: (val) => {
                                if (!val) {
                                    this.$toast('请输入联系人姓名')
                                    return false
                                }
                                return true
                            }
                        }
                    ],
                    phone: [
                        {
                            validator: (val) => {
                                if (!val) {
                                    this.$toast('请输入手机号')
                                    return false
                                }
                                if (!/^1[3456789]\d{9}$/.test(val)) {
                                    this.$toast('请输入正确的手机号')
                                    return false
                                }
                                return true
                            }
                        }
                    ],
                    area: [
                        {
                            validator: (val) => {
                                if (!val) {
                                    this.$toast('请选择所在地区')
                                    return false
                                }
                                val = val.split('/')
                                if (val.length < 4) {
                                    this.$toast(`请选择到街道`)
                                    return false
                                }
                                return true
                            }
                        }
                    ],
                    sbDanwei: [
                        {
                            validator: (val) => {
                                if (!val) {
                                    this.$toast('请输入司法所/监狱单位名称')
                                    return false
                                }
                                return true
                            }
                        }
                    ]
                }
            }
        },

        created() {
            this.setProvinces()
        },

        methods: {
            // 获取省
            async setProvinces() {
                let { data } = await apiList.getDivisionCode('')
                this.areaOptions = data || []
            },
            // 设置省市区街道入参
            resetDivisonParams(target) {
                let divisionFields = ['sheng', 'shi', 'qu', 'jiedao']
                divisionFields.forEach((n, i) => {
                    let _code = this.areaCodes[i]
                    target[`${ n }Name`] = _code.text
                    target[`${ n }Code`] = _code.id
                })
            },
            // 图片上传
            async handleAfterRead(f) {
                f.status = 'uploading'
                f.message = '上传中...'
                const formData = new FormData()
                formData.append('file', f.file)
                let { data } = await apiList.uploadOperationsFile(formData)
                if (data) {
                    f.status = ''
                    f.message = ''
                    f.res = data
                }
                else {
                    f.status = 'failed'
                    f.message = '上传失败'
                }
            },
            // 显示级联菜单
            handleAreaShow() {
                this.showAreaPicker = true
            },
            // 关闭级联菜单
            handleAreaClose() {
                this.showAreaPicker = false
            },
            // 异步加载下一级节点后处理data
            setAreaData(source, pid, childs) {
                if (source && source.length) {
                    source.forEach(s => {
                        if (s.id === pid) {
                            !s.children && (s.children = childs)
                        }
                        else {
                            s.children && this.setAreaData(s.children, pid, childs)
                        }
                    })
                }
            },
            // 省市区级联下拉选择 动态加载下一级
            async handleAreaChange({ selectedOptions, value }) {
                let current = selectedOptions[ selectedOptions.length - 1 ]
                if (!current.children || !current.children.length) {
                    let { data } = await apiList.getDivisionCode(value)
                    if (data && data.length) {
                        let clone = JSON.parse(JSON.stringify(this.areaOptions))
                        this.setAreaData(clone, value, data)
                        this.areaOptions = clone
                    }
                }
            },
            // 省市区级联下拉选择 选择节点
            handleAreaFinish({ selectedOptions }) {
                if (selectedOptions && selectedOptions.length) {
                    this.area = selectedOptions.map(s => s.text).join('/')
                    this.areaCodes = selectedOptions.map(s => ({
                        id: s.id,
                        text: s.text
                    }))
                }
            },
            // 校验成功 提交工单
            async handleSubmit(values) {
                let params = {
                    userId: '13429897824',
                    xitongName: values.xitongName,
                    context: values.context,
                    lianxiren: values.lianxiren,
                    phone: values.phone,
                    sbDanwei: values.sbDanwei
                }
                // 重置省市区街道code
                this.resetDivisonParams(params)
                // 获取工单上传的图片
                if (values.uploader && values.uploader.length) {
                    params.fileIds = values.uploader.map(v => v.res && v.res.id).join(',')
                }
                // 提交工单
                let { data } = await apiList.addOperations(params)
                if (data) {
                    this.$toast({
                        type: 'success',
                        message: '创建工单成功',
                        onClose: () => this.$router.push('/operations/list')
                    })
                }
                else {
                    this.$toast('创建工单失败')
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    /deep/ .van-cell-group {
        margin-bottom: 1.25rem;
    }
    /deep/ .van-field__word-limit {
        color: #999;
    }
    .operation-textarea {
        padding: 0 !important;
    }
    .operation-form {
        flex: 1;
        overflow: auto;
    }
</style>