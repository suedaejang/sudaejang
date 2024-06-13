<template>
    <div
        class="totalBox"
        style="height: 782px; width: 899px"
    >
        <div class="totalInfo">
            <div class="nameRow">
                <div class="col p-3">
                    <h2>가계부 수정</h2>
                </div>
            </div>

            <!-- 수정 상세 -->
            <div class="infoRow">
                <div class="col">
                    <div class="form-group">
                        <label
                            :class="{
                                required: !transaction.type,
                            }"
                            for="inNout"
                        >
                            입출금 구분
                        </label>
                        <select
                            class="form-control"
                            id="inNout"
                            v-model="transaction.type"
                        >
                            <option value="" disabled>
                                카테고리
                            </option>
                            <option value="o">지출</option>
                            <option value="i">수입</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label
                            :class="{
                                required:
                                    !transaction.category2,
                            }"
                            for="cate"
                        >
                            카테고리
                        </label>
                        <select
                            class="form-control"
                            id="cate"
                            v-model="transaction.category2"
                        >
                            <option value="" disabled>
                                카테고리
                            </option>
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
                                required:
                                    !transaction.amount,
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

                        <input
                            type="text"
                            class="form-control"
                            id="total"
                            v-model="transaction.total"
                            style="display: none"
                        />
                        <input
                            type="text"
                            class="form-control"
                            id="name"
                            v-model="transaction.name"
                            style="display: none"
                        />
                        <input
                            type="text"
                            class="form-control"
                            id="email"
                            v-model="transaction.email"
                            style="display: none"
                        />
                        <input
                            type="text"
                            class="form-control"
                            id="img"
                            v-model="transaction.img"
                            style="display: none"
                        />
                    </div>
                    <br /><br />
                    <div class="btnGroup">
                        <button
                            type="button"
                            @click="cancleTransaction"
                        >
                            취소
                        </button>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button
                            type="button"
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
        const response = await axios.get(
            `${BASEURI}/${id}`
        );
        if (response.status === 200) {
            const targetTransaction = response.data;
            transaction.type =
                targetTransaction.category1 === 'o'
                    ? 'o'
                    : 'i';
            transaction.category2 =
                targetTransaction.category2;
            transaction.memo = targetTransaction.memo;
            transaction.amount = targetTransaction.money;
            transaction.date = targetTransaction.date;
            transaction.time = targetTransaction.time;
            transaction.total = targetTransaction.total;
            transaction.name = targetTransaction.name;
            transaction.email = targetTransaction.email;
            transaction.img = targetTransaction.img;
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

const saveTransaction = async () => {
    if (
        !transaction.type ||
        !transaction.category2 ||
        !transaction.amount ||
        !transaction.date
    ) {
        alert('모든 필수 항목을 입력해주세요.');
        return;
    }

    try {
        const payload = {
            id,
            name: transaction.name,
            img: transaction.img,
            money: transaction.amount,
            total: transaction.total,
            category1: transaction.type,
            category2: transaction.category2,
            memo: transaction.memo,
            date: transaction.date,
            time: transaction.time,
            email: transaction.email,
        };

        const response = await axios.put(
            `${BASEURI}/${id}`,
            payload
        );

        if (response.status === 200) {
            const index = states.todoList.findIndex(
                (item) => item.id === id
            );
            if (index !== -1) {
                states.todoList[index] = payload;
            }
            router.push('/Home');
        } else {
            alert('데이터 업데이트 실패');
        }
    } catch (error) {
        alert('에러발생: ' + error);
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
    top: 30px;
}
.totalBox > .nameRow > div > h2 {
    color: red;
    height: 60px;
    width: 429px;
    margin: 0 auto;
}

/* 대상 거래내역 정보 파트 */
.targetRow {
    width: 750px;
    height: 130px;
    background-color: #cddef1;
    border-radius: 30px;
    position: absolute;
    top: 70px;
    left: 54.5px;
}

/* 세부 입력박스 파트 */
.infoRow {
    width: 800px;
    height: 500px;
    position: absolute;
    top: 200px;
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
/* 버튼 디자인 */
.btnGroup {
    width: 960px;
    height: 100px;
    display: flex;
    margin-bottom: 100px;
    margin: 0 auto;
    position: relative;
    margin-left: 245.75px;
}

.btnGroup > button {
    width: 100px;
    height: 40px;
    background-color: rgb(255, 204, 80);
    border-radius: 10px;
    font-size: 1.25em;
    border: none;
}
.btnGroup > button:hover {
    cursor: pointer;
    background-color: orange;
    border-color: orange;
}
</style>
