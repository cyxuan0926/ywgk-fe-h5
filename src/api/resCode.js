const tips = (msg = '请求失败') => {
    // console.log(msg)
}

export default {
    400: {
        next: false,
        do: rs => {
            tips('error')
        }
    },
    401: {
        next: false,
        do: rs => {
            router.push({ path: '/login' })
        }
    },
    404: {
        next: false,
        do: rs => {
            tips('not found')
        }
    },
    405: {
        next: false,
        do: rs => {
            tips('error')
        }
    },
    415: {
        next: false,
        do: rs => {
            tips('error')
        }
    },
    500: {
        next: false,
        do: rs => {
            tips('server error')
        }
    },
    502: {
        next: false,
        do: rs => {
            tips('bad Gateway')
        }
    },
    503: {
        next: false,
        do: rs => {
            tips('Service Unavailable')
        }
    },
    504: {
        next: false,
        do: rs => {
            tips('Gateway Timeout')
        }
    }
}
