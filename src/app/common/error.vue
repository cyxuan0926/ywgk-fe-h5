<template>
  <div class="error">
    {{ $route.query.error }}
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
.error{
  line-height: 10rem;
  text-align: center;
  width: 100%;
  height: 100%;
  background: #F9F8FD;
  color: #666;
}
</style>
