<template>
    <div class="totalBox">
        <div class="totalInfo">
            <div class="nameRow">
                <div class="col p-3">
                    <h2>가계부 등록(제목)</h2>
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
                            >입출금 구분</label
                        >
                        <select
                            class="form-control"
                            id="inNout"
                            v-model="transaction.type"
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
                                    !transaction.category,
                            }"
                            for="cate"
                            >카테고리</label
                        >
                        <select
                            class="form-control"
                            id="cate"
                            v-model="transaction.category"
                        >
                            <option
                                value=""
                                disabled
                                selected
                            >
                                카테고리
                            </option>
                            <option
                                v-for="cat in categories"
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
                        <i
                            class="fa-regular fa-calendar-days"
                        ></i>

                        <input
                            type="time"
                            class="form-control"
                            id="time"
                            v-model="transaction.time"
                        />
                        <i class="fa-regular fa-clock"></i>
                    </div>
                    <div class="form-group">
                        <button
                            type="button"
                            class="btn btn-primary m-1"
                            @click="cancleTransaction"
                        >
                            취소
                        </button>
                        <button
                            type="button"
                            class="btn btn-primary m-1"
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
import { inject, reactive, provide } from 'vue';
import { useRouter } from 'vue-router';

import axios from 'axios';

const { addTodo } = inject('actions');

const transaction = reactive({
    type: '',
    category: '',
    memo: '',
    amount: '',
    date: '',
});

const router = useRouter();
const { chartAdd } = inject('actions');
// const categories = initialData.category2;

const saveTransaction = () => {
    if (
        !transaction.type ||
        // !transaction.category ||
        !transaction.amount ||
        !transaction.date
    ) {
        alert('모든 필수 항목을 입력해주세요.');
        return;
    }
    chartAdd({ ...transaction }, () => {
        router.push('/');
    });
};
const cancleTransaction = () => {
    const userConfirmed =
        confirm('등록을 취소하시겠습니까?');
    if (userConfirmed) {
        router.push('/');
    }
};

provide('actions', {
    addTodo,
});
</script>
