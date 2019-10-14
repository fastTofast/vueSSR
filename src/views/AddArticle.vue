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
      <tinymec-editor
        v-model="article"
        :url="url"
        @uploading="uploading"
        :dataUrlUploading="dataUrlUploading"
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
    let prefix = protocol + '//' + Bucket + '.cos.' + Region + '.myqcloud.com'
    this.prefix = prefix
  },
  methods: {
    change (e, prop) {
      let selectDom = e.target
      let index = selectDom.selectedIndex
      this[prop] = selectDom.options[index].text
    },
    async dataUrlUploading (blob) {
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
      // let file = blobInfo.blob()
      // var xhr = new XMLHttpRequest()
      // xhr.open('PUT', this.prefix + params.pathname, true)
      // xhr.setRequestHeader('Authorization', authInfo.Authorization)
      // authInfo.XCosSecurityToken &&
      //   xhr.setRequestHeader('x-cos-security-token', authInfo.XCosSecurityToken)
      // xhr.upload.onprogress = function (e) {
      //   console.log(
      //     '上传进度 ' + Math.round((e.loaded / e.total) * 10000) / 100 + '%'
      //   )
      // }
      // xhr.onload = function () {
      //   if (/^2\d\d$/.test('' + xhr.status)) {
      //     console.log(null, { url: this.prefix + params.pathname })
      //   } else {
      //     console.error('文件 ' + params.pathname + ' 上传失败，状态码：' + xhr.status)
      //   }
      // }
      // xhr.onerror = function () {
      //   console.error('文件 ' + params.pathname + ' 上传失败，请检查是否没配置 CORS 跨域规则')
      // }
      // xhr.send(file)
    },
    async publish () {}
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
