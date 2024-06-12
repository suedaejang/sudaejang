import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';

import ProfileSetting from '@/pages/ProfileSetting.vue';

import editChart from '@/pages/editChart.vue';
import addChart from '@/pages/addChart.vue';
import LDH from '../pages/LDH.vue';
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
            name: 'editChart',
            component: editChart,
        },
        {
            path: '/add',
            name: 'addChart',
            component: addChart,
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
