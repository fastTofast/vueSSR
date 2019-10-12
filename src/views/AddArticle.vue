<template>
  <div class="tinymec-editor-com">
    <div class="article-info">
      <div class="info-item">
        <span>标题</span>
        <input type="text" />
      </div>
      <div class="info-item">
        <span>分类</span>
        <select @change="change($event,'classType')">
          <option :value="item.val" v-for="(item,index) in classList" :key="index">{{item.label}}</option>
        </select>
      </div>
      <div class="info-item">
        <span>标签</span>
        <select @change="change($event,'tag')">
          <option :value="item.val" v-for="(item,index) in tagList" :key="index">{{item.label}}</option>
        </select>
      </div>
    </div>
    <div class="editor">
      <tinymec-editor v-model="article" :url="url" @uploading="uploading"></tinymec-editor>
    </div>
    <div class="op-btn" @click="publish">
      <span>发布</span>
    </div>
  </div>
</template>

<script>
import tinymecEditor from '../components/TinyMceEditor'
export default {
  data () {
    return {
      article: '',
      url: '',
      classType: '',
      tag: '',
      classList: [
        { value: '前端', label: '前端' },
        { value: '原生', label: '原生' },
        { value: '小程序', label: '小程序' },
        { value: '后端', label: '后端' }
      ],
      tagList: [],
      srcTagList: [
        { value: 'vue', label: 'vue', class: '前端' },
        { value: 'JS', label: 'JS', class: '前端' },
        { value: 'uni app', label: 'uni app', class: '小程序' },
        { value: 'Flutter', label: 'Flutter', class: '原生' },
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
  created () {
    let Bucket = 'image-1258776243'
    let Region = 'ap-chongqing'
    let protocol = location.protocol === 'https:' ? 'https:' : 'http:'
    let dir = 'frontend'
    let prefix =
      protocol + '//' + Bucket + '.cos.' + Region + '.myqcloud.com/' + dir + '/'
    this.url = prefix
  },
  methods: {
    change (e, prop) {
      debugger
      let selectDom = e.target
      let index = selectDom.selectedIndex
      this[prop] = selectDom.options[index].text
    },
    async uploading ({ blobInfo, success, failure }) {
      const xhr = new XMLHttpRequest()
      const formData = new FormData()
      xhr.withCredentials = self.withCredentials
      xhr.open('POST', this.url + blobInfo.filename())
      xhr.onload = function () {
        debugger
        if (xhr.status !== 200) {
          failure('上传失败: ' + xhr.status)
          return
        }
        const json = JSON.parse(xhr.responseText)
        success(json)
      }
      // let Authorization = await this.getAuthorization()
      formData.append('file', blobInfo.blob())
      // formData.append('x-cos-security-token', Authorization.xCosSecurityToken)
      // formData.append('Signature ', Authorization.Signature)
      xhr.send(formData)
    },
    async getAuthorization () {
      let params = {}
      let res = await fetch('', {
        method: 'post',
        body: JSON.stringify(params)
      })
      return res.json()
    },
    publish () {

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
    .info-item {
      margin-right: 20px;
    }
  }
}
</style>
