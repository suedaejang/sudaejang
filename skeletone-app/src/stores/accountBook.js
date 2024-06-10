import { defineStore } from 'pinia';
import { reactive, computed } from 'vue';
import axios from 'axios';

export const useAccountBook = defineStore('todoList', () => {
  const BASEURI = '/api/todos';
  const state = reactive({ accountBook: [] });

  const profileSetting = async () => {
    try {
      const response = await axios.get(BASEURI);
      if (response.status === 200) {
        state.accountBook = response.data;
      } else {
        alert('데이터 조회 실패');
      }
    } catch (error) {
      alert('에러발생 :' + error);
    }
  };
  const profileSetting = computed(() => state.profileSetting);
  const doneCount = computed(() => {
    const filtered = state.todoList.filter(
      (todoItem) => todoItem.done === true
    );
    return filtered.length;
  });
  return {
    profileSetting,
  };
});
