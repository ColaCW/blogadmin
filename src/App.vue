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
              <a href="javascript:;"><i class="layui-icon">&#xe68e;</i>&nbsp;&nbsp;{{menu.name}}</a>
              <dl class="layui-nav-child">
                <template v-for="menu1 in menus" v-if="menu1.parentId == menu.id">
                  <dd><a href="javascript:;" @click="goMenu(menu1.href,menu1.name)">&nbsp;&nbsp;{{menu1.name}}</a></dd>
                </template>
              </dl>
            </li>
          </template>
        </ul>
      </div>
    </div>
    <div class="layui-body">
      <div class="layui-tab" lay-filter="top_tab">
        <ul class="layui-tab-title" style="padding: 0 10px;">
            <template v-for="(topMenu,index) in topMenus">
              <li :class="index == chooseTopIndex ? 'layui-this' : ''">
                <label>{{topMenu.name}}</label>
                <!--<i class="layui-icon layui-unselect layui-tab-close" @click="deleteTopMenu(index)">ဆ</i>-->
              </li>
            </template>
        </ul>
        <div class="layui-tab-content" style="padding: 0;">
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
        topMenus:[{"name":"首页","href":"/"}]
      }
    },
    mounted:function(){
      var that = this;
      layui.use('element', function(){
        var element = layui.element;
        element.on('tab(top_tab)', function(data){
          that.goTopMenu(data.index);
        });
      });
      that.user = {"username":"lgq"};
      that.imgPhoto = Web.getSrc('/index/img/gaga.jpg');
      that.$router.push("/")
      that.init();
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
          }
        })
      },
      logout:function () {
        Web.logout(Web.host+"/index.do");
      },
      goTopMenu:function(index){
        var that = this;
        that.chooseTopIndex = index;
        that.$router.push(that.topMenus[that.chooseTopIndex].href);
        that.$forceUpdate();

      },
      goMenu:function (href,name) {
        var that = this;
        var flag = false;
        for(var i = 0;i<that.topMenus.length;i++){
          if(href === that.topMenus[i].href){
            that.chooseTopIndex = i;
            flag = true;
            break;
          }
        }
        if(!flag){
          var data = {
            name:name,
            href:href
          };
          that.topMenus.push(data);
          that.chooseTopIndex = that.topMenus.length-1;
        }
        that.$router.push(href);
        that.$forceUpdate();
      }
    }
  }

</script>
