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
                    >이달의 요약</span
                >
                <span
                    @click="active = 'B'"
                    :class="{
                        clickable: true,
                        active: active === 'B',
                    }"
                    >최근 거래 목록</span
                >
            </div>
            <div v-if="active === 'A'">
                <div class="container">
                    <div class="row">
                        <div
                            class="item"
                            v-for="(
                                text, index
                            ) in summaryTexts"
                            :key="index"
                        >
                            <h2>{{ text }}</h2>
                            <p>
                                {{ summaryValues[index] }}원
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="active === 'B'">
                <div class="container">
                    <table>
                        <thead>
                            <tr>
                                <th class="th">날짜</th>
                                <th class="th">시간</th>
                                <th class="th">금액</th>
                                <th class="th">설명</th>
                                <th class="th">
                                    잔액 변동
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(
                                    transaction, index
                                ) in transactions"
                                :key="index"
                            >
                                <td class="td">
                                    {{ transaction.date }}
                                </td>
                                <td class="td">
                                    {{ transaction.time }}
                                </td>
                                <td class="td">
                                    {{ transaction.amount }}
                                </td>
                                <td class="td">
                                    {{
                                        transaction.description
                                    }}
                                </td>
                                <td class="td">
                                    {{
                                        transaction.balanceChange
                                    }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <p>자세히</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            active: 'A',
            transactions: [
                {
                    date: '6월 8일',
                    time: '18:30',
                    amount: 60000,
                    description: '동훈씨에게 입금함',
                    balanceChange: -10000,
                },
                {
                    date: '6월 7일',
                    time: '18:30',
                    amount: 80000,
                    description: '동훈씨에게 입금함',
                    balanceChange: -10000,
                },
                {
                    date: '6월 7일',
                    time: '14:30',
                    amount: 90000,
                    description: '동훈씨에게 입금함',
                    balanceChange: -10000,
                },
            ],
        };
    },
    computed: {
        summaryValues() {
            let totalIncome = 0;
            let totalExpense = 0;
            this.transactions.forEach((transaction) => {
                if (transaction.amount > 0) {
                    totalIncome += transaction.amount;
                }
                if (transaction.balanceChange < 0) {
                    totalExpense += Math.abs(
                        transaction.balanceChange
                    );
                }
            });
            let netIncome = totalIncome - totalExpense;
            return [totalIncome, totalExpense, netIncome];
        },
        summaryTexts() {
            return ['총 수입', '총 지출', '순 수입'];
        },
    },
};
</script>
<style>
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
}
.clickable {
    margin: 50px 0;
    cursor: pointer;
    color: black;
    font-size: 2em;
    font-weight: 700;
}
.clickable.active {
    color: blue;
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
    padding: 20px;
    text-align: center;
    flex: 1;
    margin: 0 10px;
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
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}
th.th {
    background-color: #f2f2f2;
}
</style>
