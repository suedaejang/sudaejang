import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import LDH from '../pages/LDH.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/pages/LDH',
      name: 'LDH',
      component: LDH,
    },
  ],
});

export default router;

// router/index.js 또는 router.js

// import { createRouter, createWebHistory } from 'vue-router';
// import Home from '../components/Header.vue';
// import LDH from '../pages/LDH.vue';

// const routes = [
//   { path: '/', component: Home },
//   { path: '/ldh', component: LDH },
// ];

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });

// export default router;
