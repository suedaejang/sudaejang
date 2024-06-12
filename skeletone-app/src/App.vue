<template>
  <div class="container">
    <Header />
    <router-view />
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue';
import LDH from './pages/LDH.vue';
import { reactive, computed, provide } from 'vue';

// const BASEURI2 = '/api/category2';
</script>
