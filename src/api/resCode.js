export default {
    200: {
        next: true
    },
    401: {
        do: () => {
            router.replace({ path: '/error', query: { error: '未授权：登录失败' } })
        }
    },
    500: {
        do: params => {
            router.replace({ path: '/net-error', query: { r: router.currentRoute.fullPath } })
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
