<template>
    <div
        class="totalBox"
        style="height: 782px; width: 899px; top: -15px"
    >
        <div class="totalInfo">
            <div class="nameRow">
                <div class="col p-3">
                    <h2>가계부 등록</h2>
                </div>
            </div>
            <!-- 수정 상세 -->
            <div class="infoRow">
                <div class="col">
                    <div class="form-group">
                        <label
                            :class="{
                                required:
                                    !transaction.category1,
                            }"
                            for="inNout"
                        >
                            입출금 구분</label
                        >
                        <select
                            class="form-control"
                            id="inNout"
                            v-model="transaction.category1"
                        >
                            <option
                                value=""
                                disabled
                                selected
                            >
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
                            >카테고리</label
                        >
                        <select
                            class="form-control"
                            id="cate"
                            v-model="transaction.category2"
                        >
                            <option
                                value=""
                                disabled
                                selected
                            >
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
                                    !transaction.money,
                            }"
                            for="cash"
                            >금액</label
                        >
                        <input
                            type="text"
                            class="form-control"
                            id="cash"
                            v-model="transaction.money"
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
                            @change="adjustTime"
                        />
                    </div>
                    <br />
                </div>
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
</template>

<script setup>
import { reactive, watch } from 'vue';
import { useRouter } from 'vue-router';

import axios from 'axios';

import { useRoute } from 'vue-router';
import { ref } from 'vue';

const route = useRoute();
const id = route.params.id;

const BASEURI = '/api/account';
const BASEURI2 = '/api/category2';
const states = reactive({ todoList: [] });
const states2 = reactive({ todoList2: [] });
const router = useRouter();

const transaction = reactive({
    id: '',
    name: '',
    img: '',
    money: '',
    total: '',
    category1: '',
    category2: '',
    memo: '',
    date: '',
    time: '',
});

const add = async () => {
    try {
        const response = await axios.get(BASEURI);
        if (response.status === 200) {
            states.todoList = response.data;

            for (
                let i = 0;
                i < states.todoList.length;
                i++
            ) {
                if (states.todoList[i].id == id) {
                    transaction.memo =
                        states.todoList[i].memo;
                    transaction.amount =
                        states.todoList[i].money;
                    transaction.date =
                        states.todoList[i].date;
                    transaction.time =
                        states.todoList[i].time;
                }
            }
        } else {
            alert('데이터 조회 실패');
        }
    } catch (error) {
        alert('에러발생 : ' + error);
    }
};

const categories = async () => {
    try {
        const response = await axios.get(BASEURI2);
        if (response.status === 200) {
            states2.todoList = response.data;
            //   console.log(states2.todoList);
        } else {
            alert('데이터 조회 실패');
        }
    } catch (error) {
        alert('에러발생 : ' + error);
    }
};

add();
categories();

const saveTransaction = async () => {
    if (
        !transaction.category1 ||
        !transaction.category2 ||
        !transaction.money ||
        !transaction.date
    ) {
        alert('모든 필수 항목을 입력해주세요.');
        return;
    }
    const transactionData = {
        // id: transaction.id || '',
        name: transaction.name || '',
        img: transaction.img || '',
        money: transaction.money,
        total: transaction.total || '',
        category1: transaction.category1,
        category2: transaction.category2,
        memo: transaction.memo || '',
        date: transaction.date,
        time: transaction.time || '',
        email: transaction.email || '',
    };

    try {
        const response = await axios.post(
            BASEURI,
            transactionData
        );
        if (response.status === 201) {
            alert('데이터가 성공적으로 저장되었습니다.');
            router.push('/Home');
        } else {
            alert('데이터 저장 실패');
        }
    } catch (error) {
        alert('에러 발생 : ' + error);
    }
};

const cancleTransaction = () => {
    const userConfirmed =
        confirm('등록을 취소하시겠습니까?');
    if (userConfirmed) {
        router.push('/Home');
    }
};
</script>
