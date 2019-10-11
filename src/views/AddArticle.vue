<template>
  <div class="tinymec-editor-com">
    <div class="article-info">
      <div class="info-item">
        <span>标题</span>
        <input type="text" />
      </div>
    </div>
    <div class="editor">
      <!-- <tinymec-editor v-model="article"></tinymec-editor> -->
    </div>
    <div class="editor">
      <!-- <quill-editor v-model="article"></quill-editor> -->
    </div>
    <div class="editor">
      <quill-editor ref="quillEditorRef" v-model="article"  :options="editorOption"></quill-editor>
      <input type="file" style="display:none" ref="uploadImg" @change="processUpload"/>
    </div>
    <div class="op-btn">
      <span>发布</span>
    </div>
  </div>
</template>

<script>
// import tinymecEditor from '../components/TinyMceEditor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  data () {
    const toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['blockquote', 'code-block'],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
      [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
      [{ direction: 'rtl' }], // text direction

      [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],
      ['link', 'image'],
      ['clean'] // remove formatting button
    ]
    return {
      article: '',
      editorOption: {
        modules: {
          toolbar: {
            container: toolbarOptions, // Selector for toolbar container
            handlers: {
              'code-block': (val) => {
                let quill = this.$refs.quillEditorRef.quill
                // 如果上传成功
                // 获取光标所在位置
                let str = quill.getSelection()
                console.log(str, quill.selection)
                console.log(quill.selection.getRange()[1].end.node.parentNode)
              },
              'image': (params) => {
                if (params) {
                  this.$refs.uploadImg.click()
                } else {
                  console.error('----------上传图片失败---------')
                }
              }
            }
          },
          history: {
            delay: 1000,
            maxStack: 50,
            userOnly: false
          }
        }
      }
    }
  },
  components: {
    // tinymecEditor,
    quillEditor
  },
  methods: {
    processUpload () {
      let uploadDom = this.$refs.uploadImg
      let file = uploadDom.value.files[0]
      uploadDom.value = ''
      let formData = new FormData()
      formData.append('file', file)
      fetch({
        method: 'post',
        url: '',
        data: formData
      }).then(res => {
        if (res.status === 200) {
          this.handleSuccess(res)
        }
      })
    },
    handleSuccess (res) {
      // 获取富文本组件实例
      let quill = this.$refs.quillEditorRef.quill
      // 如果上传成功
      if (res) {
        // 获取光标所在位置
        let length = quill.getSelection().index
        // 插入图片，res为服务器返回的图片链接地址
        quill.insertEmbed(length, 'image', res)
        // 调整光标到最后
        quill.setSelection(length + 1)
      } else {
        // 提示信息，需引入Message
        console.error('图片插入失败')
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
