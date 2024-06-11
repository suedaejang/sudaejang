import { createRouter, createWebHistory } from 'vue-router';
import editChart from '@/pages/editChart.vue';
import Home from '@/pages/Home.vue';
import addChart from '@/pages/addChart.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/pages/addChart',
            name: 'addChart',
            component: addChart,
        },
        {
            path: '/pages/editChart',
            name: 'editChart',
            component: editChart,
        },
        {
            path: '/',
            name: 'Home',
            component: Home,
        },
    ],
});

export default router;
