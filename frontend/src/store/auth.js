// src/store/auth.js
import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
  }),
  actions: {
    async fetchUser() {
      try {
        const response = await axios.get("http://localhost:3000/api/user", {
          withCredentials: true,
        });
        this.user = response.data;
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    },
    setUser(userData) {
      this.user = userData;
    },
  },
});
