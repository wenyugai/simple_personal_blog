import Vue from 'vue'
import Router from 'vue-router'
import navigator from '@/components/navigator'
import home from '@/components/home'
import newpost from '@/components/newpost'
import editpost from '@/components/editpost'
import post from '@/components/post'
import notfound from '@/components/notfound'
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        navi:navigator,
        content:home
      }
    },
    {
      path: '/home',
      name: 'home',
      components: {
        navi:navigator,
        content:home
      }
    },
    {
      path: '/newpost',
      name: 'newpost',
      components: {
        navi:navigator,
        content:newpost
      }
    },
    {
      path: '/editpost',
      name: 'editpost',
      components: {
        navi:navigator,
        content:editpost
      }
    },
    {
      path: '/post/:id',
      name: 'post',
      components: {
        navi:navigator,
        content:post
      }
    },
    {
      path: '/404',
      name: 'notfound',
      components: {
        navi:navigator,
        content:notfound
      }
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
