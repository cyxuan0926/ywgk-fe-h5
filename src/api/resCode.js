export default {
    200: {
        next: true
    },
    201: {
        next: true,
        do: params => {
            if (params.config.url.includes('/users/of-mobile')) {
                params.data = { code: 'signup.register.ok' }
            }
        }
    },
    204: {
        next: true,
        do: params => {
            if (params.config.url.includes('/sms/verification-codes')) {
                params.data = { code: 'signup.verification.ok', message: '短信验证码发送成功' }
            }
        }
    },
    400: {
        next: true,
        do: params => {
            if (params.config.url.includes('/sms/verification-codes')) {
                params.data = { code: 'signup.verification.error', message: params.data || '短信验证码发送失败' }
            }
        }
    },
    401: {
        do: () => {
            router.replace({ path: '/error', query: { error: '未授权：登录失败' } })
        }
    },
    500: {
        do: params => {
            if (!params.config.url.includes('/conventionPersonInfo/h5/apply')) {
                router.replace({ path: '/net-error', query: { r: router.currentRoute.fullPath } })
            }
        }
    },
    502: {
        next: false,
        do: params => {
            router.replace({ path: '/net-error', query: { r: router.currentRoute.fullPath } })
        }
    },
    503: {
        next: false,
        do: params => {
            router.replace({ path: '/net-error', query: { r: router.currentRoute.fullPath } })
        }
    },
    504: {
        next: false,
        do: params => {
            router.replace({ path: '/net-error', query: { r: router.currentRoute.fullPath } })
        }
    }
}
