<template>
  <div class="home">
    <div class="class-nav">
      <div class="center-btn">
        <span class="icon">+</span>
        <span>众神归位</span>
      </div>
    </div>
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
    position: relative;
    background-color: #19191b;
    .center-btn {
      height: 20vh;
      width: 20vh;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      background-color: #af4b4b;
      cursor: pointer;
      border-radius: 50%;
      position: absolute;
      margin: 0 auto;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      span.icon {
        font-size: 80px;
        color: #ffffff;
      }
    }
  }
  .my-profile {
    height: 35vh;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    .profile-content {
      width: 80%;
      height: 70%;
      color: #ffffff;
      background-color: #af4b4b;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
  }
}
</style>
