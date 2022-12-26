<template>
  <div id="app">
    <div class='qualityManual-container'>
      <div style="margin-bottom: 10px">
        <el-button style='width: 120px;' type='primary' @click='previewPdf'>预览PDF文档</el-button>
        <el-button style='width: 120px;' type='primary' @click='previewExcel'>预览Excel文档</el-button>
        <el-button style='width: 120px;' type='primary' @click='close'>关闭</el-button>
      </div>
      <div v-if='show' class='qualityManual-container-office'>
        <only-office-preview :option='option'/>
      </div>
    </div>
  </div>
</template>

<script>
import onlyOfficePreview from '@/components/only-office/preview.vue'

export default {
  name: 'App',
  components: {
    onlyOfficePreview
  },
  data() {
    return {
      //参考vabOnlyOffice组件参数配置
      option: {
        url: '',
        isEdit: '',
        fileType: '',
        title: '',
        lang: '',
        isPrint: '',
        user: {id: null, name: ''}
      },
      show: false,
    }
  },
  methods: {
    // 预览PDF
    previewPdf(){
      this.show = true
      this.option.isEdit = false
      this.option.lang = 'zh-CN'
      this.option.url = 'http://10.10.84.234:9000/file/Spring Boot2系列实战教程0726.pdf'
      this.option.title = 'Spring Boot2系列实战教程0726'
      this.option.fileType = 'pdf'
      this.option.isPrint = false
      this.option.user = {id: 12, name: '测试'}
    },
    // 预览Excel
    previewExcel(){
      this.show = true
      this.option.isEdit = false
      this.option.lang = 'zh-CN'
      this.option.url = 'http://10.10.84.234:9000/file/可视化数据分析看板图形图表1.xlsx'
      this.option.title = '可视化数据分析看板图形图表1'
      this.option.fileType = 'xlsx'
      this.option.isPrint = false
      this.option.user = {id: 12, name: '测试'}
    },
    close() {
      this.show = false
    },
  },
}
</script>

<style>
/*#app {*/
/*  font-family: Avenir, Helvetica, Arial, sans-serif;*/
/*  -webkit-font-smoothing: antialiased;*/
/*  -moz-osx-font-smoothing: grayscale;*/
/*  text-align: center;*/
/*  color: #2c3e50;*/
/*  margin-top: 60px;*/
/*}*/
html, body {
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;

}

.qualityManual-container {
  padding: 0 !important;
  height: 100%;
}

.qualityManual-container-office {
  width: 100%;
  height: calc(100% - 55px);
}
</style>
