// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import AuthCallback from "../views/AuthCallback.vue";
import RaceSelection from "../views/RaceSelection.vue"; // <-- 1. Import the new component

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/login", name: "Login", component: Login },
  { path: "/auth/callback", name: "AuthCallback", component: AuthCallback },
  { path: "/race-selection", name: "RaceSelection", component: RaceSelection }, // <-- 2. Add the new route
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
