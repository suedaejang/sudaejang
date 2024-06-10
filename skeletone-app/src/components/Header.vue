<template>
  <div class="container header">
    <h1 class="headerName">가계부</h1>
    <div class="headerRight">
      <div class="input_date_box">
        <input type="date" />
      </div>
      <span class="material-symbols-outlined"> account_circle </span>
    </div>
  </div>
</template>
<script setup>
// composition api에서 값형 데이터를 반응형으로 만들때 ref 사용
import { ref } from 'vue';
const isNavShow = ref(false);
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
.cal {
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  font-size: 30px;
  color: gray;
  margin-inline-end: auto;
}

input[type='date'] {
  position: relative;
  min-height: 30px;
  background: url(../assets/calendar.svg) no-repeat right 10px center / 35px
    auto;
  padding: 10px 12px;
  border: 1px solid white;
  font-size: 20px;
}

input[type='date']::-webkit-clear-button,
input[type='date']::-webkit-inner-spin-button {
  display: none;
}
input[type='date']::-webkit-calendar-picker-indicator {
  background: transparent;
  z-index: 1;
}

input[type='date']::before {
  content: attr(placeholder);
}
</style>
