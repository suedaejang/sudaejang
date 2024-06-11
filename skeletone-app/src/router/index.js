import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import ProfileSetting from '@/pages/ProfileSetting.vue';

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
  ],
});

export default router;
