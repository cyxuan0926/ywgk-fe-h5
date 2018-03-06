<template>
    <section>
      <transition name="router-fade" mode="out-in">
          <router-view :api="apiList"></router-view>
      </transition>
    </section>
</template>

<script>
import { apiList } from '@/api/'

export default {
    data() {
        return {
            apiList
        }
    },
    methods: {
    }
}

</script>

<style lang="scss">
</style>
