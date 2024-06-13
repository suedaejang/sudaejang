<template>
  <div class="profileSettings">
    <div id="app">
      <div class="navigation">
        <span
          @click="active = 'A'"
          :class="{
            clickable: true,
            active: active === 'A',
          }"
          >월별 목록 요약</span
        >
        <span
          @click="active = 'B'"
          :class="{
            clickable: true,
            active: active === 'B',
          }"
          >이달의 요약</span
        >
      </div>
      <div v-if="active === 'B'">
        <div class="container">
          <div class="row">
            <div
              class="homeSummary item"
              v-for="(text, index) in summaryTexts"
              :key="index"
            >
              <h2>{{ text }}</h2>
              <p>{{ summaryValues[index] }}원</p>
            </div>
          </div>
          <br />
          <div class="homeVideo">
            <iframe
              width="700"
              height="400"
              style="border-radius: 40px"
              src="https://www.youtube.com/embed/1dcMi4ySxx0?autoplay=1&mute=1&controls=0"
              title="자산관리, 전 선택했습니다 KB GOLD&amp;WISE the FIRST✨(15s)"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
      <div v-if="active === 'A'">
        <div class="container">
          <div style="text-align: right">
            <span id="homeBlue">* 파란색 : 수입</span><br />
            <span id="homeRed">* 빨간색 : 지출</span>
          </div>
          <table class="homeClass">
            <thead>
              <tr class="homeTh">
                <th class="th th1">날짜</th>
                <th class="th th2">시간</th>
                <th class="th th3">금액</th>
                <th class="th th4">메모</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(transaction, index) in filteredTransactions"
                :key="index"
              >
                <td class="td td1">{{ transaction.date }}</td>
                <td class="td td2">{{ transaction.time }}</td>
                <td class="td td3" :style="transactionStyle(transaction)">
                  {{ transaction.money }}
                </td>
                <td class="td td4">{{ transaction.memo }}</td>
              </tr>
            </tbody>
          </table>
          <br />
          <a class="ldhLink" href="/pages/LDH">자세히</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const BASEURI = '/api/account';

const active = ref('A');
const transactions = reactive([]);
const selectedMonth = ref('');

const summaryValues = computed(() => {
  let totalIncome = 0;
  let totalExpense = 0;
  transactions.forEach((transaction) => {
    if (transaction.category1 == 'i') {
      totalIncome += transaction.money;
    }
    if (transaction.category1 == 'o') {
      totalExpense += transaction.money;
    }
  });
  const netIncome = totalIncome - totalExpense;
  return [totalIncome, totalExpense, netIncome];
});

const summaryTexts = computed(() => ['총 수입', '총 지출', '순 수입']);

const filteredTransactions = computed(() => {
  const sortedTransactions = [...transactions].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  return sortedTransactions
    .filter((transaction) => {
      return transaction.date.includes(selectedMonth.value);
    })
    .slice(0, 5);
});

const colorCategory = (transaction) => {
  if (transaction.category1 === 'i') {
    return 'blue';
  } else if (transaction.category1 === 'o') {
    return 'red';
  }
  return 'black';
};

const transactionStyle = (transaction) => {
  return {
    color: colorCategory(transaction),
  };
};

const route = useRoute();

const loadTransactions = async () => {
  try {
    const response = await axios.get(BASEURI);
    transactions.splice(0, transactions.length, ...response.data);
    selectedMonth.value = route.query.month || '';
  } catch (error) {
    console.error('에러 내용:', error);
  }
};
watch(
  () => route.query.month,
  (newValue) => {
    selectedMonth.value = newValue || '';
    location.reload();
  }
);

onMounted(() => {
  loadTransactions();
});
</script>
<style>
.homeClass {
  width: 800px;
  margin: 0 auto;
}
.homeSummary {
  width: 700px;
  margin: 0 auto;
}

.homeTh {
  color: black;
  font-size: 30px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.navigation {
  display: flex;
  justify-content: left;
  gap: 20px;
  margin-left: 50px;
  width: 700px;
  height: 60px;
  margin: 0 auto;
}
.clickable {
  margin: 50px 0;
  cursor: pointer;
  color: black;
  font-size: 2em;
  font-weight: 700;
}
.clickable.active {
  color: rgb(255, 204, 80);
  text-decoration: underline;
}
.container {
  max-width: 859px;
  margin: 0;
  padding: 20px;
}
.row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.item {
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 30px;
  text-align: center;
  margin: 0 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.item h2 {
  margin-top: 0;
}
.item p {
  font-size: 24px;
  font-weight: bold;
  margin: 10px 0 0 0;
}
table {
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
}
th.th,
td.td {
  padding: 30px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
th.th {
  border-radius: 40px;
}
.th1 {
  width: 100px;
  text-align: center;
}
.th2 {
  width: 100px;
  text-align: center;
}

.th4 {
  width: 200px;
}

.td1 {
  text-align: center;
  font-size: 18px;
  font-weight: 700;
}
.td2 {
  text-align: center;
  font-size: 18px;
  font-weight: 700;
}
.td3 {
  text-align: center;
  font-size: 18px;
  font-weight: 700;
}
.td4 {
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  color: gray;
}

#homeBlue {
  color: blue;
}

#homeRed {
  color: red;
}

.ldhLink {
  color: black;
  font-size: 40px;
  font-weight: 500;
}
</style>
