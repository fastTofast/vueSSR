<template>
  <div class="tinymec-editor-com">
    <div class="article-info">
      <div class="info-item">
        <span>标题</span>
        <input type="text" />
      </div>
    </div>
    <div class="editor">
      <tinymec-editor v-model="article"></tinymec-editor>
    </div>
    <div class="op-btn">
      <span>发布</span>
    </div>
  </div>
</template>

<script>
import tinymecEditor from '../components/TinyMceEditor'
export default {
  data () {
    return {
      article: ''
    }
  },
  components: {
    tinymecEditor
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
