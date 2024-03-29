import { apiList } from '@/api'

// 工具类函数
let fillPre = (val) => {
    return `00${ val }`.slice(-2)
}
export default {
    generateId() {
        return `GK_APP_${ `${ Math.random() }`.replace('.', '') }`
    },
    formatDate: (timestamp, fmt) => {
        var date = new Date(timestamp),
            o = {
                'M+': date.getMonth() + 1,               // 月份
                'd+': date.getDate(),                    // 日
                'h+': date.getHours(),                   // 小时
                'm+': date.getMinutes(),                 // 分
                's+': date.getSeconds(),                 // 秒
                'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
                'S': date.getMilliseconds()             // 毫秒
            }
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (`${ date.getFullYear() }`).substr(4 - RegExp.$1.length))
        for (let k in o) {
            if (new RegExp(`(${ k })`).test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${ o[k] }`).substr((`${ o[k] }`).length)))
        }
        return fmt
    },
    time(seconds) {
        const hours = ~~(seconds / 3600)
        const minutes = ~~(seconds % 3600 / 60)
        const second = seconds % 3600 % 60
        let result = ''
        result += hours ? `${ hours }:` : ''
        result += minutes ? `${ minutes }:` : '0:'
        result += second ? second < 10 ? `0${ second }` : `${ second }` : '00'
        return result
    },
    durationFormat: (duration, { format = 'HH:mm:ss', unit = 's' }) => {
        if ([undefined, null, ''].indexOf(duration) > -1) {
            return duration
        }
        if (unit !== 's') {
            return 'unkown-unit'
        }
        duration = parseInt(duration)
        let ss, mm, hh
        ss = duration % 60
        if (unit === 's' && format === 'HH:mm:ss') {
            mm = parseInt(duration / 60) % 60
            hh = parseInt(duration / 60 / 60)
            return `${ fillPre(hh) }:${ fillPre(mm) }:${ fillPre(ss) }`
        }
        if (unit === 's' && format === 'mm:ss') {
            mm = (duration - ss) / 60
            return `${ mm >= 100 ? mm : fillPre(mm) }:${ fillPre(ss) }`
        }
    },

    loadScript(url) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script')
            script.type = 'text/javascript'
            if (script.readyState) {
                script.onreadystatechange = function() {
                    if (script.readyState === 'loaded' || script.readyState === 'complete') {
                        script.onreadystatechange = null
                        resolve()
                    }
                }
            }
            else {
                script.onload = function() {
                    resolve()
                }
            }
            script.src = url
            document.getElementsByTagName('head')[0].appendChild(script)
        })
    },

    async setWxConfig(jsApiList = ['updateAppMessageShareData', 'updateTimelineShareData'], openTagList = ['wx-open-launch-app']) {
        const { data = {} } = await apiList.getweixinConfig({
            url: location.href.split('#')[0]
        })
        return new Promise((resolve, reject) => {
            if (wx) {
                wx.config({
                    appId: data.appId,
                    timestamp: data.timestamp,
                    nonceStr: data.nonceStr,
                    signature: data.signature,
                    jsApiList,
                    openTagList
                })
                wx.ready(() => {
                    resolve(data)
                })
                wx.error(reject)
            }
            else {
                reject()
            }
        })
    }
}
