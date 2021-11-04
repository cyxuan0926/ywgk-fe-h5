<template>
    <div class="app-layout signup-layout">
        <div class="app-layout-contents">
            <div class="signup-layout-card">
                <span class="card-avatar"></span>
                <div class="card-detail">
                    <h3 class="card-detail-title">{{ detailData.name }}</h3>
                    <p>
                        <span class="card-detail-tag">会议日期</span>
                        <span class="card-detail-date">{{ detailData.startTime }}-{{ detailData.endTime }}</span>
                    </p>
                </div>
            </div>
            <div class="signup-layout-card">
                <van-form ref="$form" class="signup-form" validate-first validate-trigger="onSubmit" :show-error="false">
                    <van-cell-group>
                        <van-field
                            v-model="formData.phone"
                            type="tel"
                            name="phone"
                            label="手机号"
                            maxlength="11"
                            placeholder="请输入手机号"
                            required
                            clearable
                            :rules="formRules.phone"
                        />
                        <van-field
                            v-model="formData.verificationCode"
                            type="number"
                            required
                            label="验证码"
                            maxlength="4"
                            placeholder="请输入验证码"
                            :rules="formRules.verificationCode"
                        >
                            <template #button>
                                <van-button class="sms-btn" size="small" type="primary" @click.prevent="handleSmscode" :disabled="isGetSmscode">{{ smsCodeText }}</van-button>
                            </template>
                        </van-field>
                        <van-field
                            v-model="formData.personName"
                            label="姓名"
                            placeholder="请输入姓名"
                            maxlength="10"
                            required
                            clearable
                            :rules="formRules.personName"
                        />
                        <van-field label="性别" required>
                            <template #input>
                                <van-radio-group v-model="formData.gender" direction="horizontal">
                                    <van-radio name="0" icon-size="16px">男</van-radio>
                                    <van-radio name="1" icon-size="16px">女</van-radio>
                                </van-radio-group>
                            </template>
                        </van-field>
                        <van-field
                            v-model="formData.companyName"
                            label="单位名称"
                            placeholder="请输入单位名称"
                            maxlength="30"
                            required
                            clearable
                            :rules="formRules.companyName"
                        />
                        <van-field
                            v-model="formData.jobTitle"
                            label="职务"
                            placeholder="请输入职务"
                            maxlength="10"
                            required
                            clearable
                            :rules="formRules.jobTitle"
                        />
                    </van-cell-group>
                    <van-cell-group v-show="isOpened">
                        <van-field
                            v-model="formData.cardId"
                            label="身份证号"
                            placeholder="请输入身份证号"
                            maxlength="18"
                            clearable
                            :rules="formRules.cardId"
                        />
                        <van-field
                            name="hotelName"
                            v-model="formData.hotelName"
                            label="酒店名称"
                            placeholder="请输入酒店名称"
                            maxlength="20"
                            clearable
                        />
                        <van-field
                            name="stayStartTime"
                            v-model="formData.stayStartTime"
                            label="住宿日期"
                            placeholder="请选择住宿日期"
                            readonly
                            is-link
                            :clickable="false"
                            @click-input.prevent="handleShowCalendar('stayStartTime')"
                        >
                        </van-field>
                        <van-field
                            name="roomRequire"
                            v-model="formData.roomRequire"
                            label="房间要求"
                            placeholder="请输入房间要求"
                            maxlength="20"
                            clearable
                        />
                        <van-field
                            name="arriveTime"
                            v-model="formData.arriveTime"
                            label="到达时间"
                            placeholder="请选择到达时间"
                            readonly
                            is-link
                            :clickable="false"
                            @click-input.prevent="handleShowCalendar('arriveTime')"
                        >
                        </van-field>
                        <van-field
                            name="arriveTrafficInfo"
                            v-model="formData.arriveTrafficInfo"
                            label="到达信息"
                            placeholder="请输入到达车次（航班号）"
                            maxlength="20"
                            clearable
                        />
                        <van-field
                            name="returnTime"
                            v-model="formData.returnTime"
                            label="返程时间"
                            placeholder="请选择返程时间"
                            readonly
                            is-link
                            :clickable="false"
                            @click-input.prevent="handleShowCalendar('returnTime')"
                        >
                        </van-field>
                        <van-field
                            name="returnTrafficInfo"
                            v-model="formData.returnTrafficInfo"
                            label="返程信息"
                            placeholder="请输入返程车次（航班号）"
                            maxlength="20"
                            clearable
                        />
                    </van-cell-group>
                    <div class="btn-open-block">
                        <van-button class="btn-clear" :icon="`arrow-${ isOpened ? 'up' : 'down' }`" size="small" @click.prevent="handleOpen">{{ isOpened ? '收起' : '更多信息（选填）' }}</van-button>
                    </div>
                </van-form>
                <!-- <van-calendar ref="$calendar" v-model="showCalendar" color="#127BF3" @confirm="handlePickerConfirm" /> -->
                <van-popup v-model="showCalendar" position="bottom" safe-area-inset-bottom>
                    <van-datetime-picker
                        v-model="currentDate"
                        type="datetime"
                        :title="currentTitle"
                        :minDate="rangeDate.min"
                        :maxDate="rangeDate.max"
                        :formatter="formatter"
                        @confirm="handlePickerConfirm"
                        @cancel="handlePickerCancel"
                    />
                </van-popup>
            </div>
        </div>
        <div class="app-layout-btns">
            <van-button 
                class="app-btn-info"
                type="info"
                size="large"
                loading-text="报名中..."
                loading-type="spinner"
                block
                :loading="isSubmit"
                @click="handleSubmit"
            >报名参会</van-button>
        </div>
    </div>
