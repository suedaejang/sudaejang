<script setup>
import Header from '@/components/Header.vue';
import LDH from './pages/LDH.vue';
import { reactive, computed, provide } from 'vue';

// const BASEURI2 = '/api/category2';
</script>

<template>
  <br /><br />
  <Header />
  <br />
  <router-view />
  <br /><br />
</template>
