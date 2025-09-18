// src/store/auth.js
import { defineStore } from "pinia";
import api from "../services/api";

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
        this.user = null;
        console.error("No user session found:", error.response.data.error);
      }
    },
    // Action for local registration
    async register(credentials) {
      return api.post("/auth/register", credentials);
    },
    // Action for local login
    async login(credentials) {
      const response = await api.post("/auth/login", credentials);
      this.user = response.data.user; // Set user state on successful login
    },
    // Action for logging out
    async logout() {
      await api.get("/logout");
      this.user = null;
    },
    setUser(userData) {
      this.user = userData;
    },
  },
});
