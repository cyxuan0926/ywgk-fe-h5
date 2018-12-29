// 工具类函数
export default {
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
    }
}
