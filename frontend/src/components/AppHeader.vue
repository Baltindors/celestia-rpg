<template>
  <header class="app-header">
    <div class="header-content">
      <router-link to="/" class="logo-link">
        <img
          src="@/assets/images/Celestia_header.png"
          alt="Celestia Logo"
          class="logo-image"
        />
      </router-link>
      <nav class="main-nav">
        <a href="/#about">About</a>
        <a href="/#explore">Explore</a>
        <a href="/#community">Community</a>
      </nav>
      <div class="auth-actions">
        <div v-if="user" class="user-actions">
          <span>Welcome, {{ user.name }}</span>
          <router-link to="/dashboard" class="header-button"
            >Enter Game</router-link
          >
          <button @click="handleLogout" class="header-button secondary">
            Logout
          </button>
        </div>
        <div v-else class="guest-actions">
          <router-link to="/login" class="header-button">Login</router-link>
          <!-- MODIFIED: This link now tells the page to show the register form -->
          <router-link
            to="/login?action=register"
            class="header-button secondary"
            >Sign Up</router-link
          >
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/auth";

const authStore = useAuthStore();
const router = useRouter();
const user = computed(() => authStore.user);

const handleLogout = async () => {
  await authStore.logout();
  router.push("/");
};
</script>

<style scoped>
.app-header {
  background-color: rgba(10, 10, 20, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 246, 255, 0.5);
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  box-sizing: border-box;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
}

.logo-link .logo-image {
  height: 40px;
  width: auto;
}

.main-nav {
  display: flex;
  gap: 2rem;
}

.main-nav a {
  color: #e0e0e0;
  text-decoration: none;
  font-family: "Exo 2", sans-serif;
  font-size: 1rem;
  transition: color 0.3s ease, text-shadow 0.3s ease;
}

.main-nav a:hover {
  color: #00f6ff;
  text-shadow: 0 0 10px #00f6ff;
}

.auth-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* Added styles for better spacing */
.user-actions,
.guest-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.auth-actions span {
  color: #e0e0e0;
}

.header-button {
  font-family: "Orbitron", sans-serif;
  background: transparent;
  color: #00f6ff;
  border: 1px solid #00f6ff;
  border-radius: 5px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
  text-decoration: none;
  text-align: center;
  transition: all 0.3s ease-in-out;
}

.header-button:hover {
  background-color: rgba(0, 246, 255, 0.2);
  box-shadow: 0 0 15px rgba(0, 246, 255, 0.5);
}

.header-button.secondary {
  background-color: rgba(0, 246, 255, 0.1);
  color: #00f6ff;
}
.header-button.secondary:hover {
  background-color: rgba(0, 246, 255, 0.3);
}

@media (max-width: 768px) {
  .main-nav {
    display: none;
  }

  .header-content {
    padding: 0 0.5rem;
  }

  .logo-link .logo-image {
    height: 35px;
  }

  .auth-actions span {
    display: none;
  }
}
</style>
