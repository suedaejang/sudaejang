import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import EditChart_2 from '../pages/editChart_2.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/edit/',
      component: EditChart_2,
    },
    {
      path: '/edit2/:id',
      component: EditChart_2,
    },
  ],
});

export default router;
