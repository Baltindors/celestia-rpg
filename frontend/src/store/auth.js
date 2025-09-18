// src/store/auth.js
import { defineStore } from "pinia";
import api from "../services/api"; // Use the correct relative path

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
  }),
  actions: {
    async fetchUser() {
      try {
        const response = await api.get("/api/user");
        this.user = response.data.user;
      } catch (error) {
        this.user = null; // Clear user data on error
        console.error("Error fetching user:", error);
      }
    },
    setUser(userData) {
      this.user = userData;
    },
  },
});
