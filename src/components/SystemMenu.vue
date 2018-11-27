<template>
  <div>
    111
    <table class="layui-hide" id="SystemMenu"></table>
  </div>
</template>
<script>

  import SystemMenu from './SystemMenu.vue'
  import { Web } from "../../static/js/web.js";

  layui.use('table', function(){
    var table = layui.table;
    table.render({
      elem: '#SystemMenu'
      ,url:'https://www.layui.com/demo/table/user/'
      ,cols: [[
        {type:'checkbox'}
        ,{field:'id', width:80, title: 'ID', sort: true}
        ,{field:'username', width:80, title: '用户名'}
        ,{field:'sex', width:80, title: '性别', sort: true}
        ,{field:'city', width:80, title: '城市'}
        ,{field:'sign', title: '签名', minWidth: 100}
        ,{field:'experience', width:80, title: '积分', sort: true}
        ,{field:'score', width:80, title: '评分', sort: true}
        ,{field:'classify', width:80, title: '职业'}
        ,{field:'wealth', width:135, title: '财富', sort: true}
      ]]
      ,page: true
    });
  });

  export default {
    data () {
      return {

      }
    },
    mounted:function(){
      this.init();
    },
    methods: {
      init:function(){
      },
    }
  }
</script>
