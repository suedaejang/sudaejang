<template>
  <div class="profileSettings">
    <br /><br />
    <br />
    <br />
    <a class="profileSubject">프로필 수정</a>
    <br /><br />
    <table class="profileList">
      <thead>
        <tr>
          <th :class="{ required: !transaction.name }" class="profileText">
            이름
            <span class="asterisk" v-if="!transaction.name">*</span>
          </th>
          <td>
            <input
              id="profileName"
              type="text"
              name="name"
              placeholder="이름을 입력해주세요"
              v-model="transaction.name"
            />
          </td>
        </tr>
      </thead>
      <br />
      <br />
      <tbody>
        <tr>
          <th :class="{ required: !transaction.email }" class="profileText">
            이메일
            <span class="asterisk" v-if="!transaction.email">*</span>
          </th>
          <td>
            <input
              id="profileEmail"
              type="email"
              name="email"
              placeholder="이메일을 입력해주세요"
              v-model="transaction.email"
            />
          </td>
        </tr>
      </tbody>
      <br />
      <br />
      <tfoot>
        <tr>
          <th class="profileText">프로필</th>
          <td>
            <label for="profileImage" class="fileUploadButton">
              <img id="profileDbImg" :src="store.profileImageUrl" />
            </label>
            <input
              id="profileImage"
              @change="handleFileUpload"
              type="file"
              style="display: none"
            />
          </td>
        </tr>
      </tfoot>
    </table>
    <br /><br />
    <button
      class="profileCancel"
      @click="openModal"
      :disabled="!transaction.name || !transaction.email"
      type="button"
    >
      취소
    </button>
    &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
    <button
      @click="saveTransaction"
      :disabled="!transaction.name || !transaction.email"
      class="profileSubmit"
      type="submit"
    >
      저장
    </button>
  </div>
  <br />
  <br />

  <div id="modal" class="modal" v-show="isModalVisible">
    <div class="modal-content">
      <p>저장하지 않으시겠습니까?</p>
      <br />
      <div class="modal-buttons">
        <button id="modalYes" @click="confirmCancel">예</button>
        <button id="modalNo" @click="closeModal">아니요</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useProfileStore } from '@/stores/profileDate.js';

const store = useProfileStore();
const router = useRouter();

const transaction = reactive({
  id: 'user1',
  name: '',
  email: '',
  profileImage: '',
});
const isModalVisible = ref(false);

const confirmCancel = () => {
  closeModal();
  location.reload();
};

const closeModal = () => {
  isModalVisible.value = false;
};

const openModal = () => {
  if (!transaction.name || !transaction.email) {
    alert('모든 필수 항목을 입력해주세요.');
  }
  isModalVisible.value = true;
};

const loadTransaction = async () => {
  try {
    const response = await axios.get('http://localhost:3000/account/user1');
    const user = response.data;
    transaction.name = user.name;
    transaction.email = user.email;
    transaction.profileImage = user.img;
    store.profileImageUrl = user.img;
  } catch (error) {
    console.error('에러 내용:', error);
  }
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    transaction.profileImage = e.target.result;
    store.profileImageUrl = e.target.result;
  };
  reader.readAsDataURL(file);
};

const saveTransaction = async () => {
  if (!transaction.name || !transaction.email) {
    alert('모든 필수 항목을 입력해주세요.');
    return;
  }

  const updatedData = {
    name: transaction.name,
    email: transaction.email,
    img: transaction.profileImage,
  };

  try {
    await axios.patch(`http://localhost:3000/account/user1`, updatedData);
    router.push({ name: 'home' });
    location.reload();
  } catch (error) {
    console.error('에러 내용:', error);
    alert('저장 중 오류가 발생했습니다.');
  }
};

onMounted(() => {
  loadTransaction();
});
</script>
