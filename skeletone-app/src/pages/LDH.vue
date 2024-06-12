<template>
  <div class="container">
    <h1>최근 거래 목록</h1>
    <div class="filter">
      <label>조회기간 설정</label>
      <div class="period-options">
        <button @click="setPeriod('today')">오늘</button>
        <button @click="setPeriod('1month')">1개월</button>
        <button @click="setPeriod('3months')">3개월</button>
        <button @click="setPeriod('6months')">6개월</button>
        <button @click="toggleCustomInput">직접입력</button>
      </div>

      <div class="category-filter">
        <label for="category">카테고리</label>
        <select id="category" v-model="selectedCategory">
          <optgroup label="카테고리">
            <option value="">선택</option>
            <option
              v-for="item in category2"
              :key="item.code"
              :value="item.code"
            >
              {{ item.name }}
            </option>
          </optgroup>
        </select>
      </div>
    </div>

    <div class="custom-input" :class="{ show: isCustomInputVisible }">
      <label for="startDate">시작 날짜:</label>
      <input type="date" id="startDate" v-model="customStartDate" />
      <label for="endDate">종료 날짜:</label>
      <input type="date" id="endDate" v-model="customEndDate" />
      <button @click="applyCustomInput">적용</button>
    </div>
  </div>

  <div v-for="(group, date) in sortedFilteredTransactions" :key="date">
    <h2>{{ formatDate(date) }}</h2>
    <div v-for="transaction in group" :key="transaction.id" class="transaction">
      <div class="icon">{{ getTransactionIcon(transaction.category1) }}</div>
      <div class="details">
        <div>{{ transaction.category1 === 'i' ? '입금' : '출금' }}</div>
        <div>{{ getCategoryName(transaction.category) }}</div>
        <div>{{ transaction.time }}</div>
        <div>{{ transaction.description }}</div>
      </div>
      <div class="category2">
        {{ getCategoryName(transaction.category2) }}
      </div>

      <div class="memo">
        <i class="fa-regular fa-note-sticky"></i>
        {{ transaction.memo }}
      </div>
      <div class="amount-balance">
        <div class="amount">
          {{
            formatAmount(
              transaction.amount,
              transaction.category1,
              transaction.category2
            )
          }}원
        </div>
        <div class="balance">{{ formatAmount(transaction.balance) }}원</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

const BASEURI = '/api/account';
const BASEURI2 = '/api/category2';
const transactions = ref([]);
const isCustomInputVisible = ref(false);
const customStartDate = ref('');
const customEndDate = ref('');
const selectedCategory = ref('');
const filteredTransactions = ref([]);
const category2 = ref([]);

const fetchTodoList = async () => {
  try {
    const response = await axios.get(BASEURI);
    if (response.status === 200) {
      transactions.value = response.data.map((transaction) => ({
        ...transaction,
        amount: transaction.money !== undefined ? transaction.money : 0,
        balance: transaction.total !== undefined ? transaction.total : 0,
      }));
      applyFilters();
    } else {
      alert('데이터 조회 실패');
    }
  } catch (error) {
    alert('에러발생 : ' + error);
  }
};

const fetchCategory2 = async () => {
  try {
    const response = await axios.get(BASEURI2);
    if (response.status === 200) {
      category2.value = response.data;
      console.log('!!!!', category2.value);
    } else {
      alert('데이터 조회 실패');
    }
  } catch (error) {
    alert('에러발생 : ' + error);
  }
};

onMounted(() => {
  fetchTodoList();
  fetchCategory2();
});

const getCategoryName = (categoryCode) => {
  const category = category2.value.find((c) => c.code === categoryCode);
  return category ? category.name : '';
};

const applyFilters = () => {
  let filtered = transactions.value;

  if (selectedCategory.value) {
    filtered = filtered.filter(
      (transaction) => transaction.category === selectedCategory.value
    );
  }

  if (customStartDate.value && customEndDate.value) {
    const startDate = new Date(customStartDate.value);
    const endDate = new Date(customEndDate.value);
    filtered = filtered.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= startDate && transactionDate <= endDate;
    });
  }

  filteredTransactions.value = filtered;
};

const setPeriod = (period) => {
  const today = new Date();
  let startDate;

  switch (period) {
    case 'today':
      startDate = new Date(today.setHours(0, 0, 0, 0));
      break;
    case '1month':
      startDate = new Date(today.setMonth(today.getMonth() - 1));
      break;
    case '3months':
      startDate = new Date(today.setMonth(today.getMonth() - 3));
      break;
    case '6months':
      startDate = new Date(today.setMonth(today.getMonth() - 6));
      break;
  }

  customStartDate.value = startDate.toISOString().split('T')[0];
  customEndDate.value = new Date().toISOString().split('T')[0];

  applyFilters();
};

const toggleCustomInput = () => {
  isCustomInputVisible.value = !isCustomInputVisible.value;
};

const applyCustomInput = () => {
  applyFilters();
};

const formatDate = (dateStr) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateStr).toLocaleDateString('ko-KR', options);
};

const formatTime = (dateStr) => {
  const options = { hour: '2-digit', minute: '2-digit' };
  return new Date(dateStr).toLocaleTimeString('ko-KR', options);
};

//확인 필요
const formatAmount = (amount, category1 = null, category2 = null) => {
  if (amount !== null && amount !== undefined) {
    const sign = category1 === 'i' ? '+' : category1 === 'o' ? '-' : '';
    const categoryName = getCategoryName(category2); // getCategoryName 함수에 category2 값을 전달
    return `${sign}${amount.toLocaleString()} ${categoryName}`;
  } else {
    return '0';
  }
};

const groupedTransactions = computed(() => {
  const groups = {};
  filteredTransactions.value.forEach((transaction) => {
    const date = transaction.date.split('T')[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(transaction);
  });
  return groups;
});

const sortedFilteredTransactions = computed(() => {
  const sortedGroups = Object.keys(groupedTransactions.value)
    .sort((a, b) => new Date(b) - new Date(a))
    .reduce((acc, key) => {
      acc[key] = groupedTransactions.value[key];
      return acc;
    }, {});
  return sortedGroups;
});

const getTransactionIcon = (category1) => {
  return category1 === 'o' ? '🔻' : '🔺';
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
}

.period-options button {
  margin: 5px;
}

.custom-input {
  display: none;
}

.custom-input.show {
  display: block;
}

.transaction {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
}

.transaction .icon {
  font-size: 24px;
}

.transaction .details {
  flex: 1;
  margin-left: 10px;
}

.transaction .amount-balance {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.transaction .amount {
  font-weight: bold;
  color: red;
}

.transaction .balance {
  color: gray;
}

.memo {
  flex: 10;
  justify-content: space-between;
  text-align: center;
}

.category2 {
  margin-left: 150px;
}
</style>
