<template>
  <div class="container header">
    <a href="/home" class="headerName">
      <img src="../assets/images/lll.PNG" style="width: 90px" /> 가계부
    </a>
    <div class="headerRight">
      <!-- 월 선택 input -->
      <div class="input_date_box">
        <span v-if="monthJ" :class="mainMonth" class="mainMonth">{{
          mainMonth
        }}</span>
        <span v-else class="mainMonth">{{ $route.query.month }}</span>
        <input
          id="month"
          type="month"
          aria-required="true"
          v-model="selectedMonth"
          @change="goMonth"
        />
      </div>
      <!-- 사용자 프로필 드롭다운 -->
      <div class="profile-wrapper" @click="toggleDropdown" ref="profileWrapper">
        <img v-if="profileImageUrl" :src="profileImageUrl" class="profile" />
        <span v-else class="profile material-symbols-outlined"
          >account_circle</span
        >
        <div
          class="dropdown"
          v-if="isDropdownVisible"
          @mouseleave="hideDropdown"
        >
          <ul>
            <li>
              <h3 class="dropdown-name">{{ displayName }} 님</h3>
            </li>
            <li @click="goToProfileSetting">
              <span class="set material-symbols-outlined">설정 settings</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 추가 기능 (예: 거래 추가) -->
      <div class="pencil-container" @click="goAdd">
        <span class="pencil material-symbols-outlined">draft_orders</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
import { useProfileStore } from '@/stores/profileDate.js';

const store = useProfileStore();
const router = useRouter();
const route = useRoute();

const currentTime = new Date();

const selectedMonth = ref(currentTime);

const transaction = ref({
  id: 'user1',
  name: '',
  email: '',
  profileImage: '',
});

const loadTransaction = async () => {
  try {
    const response = await axios.get('http://localhost:3000/account/user1');
    const user = response.data;
    transaction.value.name = user.name;
    transaction.value.email = user.email;
    transaction.value.profileImage = user.img;
    store.profileImageUrl = user.img;
    store.name = user.name;
  } catch (error) {
    console.error('에러 내용:', error);
  }
};

const isDropdownVisible = ref(false);
const toggleDropdown = () => {
  isDropdownVisible.value = !isDropdownVisible.value;
};
const profileImageUrl = computed(
  () => transaction.value.profileImage || store.profileImageUrl
);
const displayName = computed(() => transaction.value.name || store.name);

const goToProfileSetting = () => {
  router.push({ name: 'profileSetting' });
  isDropdownVisible.value = false;
};

const hideDropdown = () => {
  isDropdownVisible.value = false;
};
const mainMonth = computed(() => {
  const time = new Date();
  const year = time.getFullYear();
  const month = ('0' + (time.getMonth() + 1)).slice(-2);
  return `${year}-${month}`;
});

const monthJ = computed(() => {
  return !route.query.month;
});

const goAdd = () => {
  router.push('/add');
};
const goMonth = () => {
  router.push({ path: '/home', query: { month: selectedMonth.value } });
};

onMounted(() => {
  loadTransaction();
});
</script>
