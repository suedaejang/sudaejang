<template>
  <div class="card card-body">
    <!-- <a @click="router.push(`/edit2/${todoItem.id}`)">편집</a> -->
    <a @click="router.push(`/edit2/user1`)">편집</a>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { inject } from 'vue';

defineProps({
  todoItem: { Type: Object, required: true },
});

const router = useRouter();
</script>
