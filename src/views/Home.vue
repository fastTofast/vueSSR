<template>
  <div class="home">
    <div class="class-nav"></div>
    <div class="my-profile">
      <div class="profile-content">
        <div>cxp0923@qq.com</div>
        <div>www.asdf.com</div>
        <div>fasdfasdfasdfasdfasdf</div>
      </div>
    </div>
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
  .class-nav {
    height: 60vh;
    background-color: #3d558c;
  }
  .my-profile {
    height: 35vh;
    background-color: #feffff;
    display: flex;
    justify-content: center;
    align-items: center;
    .profile-content {
      width: 80%;
      height: 70%;
      background-color: #3880c7;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
  }
}
</style>
