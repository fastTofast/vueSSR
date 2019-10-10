<template>
  <div class="layer-com">
    <div class="header">
      <div class="left">
        <span class="logo" @click="$router.push('/chenxp/home')">Vue List</span>
      </div>
      <div class="right">
        <div class="header-nav-item">
          <span>JS</span>
        </div>
        <div class="header-nav-item">
          <span @click="$router.push('/chenxp/article/1')">Vue</span>
        </div>
      </div>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.layer-com {
  display: flex;
  flex-direction: column;
  .header {
    display: flex;
    height: 5vh;
    background-color: #0e0e1d;
    font-weight: 700;
    font-size: 18px;
    padding: 0 5px;
    .left {
      height: 5vh;
      line-height: 5vh;
      flex: 0 0 120;
      color: #af4b4b;
      .logo {
        height: 5vh;
        line-height: 5vh;
        cursor: pointer;
      }
    }
    .right {
      display: flex;
      align-items: center;
      flex: auto;
      justify-content: flex-end;
      font-size: 16px;
      font-weight: 600;
      .header-nav-item {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        width: 60px;
        height: 100%;
        color: #af4b4b;
      }
    }
  }
  .main {
    height: 95vh;
    background-color: #e1e1e1;
  }
}
</style>
