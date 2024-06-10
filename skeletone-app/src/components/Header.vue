<template>
  <div class="container header">
    <h1 class="headerName">가계부</h1>
    <div class="headerRight">
      <div class="input_date_box">
        <input
          type="month"
          data-placeholder="날짜 선택"
          required
          aria-required="true"
        />
      </div>
      <div class="profile-wrapper" @click="toggleDropdown">
        <span class="profile material-symbols-outlined"> account_circle </span>
        <div class="dropdown" v-if="isDropdownVisible">
          <ul>
            <li>
              <h3 class="dropdown-name">김용우 님{{ name }}</h3>
            </li>
            <li>
              <span class="set material-symbols-outlined">설정 settings </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const isDropdownVisible = ref(false);

const toggleDropdown = () => {
  isDropdownVisible.value = !isDropdownVisible.value;
};
</script>
<style>
body {
  width: 960px;
  margin: 0 auto;
  background-color: #c1daf7;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 859px;
  height: 163px;
  background-color: white;
  border-radius: 30px;
  box-shadow: 10px 10px 10px 0px rgba(190, 190, 190, 0.48);
}

.headerName {
  margin-left: 40px;
  font-weight: 700;
  font-size: 53px;
}

.headerRight {
  display: flex;
  align-items: center;
  margin-right: 40px;
}

.material-symbols-outlined {
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  font-size: 90px;
  margin-left: 20px;
  color: gray;
}

input[type='month'] {
  position: relative;
  min-height: 30px;
  background: url(../assets/calendar.svg) no-repeat right 10px center / 35px
    auto;
  padding: 10px 12px;
  border: 1px solid white;
  font-size: 20px;
  font-weight: 700;
}

input[type='month']::-webkit-clear-button,
input[type='month']::-webkit-inner-spin-button {
  display: none;
}

input[type='month']::-webkit-calendar-picker-indicator {
  background: transparent;
  z-index: 1;
}

.profile-wrapper {
  position: relative;
  cursor: pointer;
}

.dropdown {
  position: absolute;
  top: 100%;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 15px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.dropdown ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.dropdown li {
  padding: 10px 20px;
  cursor: pointer;
}

.dropdown li:hover {
  background-color: #f0f0f0;
}

.set {
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 30;
  font-size: 22px;
  color: gray;
}
.dropdown-name {
  margin: 0 auto;
  font-size: 22px;
  color: gray;
}
</style>
