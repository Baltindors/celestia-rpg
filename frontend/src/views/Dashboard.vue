<template>
  <div class="content-wrapper">
    <div v-if="user">
      <h1>Game Dashboard</h1>
      <p>
        Welcome back, {{ user.name
        }}{{ user.race ? ` of the ${user.race}` : "" }}!
      </p>

      <div v-if="user.race">
        <p>The game is not yet implemented. Check back soon!</p>
      </div>
      <div v-else>
        <p>You have not yet chosen your race. Your journey awaits!</p>
        <router-link to="/race-selection" class="dashboard-button"
          >Choose Your Race</router-link
        >
      </div>

      <button @click="handleLogout" style="margin-top: 2rem">Logout</button>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/auth";
import { useUiStore } from "../store/ui";

const authStore = useAuthStore();
const uiStore = useUiStore();
const router = useRouter();

const user = computed(() => authStore.user);

onMounted(() => {
  // Trigger the splash screen when entering the game dashboard area
  if (authStore.user) {
    uiStore.showSplashScreen();
  }
});

const handleLogout = async () => {
  await authStore.logout();
  router.push("/"); // Go to new landing page after logout
};
</script>

<style scoped>
.content-wrapper {
  width: 100%;
  padding: 2.5rem;
  max-width: 1000px;
  margin: 120px auto 2rem auto; /* Added margin-top to account for fixed header */
  background-color: rgba(10, 10, 20, 0.75);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 246, 255, 0.5);
  border-radius: 10px;
  box-shadow: 0 0 25px rgba(0, 246, 255, 0.3);
  text-align: center;
}

.dashboard-button {
  display: inline-block;
  margin-top: 1rem;
  font-family: "Orbitron", sans-serif;
  background: transparent;
  color: #00f6ff;
  border: 2px solid #00f6ff;
  border-radius: 5px;
  padding: 12px 24px;
  cursor: pointer;
  font-size: 16px;
  text-decoration: none;
  box-shadow: inset 0 0 10px rgba(0, 246, 255, 0.5),
    0 0 15px rgba(0, 246, 255, 0.3);
  transition: all 0.3s ease-in-out;
}
.dashboard-button:hover {
  background-color: rgba(0, 246, 255, 0.2);
}
</style>
