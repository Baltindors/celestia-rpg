// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import AuthCallback from "../views/AuthCallback.vue";
import RaceSelection from "../views/RaceSelection.vue";
import Dashboard from "../views/Dashboard.vue"; // <-- Import the new Dashboard component
import { useAuthStore } from "../store/auth";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/login", name: "Login", component: Login },
  { path: "/auth/callback", name: "AuthCallback", component: AuthCallback },
  {
    path: "/race-selection",
    name: "RaceSelection",
    component: RaceSelection,
    meta: { requiresAuth: true },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  }, // <-- Add the new dashboard route
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  // Add scroll behavior to handle anchor links
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    }
    return { top: 0 }; // Go to top of page on regular navigation
  },
});

// Navigation guard to protect routes
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // Fetch user only if the state is empty to avoid repeated calls
  if (!authStore.user) {
    await authStore.fetchUser();
  }

  const isAuthenticated = !!authStore.user;

  if (to.meta.requiresAuth && !isAuthenticated) {
    // If route requires auth and user is not logged in, redirect to login
    next({ name: "Login" });
  } else {
    // Otherwise, proceed
    next();
  }
});

export default router;
