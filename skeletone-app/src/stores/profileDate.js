import { defineStore } from 'pinia';
import axios from 'axios';

export const useProfileStore = defineStore({
  id: 'user1',
  state: () => ({
    profileImageUrl: '',
    name: '',
    email: '',
  }),
  actions: {
    async fetchProfileData() {
      try {
        const response = await axios.get('http://localhost:3000/account/user1');
        const user = response.data;
        this.$patch((state) => {
          state.name = user.name;
          state.email = user.email;
          state.profileImageUrl = user.img;
        });
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    },
  },
});
