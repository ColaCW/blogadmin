<template>
  <div>
    <div class="msg">{{mainMsg}}</div>
    <button @click="sys()">点</button>
  </div>
  <!--<div class="login_div">-->
<!--1111-->
  <!--</div>-->
</template>

<style scoped>
  @import "../assets/css/login.css";
</style>
<script>
  export default {
    data() {
      return {
        mainMsg: '我是主页组件',
        index:1
      }
    },
    mounted:function(){
      this.init();
    },
    methods: {
      init:function(){
        $("canvas").css("position","absolute");
        $("canvas").css("top","0");
        $("canvas").css("left","0");
      },
      sys:function () {
        var that = this;
        console.log($(".msg").html()+that.index);
        that.index++;
      }
    }
  }

</script>
