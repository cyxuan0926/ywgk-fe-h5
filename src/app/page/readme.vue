<template>
    <div>
        必须要有一个根元素
        每增加一个菜单项，需要在menu.js里面添加，也需要在route.js里面添加
    </div>
</template>
<script>
export default {
    props: ['api'],
    mounted() {
        this.render()
    },
    methods: {
        render() {
            // 调接口的方式，记住在前面加props: ['api']
            this.api.testGet().then(res => {
                console.log(res)
            })
        }
    }
}
</script>
