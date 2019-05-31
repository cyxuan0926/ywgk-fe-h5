<template>
    <section class="outer">
      <transition name="router-fade" mode="out-in">
          <router-view :api="apiList" :fullLoading="fullLoading"></router-view>
      </transition>
    </section>
</template>

<script>
/* eslint-disable import/no-duplicates */
import { apiList } from '@/api/'
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            apiList
        }
    },
    computed: {
        ...mapGetters(['fullLoading'])
    }
}

</script>

<style lang="scss" scoped>
.outer{
  height: 100%;
  width: 100%;
}
</style>
