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
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
