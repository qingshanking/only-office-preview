<!-- only office 编辑器-->
<template>
  <div id='onlyOfficePreview'></div>
</template>

<script>
export default {
  name: 'onlyOfficePreview',
  props: {
    option: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      doctype: '',
      docEditor: null,
    }
  },
  beforeDestroy() {
    if (this.docEditor !== null) {
      this.docEditor.destroyEditor();
      this.docEditor = null;
    }
  },
  watch: {
    option: {
      handler: function (n) {
        this.setEditor(n)
        this.doctype = this.getFileType(n.fileType)
      },
      deep: true,
    },
  },
  mounted() {
    if (this.option.url) {
      this.setEditor(this.option)
    }
  },
  methods: {
    async setEditor(option) {
      if (this.docEditor !== null) {
        this.docEditor.destroyEditor();
        this.docEditor = null;
      }
      this.doctype = this.getFileType(option.fileType)
      let config = {
        document: {
          //后缀
          fileType: option.fileType,
          key: option.key || '',
          title: option.title,
          permissions: {
            //是否可以编辑: 只能查看，传false
            edit: option.isEdit,
            print: option.isPrint,
            download: false,
            //是否可以填写表格，如果将mode参数设置为edit，则填写表单仅对文档编辑器可用。 默认值与edit或review参数的值一致。
            // "fillForms": true,
            //跟踪变化
            // "review": true
          },
          url: option.url,
        },
        documentType: this.doctype,
        editorConfig: {
          //"编辑word后保存时回调的地址，这个api需要自己写了，将编辑后的文件通过这个api保存到自己想要的位置
          callbackUrl: option.editUrl,
          //语言设置
          lang: option.lang,
          //定制
          customization: {
            //是否自动保存
            autosave: false,
            chat: false,
            comments: false,
            help: false,
            // "hideRightMenu": false,//定义在第一次加载时是显示还是隐藏右侧菜单。 默认值为false
            //是否显示插件
            plugins: false,
          },
          user: {
            id: option.user.id,
            name: option.user.name
          },
          mode: option.model ? option.model : 'edit',
        },
        width: '100%',
        height: '100%',
        token: option.token || ''
      }

      // eslint-disable-next-line no-undef,no-unused-vars
      this.docEditor = new DocsAPI.DocEditor('onlyOfficePreview', config)

    },
    getFileType(fileType) {
      let docType = ''
      let fileTypesDoc = [
        'doc', 'docm', 'docx', 'dot', 'dotm', 'dotx', 'epub', 'fodt', 'htm', 'html', 'mht', 'odt', 'ott', 'pdf', 'rtf', 'txt', 'djvu', 'xps',
      ]
      let fileTypesCsv = [
        'csv', 'fods', 'ods', 'ots', 'xls', 'xlsm', 'xlsx', 'xlt', 'xltm', 'xltx',
      ]
      let fileTypesPPt = [
        'fodp', 'odp', 'otp', 'pot', 'potm', 'potx', 'pps', 'ppsm', 'ppsx', 'ppt', 'pptm', 'pptx',
      ]
      if (fileTypesDoc.includes(fileType)) {
        docType = 'text'
      }
      if (fileTypesCsv.includes(fileType)) {
        docType = 'spreadsheet'
      }
      if (fileTypesPPt.includes(fileType)) {
        docType = 'presentation'
      }
      return docType
    }
  },
}
</script>
