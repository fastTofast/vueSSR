<template>
  <div class="article-list-com">
    <div class="main-content">
      <div class="left">
        <div class="list-header">
          <div class="list-item" v-for="(item,index) in articles" :key="index">
            <strong class="title">{{item.title.slice(0,20)}}</strong>
            <span class="profile">{{item.profile.slice(0,50)}}</span>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="article-detail"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      articles: [
        {
          aid: '123',
          title: '逍遥长生',
          profile: '逍遥长生逍遥长生逍遥长生逍遥长生逍遥长生逍遥长生逍遥长生逍遥长生逍遥长生逍遥长生'
        }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
.article-list-com {
  height: 100%;
}
.main-content {
  height: 100%;
  display: flex;
  .left {
    background-color: #ac8383;
    flex: 1 1 35%;
    max-width: 35%;
    .list-item {
      text-align: left;
      padding-bottom: 10px;
      overflow: hidden;
      border-bottom: 1px dashed #999999;
      .title {
        display: block;
        font-size: 18px;
      }
      .profile {
        display: block;
        font-size: 14px;
        color: #333333;
      }
    }
  }
  .right {
    flex: 1 1 65%;
    background-color: #50a5a1;
    .article-detail{
      height: 100%;
      overflow-y: auto;
    }
  }
}
</style>
