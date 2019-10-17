<template>
  <div class="layer-com">
    <div class="header">
      <div class="left">
        <span class="logo" @click="toPage('/chenxp/home')">Vue List</span>
      </div>
      <div class="right">
        <div class="header-nav-item">
          <span @click="toPage('/chenxp/article/js/1')">JS</span>
        </div>
        <div class="header-nav-item">
          <span @click="toPage('/chenxp/article/vue/1')">Vue</span>
        </div>
      </div>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
    <div class="float-btn" @click="addArticle" v-show="$route.name!=='addArticle'">
      <span>+</span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    addArticle () {
      this.$router.push({ path: '/chenxp/addArticle', query: {} })
    },
    toPage (path) {
      this.$router.push({ path })
    }
  }
}
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
    background-color: #ffffff;
  }
  .float-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    z-index: 9000;
    background-color: #50acc1;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    span {
      font-size: 30px;
    }
  }
}
</style>
