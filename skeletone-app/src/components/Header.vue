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
      <div class="profile-wrapper" @click="toggleDropdown" ref="profileWrapper">
        <span class="profile material-symbols-outlined"> account_circle </span>
        <div
          class="dropdown"
          v-if="isDropdownVisible"
          @mouseleave="hideDropdown"
        >
          <ul>
            <li>
              <h3 class="dropdown-name">김용우 님{{ name }}</h3>
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

<script>
export default {
  data() {
    return {
      isDropdownVisible: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.isDropdownVisible = !this.isDropdownVisible;
    },
    goToProfileSetting() {
      this.$router.push({ name: 'profileSetting' });
      this.isDropdownVisible = false;
    },
    hideDropdown() {
      this.isDropdownVisible = false;
    },
  },
};
</script>
