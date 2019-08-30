<template>
  <div class="home">
    <div class="my-profile"></div>
    <div class="class-nav"></div>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {}
}
</script>
<style lang="less" scoped>
.home {
  display: flex;
  flex-direction: column;
  .my-profile {
    height: 35vh;
    background-color: #dddddd;
  }
  .class-nav {
    height: 60vh;
  }
}
</style>
