<template>
    <div class="container">
        <h1>최근 거래 목록</h1>
        <div class="filter">
            <label>조회기간 설정</label>
            <div class="period-options">
                <button @click="setPeriod('today')">
                    오늘
                </button>
                <button @click="setPeriod('1month')">
                    1개월
                </button>
                <button @click="setPeriod('3months')">
                    3개월
                </button>
                <button @click="setPeriod('6months')">
                    6개월
                </button>
                <button @click="toggleCustomInput">
                    직접입력
                </button>
            </div>

            <div class="category-filter">
                <label for="category">카테고리</label>
                <select
                    id="category"
                    v-model="selectedCategory"
                >
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

        <div
            class="custom-input"
            :class="{ show: isCustomInputVisible }"
        >
            <label for="startDate">시작 날짜:</label>
            <input
                type="date"
                id="startDate"
                v-model="customStartDate"
            />
            <label for="endDate">종료 날짜:</label>
            <input
                type="date"
                id="endDate"
                v-model="customEndDate"
            />
            <button @click="applyCustomInput">적용</button>
        </div>
    </div>

    <div
        v-for="(group, date) in sortedFilteredTransactions"
        :key="date"
    >
        <h2>{{ formatDate(date) }}</h2>
        <div
            v-for="transaction in group"
            :key="transaction.id"
            class="transaction"
        >
            <div class="icon">
                {{
                    getTransactionIcon(
                        transaction.category1
                    )
                }}
            </div>
            <div class="details">
                <div>
                    {{
                        transaction.category1 === 'i'
                            ? '입금'
                            : '출금'
                    }}
                </div>
                <div>
                    {{
                        getCategoryName(
                            transaction.category
                        )
                    }}
                </div>
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
                <div class="balance">
                    {{
                        formatAmount(transaction.balance)
                    }}원
                </div>
            </div>
        </div>
        <infinite-loading
            @infinite="infiniteHandler"
            ref="infiniteLoading"
        >
            <div slot="no-more">
                더 이상 거래 내역이 없습니다.
            </div>
        </infinite-loading>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import InfiniteLoading from 'v3-infinite-loading';

const BASEURI = '/api/account';
const BASEURI2 = '/api/category2';
const transactions = ref([]);
const isCustomInputVisible = ref(false);
const customStartDate = ref('');
const customEndDate = ref('');
const selectedCategory = ref('');
const filteredTransactions = ref([]);
const category2 = ref([]);
const currentPage = ref(1);
const pageSize = 10; // 페이지 당 거래 수

const fetchTodoList = fetchAccountData;
const fetchAccountData = async () => {
    try {
        const response = await axios.get(BASEURI);
        if (response.status === 200) {
            return response.data.account;
        } else {
            throw new Error('데이터 조회 실패');
        }
    } catch (error) {
        console.error('에러 발생:', error);
        throw error;
    }
};

const fetchCategory2Data = async () => {
    try {
        const response = await axios.get(BASEURI2);
        if (response.status === 200) {
            return response.data.category2;
        } else {
            throw new Error('데이터 조회 실패');
        }
    } catch (error) {
        console.error('에러 발생:', error);
        throw error;
    }
};
onMounted(() => {
    fetchTodoList();
    fetchCategory2();
});

const getCategoryName = (categoryCode) => {
    const category = category2.value.find(
        (c) => c.code === categoryCode
    );
    return category ? category.name : '';
};

const applyFilters = () => {
    let filtered = transactions.value;

    if (selectedCategory.value) {
        filtered = filtered.filter(
            (transaction) =>
                transaction.category ===
                selectedCategory.value
        );
    }

    if (customStartDate.value && customEndDate.value) {
        const startDate = new Date(customStartDate.value);
        const endDate = new Date(customEndDate.value);
        filtered = filtered.filter((transaction) => {
            const transactionDate = new Date(
                transaction.date
            );
            return (
                transactionDate >= startDate &&
                transactionDate <= endDate
            );
        });
    }

    filteredTransactions.value = filtered;
};

const infiniteHandler = async (state) => {
    currentPage.value++;

    // 새로운 페이지의 데이터 가져오기
    const startIndex = (currentPage.value - 1) * pageSize;
    const endIndex = currentPage.value * pageSize;
    const newData = filteredTransactions.value.slice(
        startIndex,
        endIndex
    );

    // 새로운 데이터 추가
    state.loaded();
    state.append(newData);

    // 모든 데이터를 가져왔으면 완료
    if (endIndex >= filteredTransactions.value.length) {
        state.complete();
    }
};

onMounted(() => {
    fetchAccountData()
        .then((accountData) => {
            transactions.value = accountData.map(
                (transaction) => ({
                    ...transaction,
                    amount: parseInt(transaction.money),
                    balance: parseInt(transaction.total),
                })
            );
            applyFilters();
        })
        .catch((error) => {
            alert('데이터 조회 실패');
        });

    fetchCategory2Data()
        .then((category2Data) => {
            category2.value = category2Data;
        })
        .catch((error) => {
            alert('데이터 조회 실패');
        });
});
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
    const sortedGroups = Object.keys(
        groupedTransactions.value
    )
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
