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

export default {
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const isLoading = ref(true);

    const user = computed(() => authStore.user);

    const checkUserRace = (currentUser) => {
      if (currentUser) {
        // If user is logged in but has NOT selected a race, redirect
        if (!currentUser.race) {
          router.push("/race-selection");
        }
      }
      // If we have a user (with a race) or no user at all, stop loading
      isLoading.value = false;
    };

    onMounted(async () => {
      // If we don't have user data, fetch it
      if (!authStore.user) {
        await authStore.fetchUser();
      }
      checkUserRace(authStore.user);
    });

    // Watch for changes in the user object (e.g., after login)
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
