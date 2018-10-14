import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Issue from '@/components/Issue'
import Event from '@/components/Event'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/issue/:slug',
      props: true,
      name: 'Issue',
      component: Issue
    },
    {
      path: '/live',
      name: 'Event',
      component: Event
    }
  ]
})
