import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Blog from '@/components/Blog'
import BlogType from '@/components/BlogType'
import SystemMenu from '@/components/SystemMenu'

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
      path: '/BlogType',
      name: 'BlogType',
      component: BlogType
    },
    {
      path: '/SystemMenu',
      name: 'SystemMenu',
      component: SystemMenu
    }
  ]
})
