import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import ProfileSetting from '@/pages/ProfileSetting.vue';
import edit from '@/pages/editChart.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/profileSetting',
      name: 'profileSetting',
      component: ProfileSetting,
    },
    {
      path: '/edit/:id',
      component: edit,
    },
  ],
});

export default router;