</template>

<script>
import { reactive, ref, computed, onUnmounted, nextTick } from '@vue/composition-api'
import { apiList } from '@/api/index'
import moment from 'moment'
import { Toast } from 'vant'

export default {
    setup(props) {
        const $calendar = ref(null)
        const isGetSmscode = ref(false)
        const isSubmit = ref(false)
        const $form = ref(null)
        const isOpened = ref(false)
        const showCalendar = ref(false)
        const currentDate = ref(new Date())
        const rangeDate = reactive({
            min: new Date(),
            max: new Date(moment().year() + 10, 11, 31)
        })
        const currentTitle = ref('')
        const formatterText = {
            'year': '年',
            'month': '月',
            'day': '日',
            'hour': '时',
            'minute': '分'
        }
        const formatter = (type, val) => `${ val }${ formatterText[type] }`
        const detailData = reactive({
            name: '',
            startTime: '',
            endTime: ''
        })
        const formData = reactive({
            conventionId: '',
            phone: '',
            verificationCode: '',
            personName: '',
            gender: '0',
            companyName: '',
            jobTitle: '',
            cardId: '',
            hotelName: '',
            stayStartTime: '',
            roomRequire: '',
            arriveTime: '',
            arriveTrafficInfo: '',
            returnTime: '',
            returnTrafficInfo: ''
        })

        const formRules = {
            phone: [
                {
                    validator: (val) => {
                        if (!val) {
                            Toast('请输入手机号')
                            return false
                        }
                        if (!/^1[3456789]\d{9}$/.test(val)) {
                            Toast('请输入11位手机号')
                            return false
                        }
                        return true
                    }
                }
            ],
            verificationCode: [
                {
                    validator: (val) => {
                        if (!val) {
                            Toast('请输入验证码')
                            return false
                        }
                        return true
                    }
                }
            ],
            personName: [
                {
                    validator: (val) => {
                        if (!val) {
                            Toast('请输入姓名')
                            return false
                        }
                        if (!/^[\u4e00-\u9fa5]+$/.test(val)) {
                            Toast('请输入汉字姓名')
                            return false
                        }
                        return true
                    }
                }
            ],
            companyName: [
                {
                    validator: (val) => {
                        if (!val) {
                            Toast('请输入单位名称')
                            return false
                        }
                        return true
                    }
                }
            ],
            jobTitle: [
                {
                    validator: (val) => {
                        if (!val) {
                            Toast('请输入职务')
                            return false
                        }
                        return true
                    }
                }
            ],
            cardId: [
                {
                    validator: (val) => {
                        if (val && !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(val)) {
                            Toast('请输入15或18位身份证号')
                            return false
                        }
                        return true
                    }
                }
            ]
        }

        const smsCountdown = ref(60)
        const smsInterval = ref(null)
        const smsCodeText = computed(() => `${ !smsInterval.value ? '获取验证码' : `重发(${ smsCountdown.value }s)` }`)

        // 验证码倒计时
        const setSmsCountdown = () => {
            if (!smsInterval.value) {
                smsInterval.value = setInterval(() => {
                    smsCountdown.value--
                    if (!smsCountdown.value) {
                        smsCountdown.value = 60
                        isGetSmscode.value = false
                        clearInterval(smsInterval.value)
                        smsInterval.value = null
                    }
                }, 1000)
            }
        }

        // 获取验证码
        const handleSmscode = async () => {
            if (isGetSmscode.value) {
                return
            }
            try {
                isGetSmscode.value = true
                await $form.value.validate('phone')
                let res = await apiList.sendVerificationCode(formData.phone)
                if (res.code && res.code === 'signup.verification.ok') {
                    setSmsCountdown()
                }
                else {
                    isGetSmscode.value = false
                }
                res.message && Toast(res.message)
            }
            catch (error) {
                isGetSmscode.value = false
            }
        }

        // 处理日期时间
        const _resetSubmitData = () => {
            let _data = Object.assign({}, formData)
            if (_data.stayStartTime) {
                _data.stayStartTime = `${ _data.stayStartTime } 00:00:00`
            }
            if (_data.arriveTime) {
                _data.arriveTime = `${ _data.arriveTime }:00`
            }
            if (_data.returnTime) {
                _data.returnTime = `${ _data.returnTime }:00`
            }
            // 支付类型设置为 0 线上 1 线下已支付 2 会员免费
            _data.payType = '2'
            return _data
        }

        // 提交报名
        const handleSubmit = async () => {
            if (isSubmit.value) {
                return
            }
            try {
                Toast.clear()
                isSubmit.value = true
                await $form.value.validate()
                // 1 使用此手机号注册
                let res = await apiList.signupRegister({
                    phoneNumber: formData.phone,
                    verificationCode: formData.verificationCode
                })
                // 2 如果已注册或注册成功 则登录获取token
                if (res.code && (res.code === 'signup.register.ok' || res.code === 'user.PhoneNumberExisted')) {
                    res = await apiList.signupLogin({
                        username: formData.phone,
                        password: formData.verificationCode,
                        mode: 'sms_verification_code',
                        grant_type: 'password'
                    })
                    // 3 登录成功得到token 调用报名接口
                    if (res.access_token) {
                        res = await apiList.signupApply(_resetSubmitData(), `${ res.token_type } ${ res.access_token }`)
                        if (res) {
                            window.router.push({
                                path: '/conference/sign-result',
                                query: {
                                    code: res.code,
                                    message: res.message || res.msg
                                }
                            })
                        }
                    }
                    else {
                        if (res.message) {
                            Toast(res.message)
                        }
                    }
                }
                isSubmit.value = false
            }
            catch (error) {
                isSubmit.value = false
            }
        }

        // 收起展开
        const handleOpen = () => {
            isOpened.value = !isOpened.value
        }

        let currentDateField = ''
        let titleText = {
            stayStartTime: '住宿日期',
            arriveTime: '到达时间',
            returnTime: '返程时间'
        }
        // 弹出日期选择器
        const handleShowCalendar = (flag) => {
            currentDateField = flag
            let isStayStartTime = flag === 'stayStartTime'
            let _val = formData[ flag ]
            currentTitle.value = `请选择${ titleText[ flag ] }`
            currentDate.value = _val ? moment(_val, `YYYY-MM-DD${ isStayStartTime ? '' : ' HH:mm' }`).toDate() : moment().toDate()
            // $calendar.value.reset(_val ? moment(_val, 'YYYY-MM-DD').toDate() : moment().toDate())
            showCalendar.value = true
            nextTick(() => {
                let els = Array.from(document.querySelectorAll('.van-picker-column'))
                if (els && els.length) {
                    els.forEach((el, i) => {
                        el.style.display = isStayStartTime && i > 2 ? 'none' : 'block'
                    })
                }
            })
        }
        // 弹出日期选择器-确认
        const handlePickerConfirm = val => {
            formData[ currentDateField ] = moment(val).format(`YYYY-MM-DD${ currentDateField === 'stayStartTime' ? '' : ' HH:mm' }`)
            showCalendar.value = false
        }
        // 弹出日期选择器-关闭
        const handlePickerCancel = () => {
            showCalendar.value = false
        }

        // 查询会议详情
        const _queryDetail = async () => {
            let _router = window.router && window.router.currentRoute
            let _id = _router && _router.query && _router.query.id
            if (_id) {
                formData.conventionId = _id
                let { data } = await apiList.getConferenceDetail(_id)
                if (data) {
                    detailData.name = data.name
                    detailData.startTime = data.startTime
                    detailData.endTime = data.endTime
                    // 判断是否已过报名截止日期 定义999为已过期特殊code
                    if (data.deadline && moment().diff(moment(data.deadline, 'YYYY-MM-DD HH:mm:ss')) > 0) {
                        window.router.push({
                            path: '/conference/sign-result',
                            query: {
                                code: '999',
                                message: '此会议已过期'
                            },
                            replace: true
                        })
                    }
                }
            }
        }
        _queryDetail()

        // 销毁倒计时
        onUnmounted(() => {
            if (smsInterval.value) {
                clearInterval(smsInterval.value)
                smsInterval.value = null
            }
        })

        return {
            $calendar,
            $form,
            detailData,
            formData,
            formRules,
            isSubmit,
            isGetSmscode,
            smsCodeText,
            handleSmscode,
            isOpened,
            currentDate,
            currentTitle,
            rangeDate,
            formatter,
            showCalendar,
            handleOpen,
            handleShowCalendar,
            handlePickerConfirm,
            handlePickerCancel,
            handleSubmit
        }
    }
}
</script>

