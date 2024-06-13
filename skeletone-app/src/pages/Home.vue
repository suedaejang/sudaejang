<template>
    <div class="profileSettings">
        <div id="app">
            <div class="navigation">
                <span
                    @click="showA"
                    :class="{
                        clickable: true,
                        active: active === 'A',
                    }"
                >
                    이달의 요약
                </span>
                <span
                    @click="showB"
                    :class="{
                        clickable: true,
                        active: active === 'B',
                    }"
                >
                    최근 거래 목록
                </span>
            </div>
            <div v-if="active === 'A'">
                <div class="container">
                    <div class="row">
                        <div class="item">
                            <h2>총 수입</h2>
                            <p>1,000,000원</p>
                        </div>
                        <div class="item">
                            <h2>총 지출</h2>
                            <p>1,000,000원</p>
                        </div>
                        <div class="item">
                            <h2>순 수입</h2>
                            <p>1,000,000원</p>
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
                            <tr>
                                <td class="td">6월 8일</td>
                                <td class="td">18:30</td>
                                <td class="td">60,000원</td>
                                <td class="td">
                                    동훈씨에게 입금함
                                </td>
                                <td class="td">
                                    -10,000원
                                </td>
                            </tr>
                            <tr>
                                <td class="td">6월 7일</td>
                                <td class="td">18:30</td>
                                <td class="td">80,000원</td>
                                <td class="td">
                                    동훈씨에게 입금함
                                </td>
                                <td class="td">
                                    -10,000원
                                </td>
                            </tr>
                            <tr>
                                <td class="td">6월 7일</td>
                                <td class="td">14:30</td>
                                <td class="td">90,000원</td>
                                <td class="td">
                                    동훈씨에게 입금함
                                </td>
                                <td class="td">
                                    -10,000원
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
            active: 'A', // 초기값을 'A'로 설정하여 "이달의 요약"을 표시
        };
    },
    methods: {
        showA() {
            this.active = 'A';
        },
        showB() {
            this.active = 'B';
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
    flex-direction: row; /* 수평 배치 */
    justify-content: left; /* 왼쪽 정렬 */
    gap: 20px; /* 요소 사이 간격 */
    margin-left: 50px;
}
.clickable {
    margin: 50px 0;
    cursor: pointer;
    color: black; /* 기본 검정색 */
    font-size: 2em; /* 글씨 크기 키움 */
    font-weight: 700;
}
.clickable.active {
    color: blue; /* 클릭 시 파란색 */
    text-decoration-line: underline;
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
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 그림자 효과 추가 */
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
