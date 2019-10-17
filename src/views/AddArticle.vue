<template>
  <div class="tinymec-editor-com">
    <div class="article-info">
      <div class="info-item title-input">
        <span>标题</span>
        <input type="text" v-model="title" class="cus-input" />
      </div>
      <div class="info-item">
        <span>分类</span>
        <select @change="change($event,'classType')" class="cus-selector">
          <option :value="item.val" v-for="(item,index) in classList" :key="index">{{item.label}}</option>
        </select>
      </div>
      <div class="info-item">
        <span>标签</span>
        <select @change="change($event,'tag')" class="cus-selector">
          <option :value="item.val" v-for="(item,index) in tagList" :key="index">{{item.label}}</option>
        </select>
      </div>
    </div>
    <div class="editor">
      <tinymec-editor
        v-model="article"
        :url="url"
        @uploading="uploading"
        :getRemoteURL="getRemoteURL"
      ></tinymec-editor>
    </div>
    <div class="op-btn" @click="publish">
      test
      <!-- <span>发布</span> -->
    </div>
  </div>
</template>

<script>
import tinymecEditor from '../components/TinyMceEditor'
import { getAuth } from '../utils/tools'
export default {
  data () {
    return {
      title: '',
      article: '',
      url: '',
      classType: '前端',
      tag: '',
      classList: [
        { value: '前端', label: '前端' },
        { value: '原生', label: '原生' },
        { value: '小程序', label: '小程序' },
        { value: '后端', label: '后端' }
      ],
      tagList: [],
      srcTagList: [
        { value: 'vue', label: 'VUE', class: '前端' },
        { value: 'js', label: 'JS', class: '前端' },
        { value: 'html', label: 'HTML', class: '前端' },
        { value: 'css', label: 'CSS', class: '前端' },
        { value: 'uni app', label: 'uni app', class: '小程序' },
        { value: 'flutter', label: 'Flutter', class: '原生' },
        { value: 'nodejs', label: 'nodejs', class: '后端' },
        { value: 'docker', label: 'docker', class: '后端' },
        { value: 'nginx', label: 'nginx', class: '后端' },
        { value: '数据库', label: '数据库', class: '后端' }
      ]
    }
  },
  components: {
    tinymecEditor
  },
  watch: {
    classType: {
      handler (val) {
        let tagList = this.srcTagList.filter(n => n.class === val)
        this.tag = tagList[0].value
        this.tagList = tagList
      },
      immediate: true
    }
  },
  created () {
    let Bucket = 'image-1258776243'
    let Region = 'ap-chongqing'
    let protocol = location.protocol === 'https:' ? 'https:' : 'http:'
    let prefix = protocol + '//' + Bucket + '.cos.' + Region + '.myqcloud.com'
    this.prefix = prefix
  },
  methods: {
    change (e, prop) {
      let selectDom = e.target
      let index = selectDom.selectedIndex
      this[prop] = selectDom.options[index].text
    },
    async getRemoteURL (blob) {
      let params = {
        pathname: '/frontend/' + new Date().getTime() + '.png',
        dir: 'frontend/*',
        method: 'put'
      }
      let authInfo = await getAuth(params)
      console.log(authInfo)
      await this.$http.put(this.prefix + params.pathname, blob, {
        withCredentials: false,
        headers: {
          'Content-type': 'multipart/form-data',
          Authorization: authInfo.Authorization,
          'x-cos-security-token': authInfo.XCosSecurityToken
        }
      })
      return this.prefix + params.pathname
    },
    async uploading ({ blobInfo, success, failure }) {
      // const formData = new FormData()
      let params = {
        pathname: '/frontend/' + new Date().getTime() + blobInfo.filename(),
        dir: 'frontend/*',
        method: 'put'
      }
      let authInfo = await getAuth(params)
      console.log(authInfo)
      await this.$http.put(this.prefix + params.pathname, blobInfo.blob(), {
        withCredentials: false,
        headers: {
          'Content-type': 'multipart/form-data',
          Authorization: authInfo.Authorization,
          'x-cos-security-token': authInfo.XCosSecurityToken
        }
      })
      success(this.prefix + params.pathname)
    },
    async publish () {
      let params = {
        title: this.title,
        content: this.article,
        tag: this.tag,
        classType: this.classType
      }
      await this.$http.post('/article', params)
      alert('成功')
    }
  }
}
</script>

<style lang="less">
.tinymec-editor-com {
  .op-btn {
    span {
      display: inline-block;
      width: 20vw;
      margin-top: 20px;
      border-radius: 4px;
      height: 38px;
      line-height: 38px;
      user-select: none;
      cursor: pointer;
      color: #af4b4b;
      background-color: #0e0e1d;
    }
  }
  .article-info {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 20px 0;
    padding: 0 10px;
    .info-item {
      font-size: 16px;
      display: flex;
      margin-right: 20px;
      align-items: center;
      span {
        word-break: keep-all;
        margin-right: 10px;
      }
    }
    .title-input {
      width: 100%;
      margin-bottom: 18px;
    }
  }
}
</style>
