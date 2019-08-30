<template>
  <div class="layer-com">
    <div class="header">
      <div class="left">Vue List</div>
      <div class="right">
        <div class="header-nav-item">
          <span>JS</span>
        </div>
        <div class="header-nav-item">
          <span>Vue</span>
        </div>
      </div>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.layer-com {
  display: flex;
  flex-direction: column;
  .header {
    display: flex;
    height: 5vh;
    background-color: #ffffff;
    font-weight: 700;
    font-size: 18px;
    padding: 0 5px;
    .left {
      height: 5vh;
      line-height: 5vh;
      flex: 0 0 120;
      color: #666666;
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
        width: 60px;
        height: 100%;
        color: #666666;
      }
    }
  }
  .main {
    height: 95vh;
    background-color: #e1e1e1;
  }
}
</style>
