<template>
  <div class="tinymec-editor-com">
    <div class="article-info">
      <div class="info-item">
        <span>标题</span>
        <input type="text" />
      </div>
    </div>
    <div class="editor">
      <tinymec-editor v-model="article" :url="url" @uploading="uploading"></tinymec-editor>
    </div>
    <div class="op-btn">
      <!-- <span>发布</span> -->
    </div>
  </div>
</template>

<script>
import tinymecEditor from '../components/TinyMceEditor'
let CosAuth = require('../utils/tools/cos-auth')
export default {
  data () {
    return {
      article: '',
      url: ''
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
      let Authorization = await this.getAuthorization()
      formData.append('file', blobInfo.blob())
      formData.append('x-cos-security-token', Authorization.xCosSecurityToken)
      formData.append('Signature ', Authorization.Signature)
      xhr.send(formData)
    },
    async getAuthorization () {
      let params = {}
      let res = await fetch('', {
        method: 'post',
        body: JSON.stringify(params)
      })
      let credentials = res.json()
      return {
        xCosSecurityToken: credentials.sessionToken,
        Signature: CosAuth({
          SecretId: credentials.tmpSecretId,
          SecretKey: credentials.tmpSecretKey,
          Method: 'post',
          Pathname: '/frontend'
        })
      }
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
}
</style>