<style lang="scss" scoped>
    .signup-layout {
        background: #F3F5F8 url('../../../assets/images/sign-up-bg.png') no-repeat left top;
        background-size: 100% auto;
        padding-bottom: constant(safe-area-inset-bottom);
        padding-bottom: env(safe-area-inset-bottom);

        .app-layout-contents {
            padding: 3.6rem 1.25rem 2.3rem;
        }

        &-card {
            display: flex;
            background-color: #fff;
            border-radius: .5rem;
            padding: 1.25rem;
            margin-bottom: 1rem;

            .card-avatar {
                display: block;
                width: 4.16rem;
                height: 4.16rem;
                background: url('../../../assets/images/sign-up-avatar.png') no-repeat left top;
                background-size: 100% 100%;
                margin-right: 1rem;
            }

            .card-detail {
                flex: 1;

                &-title {
                    font-size: 16px;
                    font-weight: 600;
                    margin: 0;
                    margin-bottom: .75rem;
                    word-break: break-all;
                }

                p {
                    margin: 0;
                    display: flex;
                    align-items: center;
                }

                &-tag {
                    display: inline-block;
                    width: 5.58rem;
                    height: 1.83rem;
                    line-height: 1.83rem;
                    text-align: center;
                    color: #fff;
                    background: url('../../../assets/images/sign-up-tag.png') no-repeat left top;
                    background-size: 100% auto;
                    margin-right: 1rem;
                }
            }
        }

        .signup-form {
            .sms-btn {
                background: linear-gradient(180deg, #6BC4FF 0%, #3991FF 100%);
                border: none;
                padding: 0 10px;
                height: 28px;
                line-height: 28px;
            }
            .btn-clear {
                border: none;
                background: none;
            }
            .btn-open-block {
                width: 100%;
                padding: .75rem 0 0;
                text-align: center;

                .btn-clear {
                    color: #999;
                }

                .btn-clear:active::before {
                    opacity: 0;
                }
            }
        }

        /deep/ .van-field__label {
            color: #323232;
        }
        
        /deep/ .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after {
            display: none;
        }

        /deep/ .van-picker__confirm {
            color: #1989fa;
        }

        /deep/ .van-picker__title {
            font-weight: 600;
            font-size: 14px;
        }

        /deep/ .van-picker-column {
            font-size: 13px;
        }

        /deep/ .van-cell {
            font-size: 13px;
        }

        /deep/ .van-cell:last-child::after {
            display: block;
        }
    }
</style>