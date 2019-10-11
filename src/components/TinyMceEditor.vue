<template>
  <div class="tiny-mec-editor">
    <editor :init="initObj"></editor>
  </div>
</template>
<script>
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/silver/theme.min.js' // 引入富文本的主要脚本
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/advlist'
// import 'tinymce/plugins/importcss'
import 'tinymce/plugins/wordcount'
import '../assets/tinymec/skins/content/default/content.css'
import '../assets/tinymec/skins/ui/oxide/content.min.css'
import '../assets/tinymec/skins/ui/oxide/skin.min.css'
import lang from '../assets/tinymec/langs/zh_CN'
export default {
  data () {
    const Id = Date.now()
    return {
      Id: Id,
      Editor: null,
      DefaultConfig: {
        language: 'zh_CN',
        // skin_url: '../assets/tinymec/skins/ui/oxide-dark',
        // GLOBAL
        height: 600,
        // theme: 'silver',
        menubar: false,
        toolbar: `styleselect | fontselect | formatselect | fontsizeselect | forecolor | backcolor | bold italic underline strikethrough | image | media | table | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | preview removeformat  hr | paste code  link | undo redo | fullscreen `,
        plugins: `
            image
            table
            advlist
            link
            lists
            wordcount
          `,

        // CONFIG
        forced_root_block: 'p',
        force_p_newlines: true,
        importcss_append: true,
        // CONFIG: ContentStyle 这块很重要， 在最后呈现的页面也要写入这个基本样式保证前后一致， `table`和`img`的问题基本就靠这个来填坑了
        content_style: `
            *                         { padding:0; margin:0; }
            html, body                { height:100%; }
            img                       { max-width:100%; display:block;height:auto; }
            a                         { text-decoration: none; }
            iframe                    { width: 100%; }
            p                         { line-height:1.6; margin: 0px; }
            table                     { word-wrap:break-word; word-break:break-all; max-width:100%; border:none; border-color:#999; }
            .mce-object-iframe        { width:100%; box-sizing:border-box; margin:0; padding:0; }
            ul,ol                     { list-style-position:inside; }
          `,
        insert_button_items: 'image link | inserttable',
        // CONFIG: Paste
        paste_retain_style_properties: 'all',
        paste_word_valid_elements: '*[*]', // word需要它
        paste_data_images: true, // 粘贴的同时能把内容里的图片自动上传，非常强力的功能
        paste_convert_word_fake_lists: false, // 插入word文档需要该属性
        paste_webkit_styles: 'all',
        paste_merge_formats: true,
        nonbreaking_force_tab: false,
        paste_auto_cleanup_on_paste: false,
        // CONFIG: Font
        fontsize_formats: '10px 11px 12px 14px 16px 18px 20px 24px',
        // CONFIG: StyleSelect
        style_formats: [
          {
            title: '首行缩进',
            block: 'p',
            styles: { 'text-indent': '2em' }
          },
          {
            title: '行高',
            items: [
              { title: '1', styles: { 'line-height': '1' }, inline: 'span' },
              {
                title: '1.5',
                styles: { 'line-height': '1.5' },
                inline: 'span'
              },
              { title: '2', styles: { 'line-height': '2' }, inline: 'span' },
              {
                title: '2.5',
                styles: { 'line-height': '2.5' },
                inline: 'span'
              },
              { title: '3', styles: { 'line-height': '3' }, inline: 'span' }
            ]
          }
        ],
        // FontSelect
        font_formats: `
            微软雅黑=微软雅黑;
            宋体=宋体;
            黑体=黑体;
            仿宋=仿宋;
            楷体=楷体;
            隶书=隶书;
            幼圆=幼圆;
            Andale Mono=andale mono,times;
            Arial=arial, helvetica,
            sans-serif;
            Arial Black=arial black, avant garde;
            Book Antiqua=book antiqua,palatino;
            Comic Sans MS=comic sans ms,sans-serif;
            Courier New=courier new,courier;
            Georgia=georgia,palatino;
            Helvetica=helvetica;
            Impact=impact,chicago;
            Symbol=symbol;
            Tahoma=tahoma,arial,helvetica,sans-serif;
            Terminal=terminal,monaco;
            Times New Roman=times new roman,times;
            Trebuchet MS=trebuchet ms,geneva;
            Verdana=verdana,geneva;
            Webdings=webdings;
            Wingdings=wingdings,zapf dingbats`,
        // Tab
        tabfocus_elements: ':prev,:next',
        object_resizing: true,
        // Image
        imagetools_toolbar:
          'rotateleft rotateright | flipv fliph | editimage imageoptions'
      },
      initObj: {}
    }
  },
  props: {
    value: {
      default: '',
      type: String
    },
    config: {
      type: Object,
      default: () => {
        return {}
      }
    },
    url: {
      default: '',
      type: String
    },
    accept: {
      default: 'image/jpeg, image/png',
      type: String
    },
    maxSize: {
      default: 2097152,
      type: Number
    },
    withCredentials: {
      default: false,
      type: Boolean
    }
  },
  components: {
    Editor
  },
  created () {
    this.initObj = this.init()
  },
  mounted () {
    tinymce.addI18n('zh_CN', lang)
  },
  beforeDestroy () {
    // 销毁tinymce
    this.$emit('on-destroy')
    // window.tinymce.remove(`$#{this.Id}`)
  },
  methods: {
    init () {
      const self = this
      return {
        ...this.DefaultConfig,
        // 图片上传
        images_upload_handler: function (blobInfo, success, failure) {
          if (blobInfo.blob().size > self.maxSize) {
            failure('文件体积过大')
          }

          if (self.accept.indexOf(blobInfo.blob().type) >= 0) {
            uploadPic()
          } else {
            failure('图片格式错误')
          }
          function uploadPic () {
            const xhr = new XMLHttpRequest()
            const formData = new FormData()
            xhr.withCredentials = self.withCredentials
            xhr.open('POST', self.url)
            xhr.onload = function () {
              if (xhr.status !== 200) {
                // 抛出 'on-upload-fail' 钩子
                self.$emit('on-upload-fail')
                failure('上传失败: ' + xhr.status)
                return
              }
              const json = JSON.parse(xhr.responseText)
              // 抛出 'on-upload-complete' 钩子
              self.$emit('on-upload-complete', [json, success, failure])
            }
            formData.append('file', blobInfo.blob())
            xhr.send(formData)
          }
        },
        // 挂载的DOM对象
        // selector: `#${this.Id}`,
        setup: editor => {
          // 抛出 'on-ready' 事件钩子
          editor.on('init', () => {
            self.loading = false
            self.$emit('on-ready')
            editor.setContent(self.value)
          })
          // 抛出 'input' 事件钩子，同步value数据
          editor.on('input change undo redo', () => {
            self.$emit('input', editor.getContent())
          })
        },
        ...this.config
      }
    }
  }
}
</script>
