<template>
  <div class="layer-com">
    <div class="header">
      <div class="left">
        <span class="logo" @click="toPage('/chenxp/home')">Vue List</span>
      </div>
      <div class="right">
        <div class="header-nav-item" @click="toPage('/chenxp/article/js/all')">
          <span>JS</span>
        </div>
        <div class="header-nav-item" @click="toPage('/chenxp/article/vue/all')">
          <span>Vue</span>
        </div>
      </div>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
    <div class="float-btn" @click="addArticle" v-show="$route.name!=='addArticle'">
      <span>+</span>
    </div>
    <div class="login-flag" v-if="loginFlag">
      <div class="login-content">
        <div class="login-item name">
          <span>名称</span>
          <input class="cus-input" type="text" v-model="username" />
        </div>
        <div class="login-item pwd">
          <span>密码</span>
          <input class="cus-input" type="password" v-model="pwd" />
        </div>
        <span class="login-btn" @click="login">Login</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getCookie } from '../utils/tools/index'
export default {
  data () {
    return {
      username: '',
      pwd: '',
      loginFlag: false
    }
  },
  methods: {
    addArticle () {
      let auth = getCookie('auth')
      if (auth) {
        this.$router.push({ path: '/chenxp/addArticle', query: {} })
      } else {
        this.loginFlag = true
      }
    },
    toPage (path) {
      this.$router.push({ path })
    },
    async login () {
      let data = {
        pwd: this.pwd,
        username: this.username
      }
      await this.$http.post('/user/login', data)
      this.loginFlag = false
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
  .login-flag {
    width: 60%;
    max-width: 550px;
    height: 50%;
    margin: auto;
    padding: 20px;
    position: fixed;
    z-index: 6666;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border-radius: 4px;
    box-shadow: 1px 1px 4px 0 #c5c5c5;
    -webkit-box-shadow: 0 0 0px 1000px white inset;
    background-color: #fff;
    .login-content {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      margin-top: 30%;
      .login-item {
        display: flex;
        align-items: center;
        width: 100%;
        margin-bottom: 20px;
        span {
          flex: 0 0 50px;
        }
      }
      .login-btn {
        display: inline-block;
        width: 20vw;
        margin-top: 20px;
        border-radius: 4px;
        height: 38px;
        line-height: 38px;
        text-align: center;
        user-select: none;
        cursor: pointer;
        color: #af4b4b;
        background-color: #0e0e1d;
      }
    }
  }
}
</style>
