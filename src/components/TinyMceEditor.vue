<template>
  <div class="tiny-mec-editor">
    <textarea class="editor-section"></textarea>
    <!-- <editor :init="initObj"></editor> -->
  </div>
</template>
<script>
// import Tinymce from 'tinymce/tinymce'
// // import 'tinymce/plugins/importcss'
// // import 'tinymce/plugins/wordcount'
// // import '../assets/tinymec/skins/content/default/content.css'
// // import '../assets/tinymec/skins/ui/oxide/content.min.css'
// import '../assets/tinymec/skins/ui/oxide/skin.min.css'
// import 'tinymce/skins/ui/oxide/fonts/tinymce-mobile.woff'
// import 'tinymce/themes/silver/theme.min.js' // 引入富文本的主要脚本
// import 'tinymce/themes/mobile/theme.min.js' // 引入富文本的主要脚本
// import '../assets/tinymec/skins/ui/oxide/skin.mobile.min.css'
// import 'tinymce/plugins/image'
// import 'tinymce/plugins/link'
// // import 'tinymce/plugins/table'
// import 'tinymce/plugins/lists'
// import 'tinymce/plugins/paste'
// import 'tinymce/plugins/advlist'
// // import lang from '../assets/tinymec/langs/zh_CN'
// import('https://tinymec-1258776243.cos.ap-shenzhen-fsi.myqcloud.com/tinymce/js/tinymce/themes/silver/theme.min.js')
export default {
  data () {
    const Id = Date.now()
    return {
      Id: Id,
      Editor: null,
      defaultConfig: {
        language: 'zh_CN',
        // GLOBAL
        suffix: '.min',
        base_url:
          'https://tinymec-1258776243.cos.ap-shenzhen-fsi.myqcloud.com/tinymce/js/tinymce',
        height: 600,
        // theme: 'silver',
        menubar: false,
        toolbar: `styleselect | fontselect | formatselect | fontsizeselect | forecolor | backcolor | bold italic underline strikethrough
        | image | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | removeformat | blockquote
        | link | undo redo | emoticons`,
        plugins: `
            image
            advlist
            link
            lists
            paste,
            emoticons 
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
        image_uploadtab: true,
        imagetools_toolbar:
          'rotateleft rotateright | flipv fliph | editimage imageoptions'
      },
      initObj: {},
      editor: {},
      imgClass: '',
      timeout: ''
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
    profileContent: {
      default: '',
      type: String
    },
    dataUrlLimit: {
      default: 20 * 1024,
      type: Number
    },
    getRemoteURL: {
      type: Function
    },
    accept: {
      default: 'image/jpeg, image/png, image/webp',
      type: String
    },
    maxSize: {
      default: 1024 * 1024,
      type: Number
    },
    withCredentials: {
      default: false,
      type: Boolean
    }
  },
  components: {
    // Editor: () => import('@tinymce/tinymce-vue')
  },
  mounted () {
    // console.log(Tinymce)
    // Tinymce.addI18n('zh_CN', lang)
    this.loopTinymce()
  },
  beforeDestroy () {
    // 销毁tinymce
    this.$emit('on-destroy')
    window.tinymce.remove('.editor-section')
    clearTimeout(this.timeout)
  },
  methods: {
    loopTinymce () {
      if (window.tinymce) {
        clearTimeout(this.timeout)
        this.initObj = this.init()
        window.tinymce.init(this.initObj)
      } else {
        this.timeout = setTimeout(() => {
          this.loopTinymce()
        }, 500)
      }
    },
    init () {
      const self = this
      return {
        ...this.defaultConfig,
        // 挂载的DOM对象
        selector: '.editor-section',
        paste_preprocess: async (plugin, args) => {
          // 粘贴上传,根据粘贴的图片大小判断是否粘贴为dataurl或者上传服务器
          let uri = args.content.match(/^<img src="(.+?)".*>$/)
          if (!uri) {
            return
          }
          let convertImgToBlobviaCanvas = async url => {
            const img = new Image()
            return new Promise((resolve, reject) => {
              img.crossOrigin = 'Anonymous' // canvas 不能处理跨域图片，如果要处理，除了服务端要开启跨域外，执行canvas操作前也要开启跨域
              img.onload = function () {
                let canvas = document.createElement('canvas')
                const ctx = canvas.getContext('2d')
                canvas.height = this.height
                canvas.width = this.width
                ctx.drawImage(this, 0, 0)
                canvas.toBlob(blob => {
                  resolve(blob)
                })
                window.curDataURL = canvas.toDataURL('image/webp', 0.65)
                canvas = null
              }
              img.src = url
            })
          }
          if (uri && uri[1]) {
            args.content = `<img src="">`
            let blob = await convertImgToBlobviaCanvas(uri[1])
            let newURL = ''
            console.log(blob.size / 1024, 'Kb')
            if (blob.size > this.dataUrlLimit) {
              newURL = await this.getRemoteURL(blob)
            } else {
              newURL = window.curDataURL
            }
            this.$nextTick(() => {
              const doc = window.tinymce.activeEditor.dom
              doc.select(`.${this.imgClass}`)[0].src = newURL
              this.editor.fire('change')
            })
          }
        },
        paste_postprocess: (plugin, args) => {
          let children = args.node.children
          let imgNode = args.node.children[0]
          if (!children || children.length > 1 || !imgNode) {
            return
          }
          this.imgClass =
            'temp' + new Date().getTime() + '-' + (Math.random() + '').slice(2)
          imgNode.className = this.imgClass
        },
        // 图片上传
        images_upload_handler: (blobInfo, success, failure) => {
          if (blobInfo.blob().size > self.maxSize) {
            failure('文件体积过大')
          }
          if (self.accept.indexOf(blobInfo.blob().type) >= 0) {
            self.$emit('uploading', { blobInfo, success, failure })
          } else {
            failure('图片格式错误')
          }
        },
        setup: editor => {
          this.editor = editor
          // 触发 'on-ready' 事件
          editor.on('init', () => {
            self.loading = false
            self.$emit('on-ready')
            editor.setContent(self.value)
          })
          // 同步value数据
          editor.on('input change undo redo', () => {
            // console.log(editor.getContent())
            if (window.tinymce.activeEditor) {
              // console.log(Tinymce.activeEditor.dom.select('body')[0].innerHTML)
              self.$emit(
                'input',
                window.tinymce.activeEditor.dom.select('body')[0].innerHTML
              )
              this.$emit(
                'update:profileContent',
                window.tinymce.activeEditor.dom
                  .select('body')[0]
                  .innerText.replace(/[\n]/g, ' ')
                  .replace(/\s{2,}/g, '')
                  .slice(0, 300)
              )
            }
          })
        },
        ...this.config
      }
    }
  }
}
</script>
