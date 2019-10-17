<template>
  <div class="article-list-com">
    <div class="main-content">
      <div class="article-list-left">
        <div class="list-header">
          <div
            class="list-item"
            v-for="(item,index) in articles"
            :key="index"
            @click="selectItem(item)"
          >
            <strong class="title">{{item.title.slice(0,20)}}</strong>
            <!-- <span class="profile">{{item.profile.slice(0,50)}}</span> -->
          </div>
        </div>
      </div>
      <div class="article-list-right">
        <div v-if="selectedItem" class="article-detail" v-html="selectedItem.content"></div>
        <div v-else class="article-detail" v-html="articles[0]&&articles[0].content"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      articles: [],
      selectedItem: null,
      params: this.$route.params
    }
  },
  created () {
    console.log(process.env.NODE_ENV)
    this.getArticles(this.params)
  },
  methods: {
    async getArticles (params) {
      let articles = await this.$http.get('/article', { params })
      this.articles = articles
    },
    selectItem (item) {
      this.selectedItem = item
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
  .article-list-left {
    background-color: #383838;
    flex: 1 1 30%;
    max-width: 30%;
    color: #ffffff;
    .list-item {
      text-align: left;
      padding: 10px;
      overflow: hidden;
      cursor: pointer;
      border-bottom: 1px dashed #af4b4b;
      .title {
        display: block;
        font-size: 18px;
      }
      .profile {
        display: block;
        font-size: 14px;
        color: #e8e8e8;
      }
    }
  }
  .article-list-right {
    flex: 1 1 70%;
    overflow-y: auto;
    background-color: #efefef;
    &::-webkit-scrollbar {
      width: 8px;
      width: 8px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background-color: #cccccc;
    }
    .article-detail {
      padding: 20px;
    }
  }
}
</style>
