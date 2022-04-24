import { createRouter, createWebHistory } from 'vue-router'
import Main from '../views/Main.vue'
import Story from '../views/Story.vue'
import StoryEdit from '../views/StoryEdit.vue'
import GlobalSettingStory from '../views/GlobalSettingStory.vue'
import PlayStory from '../views/PlayStory.vue'

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
      component: Story
    },
    {
      path: '/story/:id/edit/:pid',
      name: 'edit story',
      component: StoryEdit
    },
    {
      path: '/story/:id/global',
      name: 'global setting',
      component: GlobalSettingStory
    },
    {
      path: '/story/:id/play',
      name: 'play story',
      component: PlayStory
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: Main }
  ]
})

export default router
