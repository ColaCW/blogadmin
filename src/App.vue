<template>
  <div id="app" class="layui-layout layui-layout-admin">
    <div class="layui-header">
      <div class="layui-logo" style="font-size: 19px;">博客后台</div>
      <ul class="layui-nav layui-layout-left">
        <li class="layui-nav-item"><a href="">网站前台</a></li>
      </ul>
      <ul class="layui-nav layui-layout-right">
        <li class="layui-nav-item">
          <a href="javascript:;">
            <img :src="imgPhoto" class="layui-nav-img">
            {{user.username}}
          </a>
          <dl class="layui-nav-child">
            <dd><a href="">清除缓存</a></dd>
            <dd><a href="javascript:;" @click="logout()">退出</a></dd>
          </dl>
        </li>
      </ul>
    </div>
    <div class="layui-side layui-bg-black">
      <div class="layui-side-scroll">
        <ul class="layui-nav layui-nav-tree" layui-filter="main_nav" id="nav">
          <template v-for="(menu,index) in menus" v-if="menu.parentId == 0">
            <li :class="index == 0 ? 'layui-nav-item layui-nav-itemed' : 'layui-nav-item'">
              <a class="" href="javascript:;"><i class="layui-icon">&#xe68e;</i>&nbsp;&nbsp;{{menu.name}}</a>
              <dl class="layui-nav-child">
                <template v-for="(menu1,index1) in menus" v-if="menu1.parentId == menu.id">
                  <dd><a href="javascript:;" @click="goMenu(menu1.href,menu1.name)">&nbsp;&nbsp;{{menu1.name}}</a></dd>
                </template>
              </dl>
            </li>
          </template>
        </ul>
      </div>
    </div>
    <div class="layui-body">
      <div class="layui-tab" lay-allowClose="true" lay-filter="main_tab">
        <ul class="layui-tab-title" style="padding: 0 10px;">
            <template v-for="(topMenu,index) in topMenus">
              <li :lay-id="index" :class="index == 0 ? 'layui-this' : ''">{{topMenu.name}}</li>
            </template>
        </ul>
        <div class="layui-tab-content">
            <router-view></router-view>
        </div>
      </div>
    </div>
    <div class="layui-footer" style="text-align: center">
      Design  by   刘国强个人博客   吉ICP备18002404号
    </div>
  </div>
</template>
<script>
  import App from './App.vue'
  import { Web } from "../static/js/web.js";
  layui.use('element', function(){
    var element = layui.element;
    element.on('tab(main_tab)', function(data){
      App.chooseTopIndex = data.index;
      App.goMenu(App.topMenus[data.index].href,App.topMenus[data.index].name);
      console.log(data.index); //得到当前Tab的所在下标
    });
    element.on('tabDelete(main_tab)', function(data){
      if(App.chooseTopIndex == data.index && data.index > 0){
        App.goMenu(App.topMenus[data.index-1].href,App.topMenus[data.index-1].name);
      }
      console.log(data.index); //删除下标
    });
  });
  export default{
    name: 'App',
    data () {
      return {
        home:"SystemMenu",
        page:0,
        pageSize:10,
        menus:[],
        user:{},
        imgPhoto:"",
        chooseTopIndex:0,
        topMenus:[
          {"name":"首页","href":"/"},{"name":"系统菜单","href":"SystemMenu"},{"name":"系统菜单","href":"SystemMenu"}
          ]
      }
    },
    beforeMount:function(){
      var now_router = this.$router.history.current.name;
      console.log(now_router);
      this.user = Web.getUser();
      this.imgPhoto = Web.getSrc('/index/img/gaga.jpg');
      this.$router.push("/")
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
            if(that.page == 0){
              that.menus = res.data;
            }else{
              that.menus = res.data.content
            }
            console.log(that.menus)
          }
        })
      },
      logout:function () {
        Web.logout(Web.host+"/index.do");
      },
      goMenu:function (href,name) {
        var that = this;
        var flag = false;
        for(var i = 0;i<that.topMenus.length;i++){
          if(href == that.topMenus[i].href){
            that.chooseTopIndex = i;
            flag = true;
            break;
          }
        }
        if(!flag){
          var data = {
            name:name,
            href:href
          }
          that.topMenus.push(data);
        }
        that.$router.push(href)
      }
    }
  }

</script>
