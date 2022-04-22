import { createRouter, createWebHistory } from 'vue-router'
import Main from '../views/Main.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Main
    },
    {
      path: '/story/:id',
      name: 'story',
      component: () => import('../views/Story.vue')
    },
    {
      path: '/story/:id/edit/:pid',
      name: 'edit story',
      component: () => import('../views/StoryEdit.vue')
    },
    {
      path: '/story/:id/global',
      name: 'global setting',
      component: () => import('../views/GlobalSettingStory.vue')
    },
    {
      path: '/story/:id/play',
      name: 'play story',
      component: () => import('../views/PlayStory.vue')
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: Main }
  ]
})

export default router
