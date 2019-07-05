import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Blog from '@/components/Blog'
import BlogCategory from '@/components/BlogCategory'
import SystemMenu from '@/components/SystemMenu'
import LoginUser from '@/components/LoginUser'
import Upload from '@/components/Upload'
import User from '@/components/User'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/Blog',
      name: 'Blog',
      component: Blog
    },
    {
      path: '/BlogCategory',
      name: 'BlogCategory',
      component: BlogCategory
    },
    {
      path: '/SystemMenu',
      name: 'SystemMenu',
      component: SystemMenu
    },
    {
      path: '/LoginUser',
      name: 'LoginUser',
      component: LoginUser
    },
    {
      path: '/Upload',
      name: 'Upload',
      component: Upload
    },
    {
      path: '/User',
      name: 'User',
      component: User
    }

  ]
})
