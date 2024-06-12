import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import ProfileSetting from '@/pages/ProfileSetting.vue';
import editChart from '@/pages/editChart.vue';
import addChart from '@/pages/addChart.vue';

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
    ],
});

export default router;
