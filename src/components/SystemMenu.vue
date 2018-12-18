<template>
  <div>
    <div style="margin-top: 10px;padding-left: 20px;">
      <button class="layui-btn" @click="showBox('.search-box')">
        <i class="layui-icon">&#xe615;</i> 搜索
      </button>
      <button class="layui-btn" @click="editObj = initialObj;showBox('.edit-box')">
        <i class="layui-icon">&#xe608;</i> 添加
      </button>
    </div>
    <table class="layui-hide" id="SystemMenu" :lay-filter="home"></table>
    <script type="text/html" id="operation">
      <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>
      <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
    </script>
    <div class="search-box">
      <div class="box-head">
        <div class="head-title">搜索</div>
        <div class="close"><img src="../../static/img/close.png" style="width: 20px;" @click="closeBox('.search-box')"/></div>
        <div style="clear: both"></div>
      </div>
      <div>
        <div class="layui-col-md6">
          <label>ID:</label>
          <input type="text" v-model="obj.id"/>
        </div>
        <div class="layui-col-md6">
          <label>Name:</label>
          <input type="text" v-model="obj.name"/>
        </div>
        <div style="clear: both"></div>
      </div>
      <div style="text-align: center;margin-top: 30px;">
        <button class="layui-btn" @click="doSearch()">搜索</button>
        <button class="layui-btn" @click="closeBox('.search-box')">取消</button>
      </div>
    </div>
    <div class="edit-box">
      111
    </div>
    <div class="wrap"></div>
  </div>
</template>

<script>

  import { Web } from "../../static/js/web.js";

  export default {
    data () {
      return {
        home:"SystemMenu",
        token:Web.getToken(),
        cols:[
          {type:'checkbox'}
          ,{field:'id', title: 'ID', sort: true}
          ,{field:'name', title: '名称'}
          ,{field:'href', title: '链接'}
          ,{field:'hide', title: '隐藏'}
          ,{field:'remark', title: '备注'}
          ,{field:'seq', title: '排序', sort: true}
          ,{ align:'center', toolbar: '#operation', title: '操作'}
        ],
        tableData:null,
        page:1,
        pageSize:10,
        //编辑对象
        editObj:{},
        //初始对象
        initialObj:{
          id:"",
          parentId:"",
          name:"",
          href:"",
          hide:"",
          remark:"",
          seq:"",
          createAt:"",
          createBy:"",
          updateAt:"",
          updateBy:""
        }
      }
    },
    mounted:function(){
      var that = this;
      layui.use('table', function(){
        var table = layui.table;
        that.tableData = table.render({
          elem: '#' + that.home,
          url:Web.host + "/api/"+ that.home + "/search.do",
          method:"post",
          contentType: 'application/json',
          where:{id:that.obj.id,name:that.obj.name},
          cols: [that.cols],
          page: true,
          request: {
            pageName: 'page', //页码的参数名称，默认：page
            limitName: 'pageSize' //每页数据量的参数名，默认：limit
          },
          response: {
            statusCode: true //规定成功的状态码，默认：0
          },
          parseData: function(res){ //将原始数据解析成 table 组件所规定的数据
            return {
              "code": res.status, //解析接口状态
              "msg": res.message, //解析提示文本
              "count": res.data.numberOfElements, //解析数据长度
              "data": res.data.content //解析数据列表
            };
          }
        });
        table.on('tool('+ that.home +')', function(obj){
          var data = obj.data;
          if(obj.event === 'del'){
            layer.open({
              content:  '<div style="text-align: center">确认删除吗</div>',
              shadeClose:true,
              btnAlign: 'c',
              btn: ['确定', '取消'],
              yes: function(index){
                that.doDelete(data.id,function () {
                  obj.del();
                  layer.close(index);
                });
              },
              function(index){
                layer.close(index);
              }
            });
          } else if(obj.event === 'edit'){
            that.editObj = data;
            that.showBox('.edit-box');
          }
        });
      });
    },
    methods: {
      doCreate:function (obj) {

      },
      doDelete:function(id,callback){
        var that = this;
        var data = {
          token:that.token,
          id:id
        };
        Web.post(Web.host + "/api/"+ that.home + "/delete.do",data,function (res) {
            if(res.status){
              if(callback){
                callback();
              }
            }else{
              layer.close();
              layer.alert("删除失败");
            }
        })
      },
      doUpdate:function(obj){

      },
      doRead:function(id){
      },
      doSearch:function () {
        var that = this;
        that.tableData.reload({
          where: {
            id:that.obj.id,
            name:that.obj.name
          },
          page: {
            curr: 1
          },
          done: function(res){
            console.log(res)
            if(res.code){
              $(".search-box").hide();
              $(".wrap").hide()
            }else{
              layer.alert("查询失败");
            }
          }
        });
      },
      showBox:function (boxClassName) {
        $(boxClassName).show();
        $(".wrap").show()
      },
      closeBox:function (boxClassName) {
        $(boxClassName).hide();
        $(".wrap").hide()
      }
    }
  }
</script>
