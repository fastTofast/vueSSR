<template>
  <div class="home">
    <div class="class-nav">
      <div class="center-btn" @click="checkShowList">
        <transition name="center-btn">
          <span>{{showList?'众神散退':'众神归位'}}</span>
        </transition>
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
  name: 'home',
  data () {
    return {
      showList: false
    }
  },
  components: {},
  methods: {
    checkShowList () {
      this.showList = !this.showList
    }
  }
}
</script>
<style lang="less" scoped>
.home {
  display: flex;
  flex-direction: column;
  .class-nav {
    height: 60vh;
    position: relative;
    background-color: #19191b;
    // .center-btn-enter,
    // .center-btn-leave-to {
    //   opacity: 0;
    // }
    // .center-btn-enter-to,
    // .center-btn-leave {
    //   opacity: 1;
    // }
    .center-btn {
      height: 20vh;
      width: 20vh;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      background-color: #af4b4b;
      user-select: none;
      cursor: pointer;
      border-radius: 50%;
      position: absolute;
      margin: 0 auto;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      span {
        font-size: 20px;
        color: #ffffff;
      }
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
