<template>
  <div>

    <div style="margin-top: 10px;padding-left: 20px;">
      <button class="layui-btn" @click="showBox('.search-box')">
        <i class="layui-icon">&#xe615;</i> 搜索
      </button>
      <button class="layui-btn" @click="goAddBlog('')">
        <i class="layui-icon">&#xe608;</i> 添加
      </button>
      <button class="layui-btn" @click="deleteAll()">
        <i class="layui-icon">&#x1006;</i> 删除
      </button>
    </div>

    <table class="layui-hide" id="Blog" :lay-filter="home"></table>
    <script type="text/html" id="operation">
      <a class="layui-btn layui-btn-xs" lay-event="edit"><i class="layui-icon">&#xe642;</i>编辑</a>
      <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del"><i class="layui-icon">&#xe640;</i>删除</a>
    </script>
    <div class="search-box">
      <div class="box-head">
        <div class="head-title">搜索</div>
        <div class="close"><img src="../../static/img/close.png" style="width: 20px;" @click="closeBox('.search-box')"/></div>
        <div style="clear: both"></div>
        <hr style="width: 100%;height: 1px;padding: 0;background-color: #b1a9a9;"/>
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
    <div class="wrap"></div>
  </div>
</template>
<script>

  import { Web } from "../../static/js/web.js";
  import Blog from './Blog.vue'

  export default {
    data () {
      return {
        home:"Blog",
        token:Web.getToken(),
        cols:[
          {type:'checkbox'}
          ,{field:'id', title: 'ID'}
          ,{field:'name', title: '名称'}
          ,{field:'categoryId', title: '分类'}
          ,{field:'viewNum', title: '观看数'}
          ,{field:'likeNum', title: '点赞数'}
          ,{field:'status', title: '状态',templet: function (d) {
            if(d.status === "0"){
              return "已下线";
            }else if(d.status === "1"){
              return "编辑中";
            }else if(d.status === "2"){
              return "已发布";
            }
            }}
          ,{ align:'center', toolbar: '#operation', title: '操作'}
        ],
        tableData:null,
        page:1,
        pageSize:10,
        menus:[],
        //编辑对象
        obj:{
          id:"",
          name:"",
          content:"",
          markdown:"",
          categoryId:"",
          viewNum:"",
          likeNum:"",
          status:"",
          ip:"",
          userAgent:"",
          remark:"",
          createAt:"",
          createBy:"",
          updateAt:"",
          updateBy:"",
          deleteAt:"",
          deleteBy:"0"
        },
        allData:[],//总数据
        chooseArray:[],//复选框选中数据
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
              "count": res.data.totalElements, //解析数据长度
              "data": res.data.content //解析数据列表
            };
          },
          done:function (res,curr) {
            if(res.code){
              that.allData = res.data;
              that.page = curr
            }
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
                  that.doSearch();
                  layer.close(index);
                });
              },
              function(index){
                layer.close(index);
              }
            });
          } else if(obj.event === 'edit'){
            that.obj = data;
            that.goAddBlog(that.obj.id);
          }
        });
        table.on('checkbox('+ that.home +')', function(obj){
          if(obj.type == 'one'){
            if(obj.checked){
              that.chooseArray.push(obj.data)
            }else{
              Web.removeObj(obj.data,that.chooseArray);
            }
          }else if(obj.type == 'all'){
            if(obj.checked){
              that.chooseArray = that.allData;
            }else{
              that.chooseArray = [];
            }
          }
        });
      });
      that.menus = Web.getValue("menus");
    },
    methods: {
      initObj:function(){
        var that = this;
        that.obj={
          id:"",
          name:"",
          content:"",
          markdown:"",
          categoryId:"",
          viewNum:"",
          likeNum:"",
          status:"",
          ip:"",
          userAgent:"",
          remark:"",
          createAt:"",
          createBy:"",
          updateAt:"",
          updateBy:"",
          deleteAt:"",
          deleteBy:"0"
        };
      },
      goAddBlog:function(id){
        window.open("static/addBlog.html?id="+id);
      },
      doCreate:function () {
        var that = this;
        var data = {
          token:that.token,
          obj:that.obj
        }
        Web.post(Web.host + "/api/"+ that.home + "/create.do",data,function (res) {
          if(res.status){
            Web.showToast("添加成功",2000);
            that.closeBox(".create-box");
            that.initObj();
            that.doSearch();
          }else{
            layer.alert("添加失败");
          }
        })
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
      deleteAll: function () {
        var that = this;
        if (that.chooseArray.length == 0) {
          Web.showToast("请选择要删除的数据", 2000);
          return
        }
        var ids = "";
        for (var i = 0; i < that.chooseArray.length; i++) {
          if (i > 0) {
            ids += ","
          }
          ids += that.chooseArray[i].id
        }
        that.doDelete(ids, function () {
          Web.showToast("删除成功", 2000);
          that.doSearch();
        })
      },
      doUpdate:function(){
        var that = this;
        var data = {
          token:that.token,
          obj:that.obj
        }
        Web.post(Web.host + "/api/"+ that.home + "/update.do",data,function (res) {
          if(res.status){
            Web.showToast("修改成功",2000);
            that.closeBox(".edit-box");
            that.initObj();
            that.doSearch();
          }else{
            layer.alert("修改失败");
          }
        })
      },
      doSearch:function () {
        var that = this;
        that.chooseArray = [];
        that.tableData.reload({
          where: {
            id:that.obj.id,
            name:that.obj.name
          },
          page: {
            curr: that.page
          },
          done: function(res){
            if(res.code){
              $(".search-box").hide();
              $(".wrap").hide()
            }else{
              layer.alert("查询失败");
            }
          }
        });
        that.$forceUpdate();
      },
      showBox:function (boxClassName) {
        var that = this;
        that.initObj();
        $(boxClassName).show();
        $(".wrap").show();
      },
      closeBox:function (boxClassName) {
        $(boxClassName).hide();
        $(".wrap").hide()
      },
      compile:function(){
        var text = document.getElementById("content").value;
        var converter = new showdown.Converter();
        var html = converter.makeHtml(text);
        document.getElementById("result").innerHTML = html;
      }
    }
  }

</script>
