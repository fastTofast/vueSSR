<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  methods: {
    pageTo (page) {
      this.$router.push(page)
    }
  }
}
</script>
<style lang="less">
html,
body {
  margin: 0 !important;
  padding: 0 !important;
  border: 0 !important;
  color: #333333;
  font-size: 14px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  .common-input {
    height: 40px;
    width: 100%;
    line-height: 40px;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid #b2b2b2;
    outline: none;
  }
  .cus-selector {
    .common-input;
    font-size: 14px;
    box-sizing: border-box;
    border: 1px solid #b2b2b2;
    min-width: 80px;
  }
  .cus-input {
    .common-input;
    padding: 8px 10px;
    box-sizing: border-box;
    border-radius: 4px;
    font-size: 18px;
    border: 1px solid #b2b2b2;
  }
}
</style>
