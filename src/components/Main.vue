<template>
  <div>
    {{mainMsg}}
    <button @click="logout()">退出登陆</button>
  </div>
</template>
<style scoped>
  @import "../../static/css/main.css";
</style>
<script>
  export default {
    data () {
      return {
        home:"systemmenu",
        page:0,
        pageSize:10,
        items:[],
        mainMsg: '我是主页组件'
      }
    },
    mounted:function(){
      this.init();
    },
    methods: {
      init:function(){
          var that = this;
          var data = {
            page:that.page,
            pageSize:that.pageSize
          }
          Web.post(Web.host + "/api/"+ that.home + "/search.do",data,function (res) {
              if(res.status){
                that.items = res.data.content
              }
          })
      },
      logout:function () {
        Web.go(Web.host)
      }
    }
  }
</script>
