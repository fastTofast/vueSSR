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
        <div v-if="selectedItem._id" class="article-detail" v-html="selectedItem.content"></div>
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
      selectedItem: {}
    }
  },
  computed: {
    params () {
      return this.$route.params
    }
  },
  created () {
    console.log(process.env.NODE_ENV)
    if (this.params._id && this.params._id !== 'all') {
      this.getById(this.params)
    }
    this.getAll()
  },
  watch: {
    params (val) {
      this.getById(val)
    }
  },
  methods: {
    async getById (data) {
      let params = {
        condition: data
      }
      let articles = await this.$http.get('/article', { params })
      this.selectedItem = articles[0] || {}
    },
    async getAll () {
      let params = {
        condition: { tag: this.params.tag },
        fields: 'title tag classType'
      }
      this.articles = (await this.$http.get('/article', { params })) || []
      if (this.params._id === 'all') {
        this.selectedItem = this.articles[0] || {}
      }
    },
    selectItem (item) {
      this.$router.push(`/chenxp/article/${item.tag}/${item._id}`)
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
