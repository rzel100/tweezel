import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import StoryView from '../views/StoryView.vue'
import StoryEdit from '../views/StoryEdit.vue'
import GlobalSettingStory from '../views/GlobalSettingStory.vue'
import PlayStory from '../views/PlayStory.vue'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainView,
    },
    {
      path: '/story/:id',
      name: 'story',
      component: StoryView,
    },
    {
      path: '/story/:id/edit/:pid',
      name: 'edit story',
      component: StoryEdit,
    },
    {
      path: '/story/:id/global',
      name: 'global setting',
      component: GlobalSettingStory,
    },
    {
      path: '/story/:id/play',
      name: 'play story',
      component: PlayStory,
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: MainView },
  ],
})

export default router
