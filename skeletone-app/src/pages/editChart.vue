<template>
  <div class="totalBox">
    <div class="totalInfo">
      <div class="nameRow">
        <h1>가계부 수정(제목)</h1>
      </div>
      <!-- 수정 대상 거래 -->
      <div class="targetRow">
        <p>수정대상 리스트 정보(예정)</p>
      </div>
      <!-- 수정 상세 -->
      <div class="infoRow">
        <div class="col">
          <br /><br /><br /><br /><br />
          <div class="form-group">
            <label :class="{ required: !transaction.type }" for="inNout">
              입출금 구분
            </label>
            <select class="form-control" id="inNout" v-model="transaction.type">
              <option value="" disabled>카테고리</option>
              <option value="o">지출</option>
              <option value="i">수입</option>
            </select>
          </div>
          <div class="form-group">
            <label :class="{ required: !transaction.category2 }" for="cate">
              카테고리
            </label>
            <select
              class="form-control"
              id="cate"
              v-model="transaction.category2"
            >
              <option value="" disabled>카테고리</option>
              <option
                v-for="cat in states2.todoList"
                :key="cat.code"
                :value="cat.code"
              >
                {{ cat.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="memo">메모</label>
            <input
              type="text"
              class="form-control"
              id="memo"
              v-model="transaction.memo"
              placeholder="메모 내용을 입력해주세요"
            />
          </div>
          <div class="form-group">
            <label
              :class="{
                required: !transaction.amount,
              }"
              for="cash"
              >금액</label
            >
            <input
              type="text"
              class="form-control"
              id="cash"
              v-model="transaction.amount"
              placeholder="금액을 입력해주세요"
              pattern="\d*"
            />
          </div>
          <div class="form-group">
            <label
              :class="{
                required: !transaction.date,
              }"
              for="date"
              >거래 날짜</label
            >
            <input
              type="date"
              class="form-control"
              id="date"
              v-model="transaction.date"
            />

            <input
              type="time"
              class="form-control"
              id="time"
              v-model="transaction.time"
            />
          </div>
          <div class="btnsGroup form-group">
            <button
              type="button"
              class="editBtnCancle btn btn-primary m-1"
              @click="cancleTransaction"
            >
              취소</button
            >&nbsp;&nbsp;&nbsp;&nbsp;
            <button
              type="button"
              class="editBtnSubmit btn btn-primary m-1"
              @click="saveTransaction"
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const id = route.params.id;

const BASEURI = '/api/account';
const BASEURI2 = '/api/category2';
const states = reactive({ todoList: [] });
const states2 = reactive({ todoList: [] });

const transaction = reactive({
  type: '',
  category: '',
  memo: '',
  amount: '',
  date: '',
  time: '',
});

const fetchTransaction = async () => {
  try {
    const response = await axios.get(`${BASEURI}/${id}`);
    if (response.status === 200) {
      const targetTransaction = response.data;
      transaction.type = targetTransaction.category1 === 'o' ? 'o' : 'i';
      transaction.category2 = targetTransaction.category2;
      transaction.memo = targetTransaction.memo;
      transaction.amount = targetTransaction.money;
      transaction.date = targetTransaction.date;
      transaction.time = targetTransaction.time;
    } else {
      alert('데이터 조회 실패');
    }
  } catch (error) {
    alert('에러 발생: ' + error);
  }
};

const fetchCategories = async () => {
  try {
    const response = await axios.get(BASEURI2);
    if (response.status === 200) {
      states2.todoList = response.data;
    } else {
      alert('데이터 조회 실패');
    }
  } catch (error) {
    alert('에러 발생: ' + error);
  }
};

onMounted(() => {
  fetchTransaction();
  fetchCategories();
});

const router = useRouter();

const saveTransaction = () => {
  if (
    !transaction.type ||
    !transaction.category ||
    !transaction.amount ||
    !transaction.date
  ) {
    alert('모든 필수 항목을 입력해주세요.');
    return;
  }
  // save transaction logic here, e.g., axios.post(BASEURI, transaction)
  router.push('/Home');
};

const cancleTransaction = () => {
  const userConfirmed = confirm('수정을 취소하시겠습니까?');
  if (userConfirmed) {
    router.push('/Home');
  }
};
</script>

<style>
/* 전체 수정 박스 */
.totalBox {
  height: 700px;
  width: 859px;
  margin: 20px 0;
  background-color: white;
  border-radius: 30px;
  box-shadow: 10px 10px 10px 0px rgba(190, 190, 190, 0.48);
  margin-top: 15px;
  position: relative;
}
/* 전체 내용 묶음 */
.totalInfo {
  position: absolute;
  top: 30px;
}

/* 가계부 수정, 제목 파트 */
.nameRow {
  text-align: center;
  margin: 0 auto;
  position: absolute;
}
.totalBox > .nameRow > div > h2 {
  color: red;
  height: 60px;
  width: 429px;
  margin: 0 auto;
}

/* 대상 거래내역 정보 파트 */
.targetRow {
  width: 600px;
  height: 130px;
  background-color: #cddef1;
  border-radius: 30px;
  position: absolute;
  top: 60px;
  margin: 0 auto;
  margin-left: 120px;
}

/* 세부 입력박스 파트 */
.infoRow {
  width: 600px;
  height: 500px;
  position: absolute;
  top: 170px;
  left: 59px;
}
.required::after {
  content: ' *';
  color: red;
  font: 30px bold;
}
.form-group select,
.form-group input {
  width: 460px;
  height: 40px;
  box-sizing: border-box;
  margin-top: 30px;
}
.form-group > label {
  font: 20px bold;
}
/* 일자, 시간 토막내기, 아이콘 크기 */
#date,
#time {
  width: 200px;
  height: 40px;
  box-sizing: border-box;
  margin-top: 30px;
}
i {
  font-size: 35px;
}

input[type='date'] {
  position: relative;
  min-height: 30px;
  background: url(../assets/calendar.svg) no-repeat right 10px center / 35px
    auto;
  padding: 10px 12px;
  border: 1px solid white;
  font-size: 20px;
  font-weight: 700;
}

input[type='date']::-webkit-clear-button,
input[type='date']::-webkit-inner-spin-button {
  display: none;
}

input[type='date']::-webkit-calendar-picker-indicator {
  background: transparent;
  z-index: 1;
}
input[type='time'] {
  position: relative;
  min-height: 30px;
  background: url(../assets/clock.svg) no-repeat right 10px center / 35px auto;
  padding: 10px 12px;
  border: 1px solid white;
  font-size: 20px;
  font-weight: 700;
}

input[type='time']::-webkit-clear-button,
input[type='time']::-webkit-inner-spin-button {
  display: none;
}

input[type='time']::-webkit-calendar-picker-indicator {
  background: transparent;
  z-index: 1;
}

.editBtnCancle {
  width: 100px;
  height: 40px;
  background-color: lightgray;
  color: black;
  border: none;
  border-radius: 10px;
  font-size: 20px;
}
.editBtnCancle:active {
  width: 100px;
  height: 40px;
  background-color: gray;
  color: black;
  border: none;
  border-radius: 10px;
  font-size: 20px;
}
.editBtnSubmit {
  width: 100px;
  height: 40px;
  background-color: rgb(255, 204, 80);
  color: black;
  border: none;
  border-radius: 10px;
  font-size: 20px;
}
.editBtnSubmit:active {
  width: 100px;
  height: 40px;
  background-color: lightgray;
  color: black;
  border: none;
  border-radius: 10px;
  font-size: 20px;
}
.btnsGroup {
  margin-left: 200px;
}
</style>
