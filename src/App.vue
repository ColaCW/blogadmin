<template>
  <div id="app">
    <el-container style="height: 100%;">
      <el-header class="el-header">
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        <marquee class="marquee"
          scrollamount ="5"
          onmouseover=this.stop()
          onmouseout=this.start()
          >欢迎进入LGQ博客后台管理系统</marquee>
      </el-header>
      <el-container>
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
              <el-submenu :index="menu.href">
                <template slot="title">
                  <i :class="index == 0 ? 'el-icon-location' : 'el-icon-menu'"></i>
                  <span>{{menu.name}}</span>
                </template>
                <el-menu-item-group>
                  <template v-for="(menu1,index1) in menus" v-if="menu1.parentId == menu.id && menu1.hide === 0">
                    <el-menu-item  :index="menu1.href" @click="goMenu(menu1.href,menu1.name)">&nbsp;&nbsp;&nbsp;&nbsp;<i class="el-icon-star-off"></i>{{menu1.name}}</el-menu-item>
                  </template>
                </el-menu-item-group>
              </el-submenu>
            </template>
          </el-menu>
        </el-aside>
        <el-container>
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
        user:{},
        imgPhoto:"",
        chooseTopIndex:0,
        topMenus:[{"name":"首页","href":"/"}],
        activeMenu: '首页'
      }
    },
    mounted:function(){
      window.vue = this;
      this.user = {"username":"lgq"};
      this.imgPhoto = Web.getSrc('/index/img/gaga.jpg');
      this.$router.push("/");
      this.init();
    },
    methods: {
      init:function(){
        var data = {
          page:this.page,
          pageSize:this.pageSize
        };
        this.axios.get(Web.host + "/api/"+ this.home + "/search.do", data)
          .then(res =>{
            if(res.status){
              if(this.page == 0){
                this.menus = res.data.data;
              }else{
                this.menus = res.data.data.content
              }
              Web.setValue("menus",this.menus)
            }
          })
          .catch(err =>{
            console.log(err);
        })
      },
      logout:function () {
        Web.logout(Web.host+"/index.do");
      },
      goTopMenu:function(tab,event){
        this.chooseTopIndex = tab.index;
        this.$router.push(this.topMenus[this.chooseTopIndex].href);
        this.$forceUpdate();
      },
      goMenu:function (href,name) {
        var flag = false;
        for(var i = 0;i<this.topMenus.length;i++){
          if(href === this.topMenus[i].href){
            this.chooseTopIndex = i;
            flag = true;
            break;
          }
        }
        if(!flag){
          var data = {
            name:name,
            href:href
          };
          this.topMenus.push(data);
          this.chooseTopIndex = this.topMenus.length-1;
        }
        this.activeMenu = name;
        this.$router.push(href);
        this.$forceUpdate();
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
  }
  .marquee{
    color:white;
    font-size: 12px;
  }
  .asid1{
    max-width: 65px;
  }
  .asid2{
    max-width: 220px;
  }
</style>
