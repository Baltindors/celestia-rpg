// src/store/auth.js
import { defineStore } from "pinia";
import api from "../services/api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    races: [], // <-- 1. Add new state to hold race data
  }),
  actions: {
    // --- (existing actions like fetchUser, register, login, logout are unchanged) ---
    async fetchUser() {
      try {
        const response = await api.get("/api/user");
        this.user = response.data.user;
      } catch (error) {
        this.user = null;
        console.error("No user session found:", error.response?.data?.error);
      }
    },
    async register(credentials) {
      return api.post("/auth/register", credentials);
    },
    async login(credentials) {
      const response = await api.post("/auth/login", credentials);
      this.user = response.data.user;
    },
    async logout() {
      await api.get("/logout");
      this.user = null;
      this.races = []; // Clear races on logout
    },

    // 2. ADD NEW ACTIONS FOR RACE MANAGEMENT
    async fetchRaces() {
      try {
        const response = await api.get("/api/game/races");
        this.races = response.data;
      } catch (error) {
        console.error("Error fetching races:", error);
      }
    },
    async selectRace(raceName) {
      try {
        const response = await api.post("/api/user/select-race", {
          race: raceName,
        });
        // Update the local user state with the newly selected race
        this.user = response.data.user;
        return response.data;
      } catch (error) {
        console.error("Error selecting race:", error);
        throw error; // Re-throw the error to be caught in the component
      }
    },
    // --- (existing setUser action is unchanged) ---
    setUser(userData) {
      this.user = userData;
    },
  },
});
