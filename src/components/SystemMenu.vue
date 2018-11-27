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
      ,url:Web.host + "/api/"+ SystemMenu.data().home + "/search.do"
      ,cols: [[
        {type:'checkbox'}
        ,{field:'id', width:80, title: 'ID', sort: true}
        ,{field:'parentId', width:80, title: '用户名'}
        ,{field:'name', width:80, title: '性别', sort: true}
        ,{field:'href', width:80, title: '城市'}
        ,{field:'hide', title: '签名', minWidth: 100}
        ,{field:'remark', width:80, title: '积分', sort: true}
        ,{field:'seq', width:80, title: '评分', sort: true}
      ]]
      ,page: true
      ,response: {
        statusCode: 200 //重新规定成功的状态码为 200，table 组件默认为 0
      }
      ,parseData: function(res){ //将原始数据解析成 table 组件所规定的数据
        return {
          "code": res.status, //解析接口状态
          "msg": res.message, //解析提示文本
          "count": res.data.length, //解析数据长度
          "data": res.data //解析数据列表
        };
      }
    });
  });

  export default {
    data () {
      return {
        home:"SystemMenu",
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
