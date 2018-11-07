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
        mainMsg: '我是主页组件'
      }
    },
    mounted:function(){
      this.init();
    },
    methods: {
      init:function(){
        // $("canvas").hide();
        // $("body").css("background","");
      },
      logout:function () {
        Web.go(Web.host)
      }
    }
  }
</script>
