<template>
  <div class="home">
    <div class="header-nav"></div>
    <div class="my-profile"></div>
    <div class="main-nav"></div>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {}
};
</script>
<style lang="less" scoped>
.home {
  display: flex;
  flex-direction: column;
  .header-nav {
    height: 5vh;
    background-color: #cccccc;
  }
  .my-profile {
    height: 35vh;
    background-color: #dddddd;
  }
  .main-nav {
    height: 60vh;
  }
}
</style>
