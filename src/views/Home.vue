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
    height: 2vh;
    background-color: #cccccc;
  }
  .my-profile {
    height: 20vh;
    background-color: #dddddd;
  }
  .main-nav {
    height: 78vh;
    background-color: #eeeeee;
  }
}
</style>
