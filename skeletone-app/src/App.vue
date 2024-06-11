<script setup>
import { reactive, computed, provide } from 'vue';
import Header from './components/Header.vue';
import axios from 'axios';
// import AddChart from './pages/addChart.vue';

const BASEURI = '/api/account';
const BASEURI2 = '/api/category2';
const states = reactive({ todoList: [] });

const chartAdd = async (
    { money, category1, category2, memo, date, time },
    successCallback
) => {
    try {
        const payload = {
            money,
            category1,
            category2,
            memo,
            date,
            time,
        };
        const response = await axios.post(
            BASEURI,
            BASEURI2,
            payload
        );

        if (response.status === 201) {
            states.todoList.push({
                ...response.data,
                done: false,
            });
            successCallback();
        } else {
            alert('chart 추가 실패');
        }
    } catch (error) {
        alert('에러발생 :' + error);
    }
};

provide('actions', { chartAdd });
</script>

<template>
    <div class="container">
        <Header />
        <router-view />
    </div>
</template>
