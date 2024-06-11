<template>
  <div class="container header">
    <a href="./home" class="headerName">가계부</a>
    <div class="headerRight">
      <div class="input_date_box">
        <input type="month" data-placeholder="날짜 선택" aria-required="true" />
      </div>
      <div class="profile-wrapper" @click="toggleDropdown" ref="profileWrapper">
        <img v-if="profileImageUrl" :src="profileImageUrl" class="profile" />
        <span v-else class="profile material-symbols-outlined">
          account_circle
        </span>
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
              <span class="set material-symbols-outlined">설정 settings </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProfileStore } from '@/stores/profileDate.js';
import { ref, computed } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const store = useProfileStore();
const router = useRouter();

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

const profileImageUrl = computed(
  () => transaction.value.profileImage || store.profileImageUrl
);
const displayName = computed(() => transaction.value.name || store.name);

const toggleDropdown = () => {
  isDropdownVisible.value = !isDropdownVisible.value;
};

const goToProfileSetting = () => {
  router.push({ name: 'profileSetting' });
  isDropdownVisible.value = false;
};

const hideDropdown = () => {
  isDropdownVisible.value = false;
};

loadTransaction();
</script>
