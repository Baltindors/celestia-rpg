// src/views/Home.vue
<template>
  <div>
    <div v-if="user && user.race">
      <h1>Game Dashboard</h1>
      <p>Welcome back, {{ user.name }} of the {{ user.race }}!</p>
      <button @click="handleLogout">Logout</button>
    </div>

    <div v-else-if="isLoading">
      <p>Loading your profile...</p>
    </div>

    <div v-else-if="!user">
      <h1>Home</h1>
      <p>You are not logged in.</p>
      <router-link to="/login">Login</router-link>
    </div>
  </div>
</template>

<script>
import { onMounted, computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/auth";
import { useUiStore } from "../store/ui"; // <-- 1. Import the new UI store

export default {
  setup() {
    const authStore = useAuthStore();
    const uiStore = useUiStore(); // <-- 2. Initialize the UI store
    const router = useRouter();
    const isLoading = ref(true);

    const user = computed(() => authStore.user);

    const checkUserRace = (currentUser) => {
      if (currentUser) {
        if (!currentUser.race) {
          router.push("/race-selection");
        }
      }
      isLoading.value = false;
    };

    onMounted(async () => {
      if (!authStore.user) {
        await authStore.fetchUser();
      }

      // <-- 3. Trigger the splash screen
      if (authStore.user) {
        uiStore.showSplashScreen();
      }

      checkUserRace(authStore.user);
    });

    watch(user, (newUser) => {
      checkUserRace(newUser);
    });

    const handleLogout = async () => {
      await authStore.logout();
      router.push("/login");
    };

    return {
      user,
      isLoading,
      handleLogout,
    };
  },
};
</script>
