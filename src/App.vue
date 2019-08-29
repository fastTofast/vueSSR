<template>
  <div id="app">
    <span @click="pageTo('/home')">Home</span>
    <span @click="pageTo('/about')">About</span>
    <router-view />
  </div>
</template>
<script>
export default {
  methods: {
    pageTo(page) {
      this.$router.push(page);
    }
  }
};
</script>
<style lang="less">
html,
body {
  margin: 0;
  padding: 0;
  border: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
