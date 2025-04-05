// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import AuthCallback from "../views/AuthCallback.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/login", name: "Login", component: Login },
  { path: "/auth/callback", name: "AuthCallback", component: AuthCallback },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
