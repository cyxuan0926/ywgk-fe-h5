<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
    name: 'app',
    mounted() {
        this.init()
    },
    methods: {
        init() {
            if (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
                (function(doc, win) {
                    var docEl = doc.documentElement,
                        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
                        recalc = function() {
                            var clientWidth = docEl.clientWidth
                            if (!clientWidth) return
                            // 根据设备的比例调整初始font-size大小
                            if (clientWidth > 640) clientWidth = 640
                            docEl.style.fontSize = `${ 10 * (clientWidth / 320) }px`
                        }
                    if (!doc.addEventListener) return
                    win.addEventListener(resizeEvt, recalc, false)
                    doc.addEventListener('DOMContentLoaded', recalc, false)
                })(document, window)
            }
            else {
                document.documentElement.style.maxWidth = '750px'
                document.documentElement.style.margin = '0 auto'
            }
        }
    }
}
</script>

<style>
</style>
