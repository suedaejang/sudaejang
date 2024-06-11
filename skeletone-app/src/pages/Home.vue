<template>
    <div class="row">
        <div class="col p-3">
            <router-link
                class="btn btn-primary"
                to="/pages/addChart"
            >
                할일 추가
            </router-link>
        </div>
    </div>
    <!-- <div class="row">
        <div class="col">
            <ul class="list-group">
                <TodoItem
                    v-for="todoItem in account"
                    :key="todoItem.id"
                    :todoItem="todoItem"
                />
            </ul>
        </div>
    </div> -->
</template>
<script setup>
// import { inject } from 'vue';
// const account = inject('account');
</script>
