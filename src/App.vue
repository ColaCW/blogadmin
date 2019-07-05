<template>
  <div id="app">
    <el-container style="height: 100%;">
      <el-header class="el-header">
        <!--        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">-->
        <!--          <el-radio-button :label="false">展开</el-radio-button>-->
        <!--          <el-radio-button :label="true">收起</el-radio-button>-->
        <!--        </el-radio-group>-->
        <div class="logo">
          LGQ博客后台管理系统
        </div>
        <marquee class="marquee"
                 scrollamount ="5"
                 onmouseover=this.stop()
                 onmouseout=this.start()
        >欢迎进入LGQ博客后台管理系统</marquee>
        <div class="user">
          <el-dropdown>
            <span class="el-dropdown-link" style="color: wheat;">
              {{user.roleObj.name}}-{{user.username}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>清除系统缓存</el-dropdown-item>
              <el-dropdown-item @click.native="logout()">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <img :src="user.photo"/>
        </div>
      </el-header>
      <el-container style="height: 100%;">
        <el-aside :class="isCollapse ? 'asid1' : 'asid2'">
          <el-menu
            :collapse="isCollapse"
            default-active="2"
            class="el-menu-box"
            style="height: 100%;max-width: 220px"
            background-color="rgb(57, 61, 73)"
            text-color="#fff"
            active-text-color="#ffd04b">
            <template v-for="(menu,index) in menus" v-if="menu.parentId == 0 && menu.hide === 0">
              <el-submenu :key="menu.id" :index="menu.name">
                <template slot="title">
                  <i :class="index == 0 ? 'el-icon-location' : 'el-icon-menu'"></i>
                  <span>{{menu.name}}</span>
                </template>
                <el-menu-item-group>
                  <template v-for="(menu1,index1) in menus" v-if="menu1.parentId == menu.id && menu1.hide === 0">
                    <el-menu-item :key="menu1.id" :index="menu1.name" @click="goMenu(menu1.href,menu1.name)">&nbsp;&nbsp;&nbsp;&nbsp;<i class="el-icon-star-off"></i>{{menu1.name}}</el-menu-item>
                  </template>
                </el-menu-item-group>
              </el-submenu>
            </template>
          </el-menu>
        </el-aside>
        <el-container style="height: 100%;">
          <el-main>
            <div v-if="topMenus && topMenus.length > 0">
              <el-tabs v-model="activeMenu" type="card" @tab-click="goTopMenu">
                <template v-for="topMenu in topMenus">
                  <el-tab-pane :label="topMenu.name" :name="topMenu.name"></el-tab-pane>
                </template>
              </el-tabs>
              <div>
                <router-view></router-view>
              </div>
            </div>
          </el-main>
          <el-footer style="text-align: center">
            Design  by   刘国强个人博客   吉ICP备18002404号
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script>

  import { Web } from "../static/js/web.js";

  export default{
    name: 'App',
    data () {
      return {
        isCollapse: false,
        home:"SystemMenu",
        page:0,
        pageSize:10,
        menus:[],
        user:{
          username:"lgq",
          photo:Web.getSrc("gaga.jpg"),
          roleObj:{
            name:"系统管理员"
          }
        },
        imgPhoto:"",
        chooseTopIndex:0,
        topMenus:[{"name":"首页","href":"/"}],
        activeMenu: '首页',
      }
    },
    mounted:function(){
      let that = this;
      window.vue = that;
      that.$router.push("/");
      that.init();
    },
    methods: {
      init:function(){
        let that = this;
        that.doSearch();
      },
      doSearch(){
        let that = this;
        let data = {
          page:that.page,
          pageSize:that.pageSize
        };
        that.axios.get(Web.host + "/api/"+ that.home + "/search.do", data)
          .then(res =>{
            if(res.status){
              if(that.page == 0){
                that.menus = res.data.data;
              }else{
                that.menus = res.data.data.content
              }
              Web.setValue("menus",that.menus)
            }
          })
      },
      logout:function () {
        Web.logout(Web.host+"/index/login.html");
      },
      goTopMenu:function(tab,event){
        let that = this;
        that.chooseTopIndex = tab.index;
        that.$router.push(that.topMenus[that.chooseTopIndex].href);
        that.$forceUpdate();
      },
      goMenu:function (href,name) {
        let that = this;
        let flag = false;
        for(let i = 0;i<that.topMenus.length;i++){
          if(href === that.topMenus[i].href){
            that.chooseTopIndex = i;
            flag = true;
            break;
          }
        }
        if(!flag){
          let data = {
            name:name,
            href:href
          };
          that.topMenus.push(data);
          that.chooseTopIndex = that.topMenus.length-1;
        }
        that.activeMenu = name;
        that.$router.push(href);
        that.$forceUpdate();
      }
    }
  }

</script>
<style>
  .el-header{
    background-color: #23262E;
    color: white;
    text-align: center;
    line-height: 60px;
    position: relative;
  }
  .logo{
    width: 220px;
    position: absolute;
    left: 0;
    font-size: 18px;
    font-family: cursive;
  }
  .marquee{
    color:white;
    font-size: 12px;
    position: absolute;
    width: 500px;
    left: 420px;
  }
  .user{
    position: absolute;
    right: 20px;
  }
  .user img{
    width: 30px;
    border-radius: 50%;
  }
  .asid1{
    max-width: 65px;
  }
  .asid2{
    max-width: 220px;
  }
</style>
