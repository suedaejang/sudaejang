<template>
  <div class="profileSettings">
    <br /><br />
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
              <span class="profileFile material-symbols-outlined">
                manage_accounts
              </span>
            </label>
            <input id="profileImage" type="file" style="display: none" />
          </td>
        </tr>
      </tfoot>
    </table>
    <br />
    <button
      @click="saveTransaction"
      :disabled="!transaction.name || !transaction.email"
      class="profileSubmit"
      type="submit"
    >
      저장
    </button>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const transaction = reactive({
  name: '',
  email: '',
});

const saveTransaction = () => {
  if (!transaction.name || !transaction.email) {
    alert('모든 필수 항목을 입력해주세요.');
    return;
  }
  router.push('/Home');
};
</script>

<style>
.profileSettings {
  width: 859px;
  height: 782px;
  background-color: white;
  border-radius: 30px;
  box-shadow: 10px 10px 10px 0px rgba(190, 190, 190, 0.48);
  text-align: center;
}
.profileSubject {
  font-size: 30px;
  font-weight: 700;
}

.profileList {
  margin: 0 auto;
  width: 50%;
  text-align: left;
  border-collapse: collapse;
}

.profileText {
  font-size: 32px;
  font-weight: 700;
  padding-right: 20px;
  position: relative;
  text-align: right;
}

.asterisk {
  color: red;
  font-size: 30px;
  margin-left: -2px;
  position: absolute;
}

.profileSubmit {
  width: 100px;
  height: 40px;
  background-color: rgb(52, 152, 219);
  color: white;
  border: none;
  border-radius: 20px;
}
.profileSubmit:disabled {
  background-color: lightgray;
}

input[type='text'],
input[type='email'] {
  width: 300px;
  height: 40px;
}

.filebox input[type='file'] {
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
}

.profileFile {
  border: 10px solid gray;
  border-radius: 50%;
}
</style>
