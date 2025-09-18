<template>
  <div>
    <h1>Home</h1>
    <div v-if="user">
      <p>Welcome, {{ user.name }}</p>
      <button @click="handleLogout">Logout</button>
    </div>
    <div v-else>
      <p>You are not logged in.</p>
      <router-link to="/login">Login</router-link>
    </div>
  </div>
</template>

<script>
import { onMounted, computed } from "vue";
import { useRouter } from "vue-router"; // Import useRouter
import { useAuthStore } from "../store/auth";

export default {
  setup() {
    const authStore = useAuthStore();
    const router = useRouter(); // Initialize router

    onMounted(() => {
      if (!authStore.user) {
        authStore.fetchUser();
      }
    });

    // Logout handler
    const handleLogout = async () => {
      await authStore.logout();
      router.push("/login"); // Redirect to login page after logout
    };

    return {
      user: computed(() => authStore.user),
      handleLogout, // Expose handler to the template
    };
  },
};
</script>
